import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
//import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { CounselList } from "./counsel_component/CounselList";

export const WebChattingRoom = () => {
  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();
  const SGINAL_SERVER = 'http://10.100.203.62:3002'

  // for lines
  class MyPoint  {
    x : number; y:number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [curLine, setCurrentLine] = useState<MyPoint[]>([])
  const [linesCSR, setLinesCSR] = useState<Array<Array<MyPoint>>>([])
  const [linesCustomer, setLinesCustomer] = useState([])
  const isDrawingRef = useRef(false);
  //

  //const { roomName } = useParams();

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        console.log('my video stream', stream)
        myVideoRef.current.srcObject = stream;
      }

      if (!(pcRef.current && socketRef.current)) {
        return;
      }

      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("pc.onicecandiate sending ice", e.candidate);
          socketRef.current.emit("ice", e.candidate);
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
            console.log("on track", e.streams);
            remoteVideoRef.current.srcObject = e.streams[0];
        }
      };

    } catch (e) {
      console.error(e);
    }
  };

  const drawLines = () => {
    console.log('executing drawLines')
    const canvas = canvasRef.current;
    if (canvas == null) {
      console.error('canvas null');
      return;
    }
  
    const context = canvas.getContext("2d");
    if (!context) {
      console.error('context null');
      return;
    }
  
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    context.strokeStyle = "red";
    context.lineWidth = 5;
  
    console.log('drawing lineCSR', linesCSR)
    linesCSR.forEach((line) => {
      if (line.length > 1) {
        context.beginPath();
        context.moveTo(line[0].x, line[0].y);
  
        for (let i = 1; i < line.length; i++) {
          context.lineTo(line[i].x, line[i].y);
        }
  
        context.stroke();
        console.log('stroke')
      }
    });

    console.log('drawing lineCustomer', linesCustomer)
    linesCustomer.forEach((line) => {
      console.log(line)
      // if (line.length > 1) {
      //   context.beginPath();
      //   context.moveTo(line[0].x, line[0].y);
  
      //   for (let i = 1; i < line.length; i++) {
      //     context.lineTo(line[i].x, line[i].y);
      //   }
  
      //   context.stroke();
      //   console.log('stroke')
      // }
    });
  };


  
  const setLinesListener = () => {
    console.log('setting Lines  Listeners')
    if(socketRef.current == null) {
      console.error("socketRef null")
    } else {
      socketRef.current.on('linesCSR', (lines) => {
        console.log('on lines csr', lines);
        setLinesCSR( prevLines => lines );
        drawLines()
      });

      socketRef.current.on('linesCustomer', (lines) => {
        console.log('on lines customer', lines);
        setLinesCustomer( prevLines => lines );
        drawLines()
      });
      
      
    }  
  }

  useEffect( ()=> {
    drawLines()   
  }, [linesCSR])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      console.error('canvas null');
      return;
    }

    const context = canvas.getContext("2d");

    const handleMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      setCurrentLine((prevLine) => [...prevLine, new MyPoint(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)]);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setCurrentLine((prevLine) => [...prevLine, new MyPoint(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)]);
      isDrawingRef.current = false;
      console.log('Mouse up', curLine);
      socketRef.current?.emit('add_csr_line', curLine);
      setCurrentLine(prev => [])
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      setCurrentLine((prevLine) => [...prevLine, new MyPoint(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)]);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, curLine, socketRef, MyPoint]);

  // server에서 하나 삭제 해야 한다
  const handleRemovePrev = () => {
    if(socketRef.current == null ) console.error("socketRef null")
    else socketRef.current.emit('remove_prev_csr_line')
  }

  const handleRemoveAll = () => {
    if(socketRef.current == null ) console.error("socketRef null")
    else socketRef.current.emit('remove_all_csr_line')    
  }

  const createOffer = async () => {
    console.log("create Offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp  = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer", sdp);

      const offerObject = {
          sdp: sdp.sdp,
          type: sdp.type,
      };

      socketRef.current.emit("offer", offerObject);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io(SGINAL_SERVER);

    setLinesListener()

    console.log("setting stun")
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    console.log("setting joined")
    socketRef.current.on("joined", ()=> {
      console.log('joined')
      createOffer()
    });

    console.log("setting answer")
    socketRef.current.on("answer", (answer) => {
      console.log("recv answer", answer);
      if (!pcRef.current) {
        console.log('pcRef null')
        return;
      }

      const rtcSessionDescription = new RTCSessionDescription({
        sdp: answer.sdp,
        type: answer.type,
      })

      pcRef.current.setRemoteDescription( rtcSessionDescription)
    });

    console.log("setting ice")
    socketRef.current.on("ice", async (iceData) => {
      console.log('socketRef.current.on ice :', iceData)

      if (!pcRef.current) {
          return;
      }

      try {
        // Check if the expected properties are present
        if (iceData.sdpMid != null && iceData.sdpMLineIndex != null) {
          const iceCandidate = new RTCIceCandidate({
              candidate: iceData.candidate,
              sdpMid: iceData.sdpMid,
              sdpMLineIndex: iceData.sdpMLineIndex,
          });

          console.log('Adding iceCandidate:', iceCandidate);

          await pcRef.current.addIceCandidate(iceCandidate);
        }
      } catch (error) {
          console.error('Error parsing iceData:', error);
      }
      
    });

    //socketRef.current.emit("join_room", 'join');

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   setCanvasMouseListeners();
  // }, [canvasRef.current])

  return (
    <Container>
      <Row className="justify-content-around">
        <Col>
          <video
            id="myvideo"
            style={{
              width: 380,
              height: 240,
              backgroundColor: "black",
            }}
            ref={myVideoRef}
            autoPlay
          />
        </Col>
        <Col>
          <video
            id="remotevideo"
            style={{
              width: 380,
              height: 240,
              backgroundColor: "green",
            }}
            ref={remoteVideoRef}
            autoPlay
          />
        </Col>
      </Row>
      <Row className="justify-content-around">
        <Col>
          <canvas className="bg-secondary" 
          width={400}
          height={200}
          style={{ overflow:"hidden"}}
          ref={canvasRef}>
          </canvas>
        </Col>
        <Col>
          <div><button className="btn btn-warning" onClick={handleRemovePrev}>이전 삭제</button></div>
          <div><button className="btn btn-danger" onClick={handleRemoveAll}>모두 삭제</button></div>
        </Col>
      </Row>

      <CounselList></CounselList>
    </Container>
  );
};

