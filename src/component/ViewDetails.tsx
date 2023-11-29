import { Container } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import axios, {AxiosResponse} from "axios"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useState, useEffect } from "react";
import { SERVER_ADDRESS } from "../Cons"; 
import { ViewContents } from "./ViewContents";

export const ViewDetails = () => {

    type BoardListType = {
        "board_id": number,
        "name": string,
        "content": string,
        "message": string,
        "strUpdatedAt": string,
        "breplied": false
    }

    const [board, setBoard] = useState<BoardListType | null>(null)
   
    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    const location = useLocation()
    const board_id = location.state.board_id

    useEffect( () => {
        //console.log("useEffect called")
        getBoard()
    }, []) 
  
    const getBoard = async () => {
        //console.log("userInfo in getBoardList" ,  userInfo)
        if(userInfo==null || userInfo===undefined) return
 
        try {
            const formData = new FormData();
            formData.append('id', board_id);
            const result : AxiosResponse<BoardListType> = await axios.post(SERVER_ADDRESS + "/api/board/getBoard", formData,  
                {headers: {
                    Authorization: "Bearer:" + userInfo.accessToken,
                }
            })

            //console.log(result.data)
            setBoard(result.data)
            
        } catch ( err){
            console.log( err )
        }
    }


    return (
        <Container style={{minHeight : "65vh"}}>
            <div className="fs-2 bg-success mb-2">작성자 : {board?.name}  시간 : {board?.strUpdatedAt}</div>
            { board!==null && <ViewContents board={board} /> }
        </Container>
    )
}