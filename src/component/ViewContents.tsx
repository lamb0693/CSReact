import { Container } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import axios, {AxiosResponse} from "axios"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useState, useEffect } from "react";
import { SERVER_ADDRESS } from "../Cons"; 
import { PaintImage } from "./PaintImage";


type BoardListType = {
    "board_id": number,
    "name": string,
    "content": string,
    "message": string,
    "strUpdatedAt": string,
    "breplied": false
}

type ViewContentsType = {
    board : BoardListType
}

type Point = {
    x : number,
    y : number
}

export const ViewContents = (props : ViewContentsType) => {

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    
    const [image, setImage] = useState<string | null>(null);
    const [paint, setPaint] = useState< Array<Array<Point>> | null> (null);

    const downloadContent = async () => {
        if(userInfo==null || userInfo===undefined) return
        if(props.board == null ) return
    
        if(props.board.content === "IMAGE"){
            try {
                const formData = new FormData();
                formData.append('id', ""+props.board.board_id);
                const result = await axios.post(SERVER_ADDRESS + "/api/board/download", formData,  
                    {headers: {
                        Authorization: "Bearer:" + userInfo.accessToken,
                    },
                    responseType: "blob",   //1.  blob 으로 변환해서 받음
                    timeout: 5000,
                })

                //console.log(result.data)  //2. blob 으로 변환된 상태

                const contentType = result.headers['content-type'];
                //console.log('Content-Type:', contentType);

                // Convert binary data to Blob
                // 위에서 responseType을 blob이라 정해 줘서 필요 없다.
                //const blob = new Blob([result.data], { type: result.headers['content-type'] }); //3  

                // 3. Read the Blob as a data URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageSrc = reader.result as string;
                    //console.log('Image Source:', imageSrc);
                    setImage(imageSrc);
                };
                reader.readAsDataURL(result.data);
            } catch ( err){
                console.log( err )
            }
        } else if(props.board.content === "PAINT"){
            try {
                const formData = new FormData();
                formData.append('id', ""+props.board.board_id);
                const result = await axios.post(SERVER_ADDRESS + "/api/board/download", formData,  
                    {headers: {
                        Authorization: "Bearer:" + userInfo.accessToken,
                    },
                })

                console.log(result.data)  //2. blob 으로 변환된 상태
                setPaint(result.data)
            } catch ( err){
                console.log( err )
            }
        }
    }

    useEffect(()=> {
        if(props.board.content!=="TEXT") {
            downloadContent()
        }
    }, [props.board])    

    return (
        <Container>
            {props.board.content==="TEXT" && <div className="fs-3 bg-warning">{props.board.message}</div>}
            {props.board.content === "IMAGE" && image && (
                <img src={image} alt="Downloaded Image" style={{ width: '100%'}} /> )}
            {props.board.content === "PAINT" && paint!==null && <PaintImage paint={paint} ></PaintImage>}
        </Container>
    )
}