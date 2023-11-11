import { Alert, Container, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../../UserInfoStatusContext';
import { useContext, useEffect, useState} from 'react'
import axios, {AxiosResponse} from "axios";
import { AddCounsel } from "../../AddCounsel";
import { SERVER_ADDRESS } from "../../Cons"; //프록시 설정후 필요 없어짐

export const CounselList = () => {

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

    const getBoardList = async () => {
        if(localStorage.getItem("accessToken") == null && localStorage.getItem("accesstoken")==="" )  return

        const authHeader : string = "Bearer:" + localStorage.getItem("accessToken")
        console.log("authHeader", authHeader)

  
        try {
            if(userInfo==null || userInfo===undefined) return
            const formData = new FormData();
            formData.append('noOfDisplay', '30');
            formData.append('tel', userInfo.customorTel)
            const result : AxiosResponse<Array<BoardListType>> = await axios.post(SERVER_ADDRESS + "/api/board/list", formData,  
                {headers: {
                    Authorization: authHeader,
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

    return (
        <Container>
            <Alert variant="primary">
                상담 내역
            </Alert>
            <AddCounsel getBoardList={getBoardList}></AddCounsel>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>종류</th>
                        <th>메시지</th>
                        <th>생성날자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardListArray?.map( (boardList) => {
                            return(
                                <tr key={boardList.board_id}>
                                    <td>{boardList.name}</td>
                                    <td>{boardList.content}</td>
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