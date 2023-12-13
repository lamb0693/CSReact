import { useEffect, useRef, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
//import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { CounselList } from "./counsel_component/CounselList";
import { UserInfo, UserInfoStatusContext } from "../UserInfoStatusContext";
import { CounselContext, UploadInfo } from "./CounselContext";

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

  const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
  const uploadInfo : UploadInfo | undefined = useContext(CounselContext)

  const [customerBoardUpdated, setCustomerBoardUpdated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [curLine, setCurrentLine] = useState<MyPoint[]>([])
  const [linesCSR, setLinesCSR] = useState<Array<Array<MyPoint>>>([])
  const [linesCustomer, setLinesCustomer] = useState<Array<Array<MyPoint>>>([])
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
  
    context.lineWidth = 5;
  
    console.log('drawing lineCSR', linesCSR)
    context.strokeStyle = 'blue';
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
    context.strokeStyle = 'red';
    linesCustomer.forEach((line) => {
      console.log(line)
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
  };


  
  const setLinesListener = () => {
    console.log('setting Lines  Listeners')
    if(socketRef.current == null) {
      console.error("socketRef null")
    } else {
      // socketRef.current.on('linesCSR', (lines) => {
      //   console.log('on lines csr', lines);
      //   setLinesCSR( prevLines => lines );
      //   drawLines()
      // });

      socketRef.current.on('linesCustomer', (lines) => {
        console.log('on lines customer', lines);
        setLinesCustomer( prevLines => lines );
        drawLines()
      });
      
      
    }  
  }

  useEffect( ()=> {
    drawLines()   
  }, [linesCSR, linesCustomer])

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
      const newLines = [...linesCSR, [...curLine]]
      setLinesCSR(prev => newLines)
      setCurrentLine(prev => [])
      isDrawingRef.current = false;
      socketRef.current?.emit('linesCSR', newLines);
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
    const tempLines = [...linesCSR]
    tempLines.pop()
    setLinesCSR( tempLines )
    if(socketRef.current == null ) console.error("socketRef null")
    else socketRef.current?.emit('linesCSR', tempLines);
  }

  const handleRemoveAll = () => {
    setLinesCSR([])
    if(socketRef.current == null ) console.error("socketRef null")
      else socketRef.current?.emit('linesCSR', []);   
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
    socketRef.current.on("joined", (custtomerTel : string)=> {
      console.log('joined', custtomerTel)
      userInfo?.setCustomerTel(prev=>custtomerTel)
      createOffer()
    });

    // from Customer through socket
    console.log("setting customer_board_updated")
    socketRef.current.on("customer_board_updated", ()=> {
      console.log('customer_board_updated')
      setCustomerBoardUpdated((prev) => !prev);
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

  useEffect(() => {
    console.log("userInfo has changed:", userInfo);
  }, [userInfo]);

  // from AddCounsel
  useEffect(() => {
    if (uploadInfo?.uploaded) {
      // Do something when a message is uploaded
      console.log('A message has been uploaded');
      socketRef.current?.emit('csr_board_updated')
      // Reset the upload status
      uploadInfo.setUplopaded(false);
    }
  }, [uploadInfo?.uploaded]);


  return (
    <Container>
      <Container style={{backgroundColor:"#acacac", marginBottom:"2vh", padding:"1vh"}}>
        <Container style={{width : "324px", padding : "0"}}>
          <Row className="justify-content-around" style={{marginBottom:"10px"}}>
            <Col style={{backgroundColor:"#bcbcbc", width:"130px",padding : "0"}}>
              <video
                id="myvideo"
                style={{
                  width: 170,
                  height: 160,
                  backgroundColor: "black",
                }}
                ref={myVideoRef}
                autoPlay
              />
            </Col>
            <Col style={{backgroundColor:"#bcbcbc", width:"130px", padding : "0"}}>
              <video
                id="remotevideo"
                style={{
                  width: 170,
                  height: 160,
                  backgroundColor: "green",
                }}
                ref={remoteVideoRef}
                autoPlay
              />
            </Col>
          </Row>
          <Row className="justify-content-around" style={{marginBottom: "10px"}}>
            <Col style={{backgroundColor:"#bcbcbc", padding : "0"}}>
              <canvas className="bg-secondary" 
              width={347}
              height={200}
              style={{ overflow:"hidden"}}
              ref={canvasRef}>
              </canvas>
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="btn btn-warning" onClick={handleRemovePrev}>이전 삭제</button>
            </Col>
            <Col>
              <button className="btn btn-danger" onClick={handleRemoveAll}>모두 삭제</button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <CounselList updated={customerBoardUpdated}></CounselList>
      </Container>
    </Container>
  );
};

