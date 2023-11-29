import { Alert, Container, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useEffect, useState, MouseEvent} from 'react'
import axios, {AxiosResponse} from "axios";
import { AddCounsel } from "./AddCounsel";
import { SERVER_ADDRESS } from "../Cons";
import { useNavigate } from "react-router-dom";
import { CounselList } from "./counsel_component/CounselList";

export const ClientCounselList = () => {
 
    const navigateTo  = useNavigate()

    type BoardListType = {
        "board_id": number,
        "name": string,
        "content": string,
        "message": string,
        "strUpdatedAt": string,
        "breplied": false
    }

    const [boardListArray, setBoardListArray] = useState< Array<BoardListType> | null>(null)



    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    console.log("userInfo" ,  userInfo)

    const getBoardList = async () => {

        console.log("userInfo in getBoardList" ,  userInfo)
        if(userInfo==null || userInfo===undefined) return
  
        try {
            const formData = new FormData();
            formData.append('noOfDisplay', '30');
            formData.append('tel', userInfo.customorTel)
            const result : AxiosResponse<Array<BoardListType>> = await axios.post(SERVER_ADDRESS + "/api/board/list", formData,  
                {headers: {
                    Authorization: "Bearer:" + userInfo.accessToken,
                }
            })

            console.log(result.data)
            setBoardListArray(result.data)
            
        } catch ( err){
            console.log( err )
        }

    }
   
    useEffect( () => {
        console.log("useEffect called")
        getBoardList()
    }, []) 

    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    const viewDetail = (event : MouseEvent, board_id:number) => {
        console.log(event.currentTarget.id)
        navigateTo("/view_details/", {state : {
            board_id : board_id
        }})
    }

    return (
        <Container>
            <Alert variant="primary">
                상담 내역
            </Alert>
            {/* <AddCounsel getBoardList={getBoardList}></AddCounsel> */}
            <CounselList></CounselList>
        </Container>

    )   
}