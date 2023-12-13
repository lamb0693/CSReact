import { Alert, Container, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../../UserInfoStatusContext';
import { useContext, useEffect, useState, MouseEvent} from 'react'
import axios, {AxiosResponse} from "axios";
import { AddCounsel } from "../AddCounsel";
import { SERVER_ADDRESS } from "../../Cons"; 
import { useNavigate } from "react-router-dom";

export const CounselList = ({ updated = false }) => {

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
    //console.log("userInfo" ,  userInfo)

    const getBoardList = async () => {

        //console.log("userInfo in getBoardList" ,  userInfo)
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

            //console.log(result.data)
            setBoardListArray(result.data)
            
        } catch ( err){
            //console.log( err )
        }

    }
   
    useEffect( () => {
        console.log("useEffect called")
        getBoardList()
    }, []) 

    useEffect( () => {
        console.log("useEffect called")
        getBoardList()
    }, [userInfo]) 

    useEffect(() => {
        if (updated) {
            console.log('CouselList : customer board updated')
            getBoardList() 
        }
      }, [updated]);

    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    const viewDetail = (event : MouseEvent, board_id:number) => {
        //console.log(event.currentTarget.id)
        navigateTo("/view_details/", {state : {
            board_id : board_id
        }})
    }

    return (
        <Container>
            <AddCounsel getBoardList={getBoardList}></AddCounsel> 
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>첨부</th>
                        <th>메시지</th>
                        <th>생성날자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardListArray?.map( (boardList) => {
                            return(
                                <tr key={boardList.board_id} 
                                    onClick={(event) => viewDetail(event, boardList.board_id)}
                                    onMouseOver={(event)=>{event.currentTarget.style.cursor='pointer'}}>
                                    <td>{boardList.name}</td>
                                    {boardList.content==="TEXT" && <td>문자 메시지</td>}
                                    {boardList.content==="IMAGE" && <td>사진</td>}
                                    {boardList.content==="PAINT" && <td>그림판</td>}
                                    {boardList.content==="AUDIO" && <td>음성</td>}
                                    <td>{boardList.message}</td>
                                    <td>{boardList.strUpdatedAt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>

    )
}