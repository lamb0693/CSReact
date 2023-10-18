import { Alert, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useEffect, useState} from 'react'
import axios, {AxiosResponse} from "axios";
//import { SERVER_ADDRESS } from "../Cons"; 프록시 설정후 필요 없어짐

export const CSRHome = () => {

    type BoardListType = {
        "board_id": number,
        "name": string,
        "content": string,
        "message": string,
        "strUpdatedAt": string,
        "breplied": false
    }

    type PagedBoardListType = {
        memberListDTOList : Array<BoardListType>,
        currentPage : number,
        pageSize : number,
        totalElements : number
    }

   
    const [boardListArray, setBoardListArray] = useState< Array<BoardListType> | null>(null)
    const [targetPage, setTargetPage] = useState(0)

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    const getBoardList = async () => {
        if(localStorage.getItem("accessToken") == null && localStorage.getItem("accesstoken")==="" )  return

        const authHeader : string = "Bearer:" + localStorage.getItem("accessToken")
        console.log(authHeader)

  
        try {
            const result : AxiosResponse<PagedBoardListType> = await axios.get("api/board/listUnReplied/0",  {
                headers: {
                    Authorization: authHeader,
                }
            })

            console.log(result.data.memberListDTOList)
            setBoardListArray(result.data.memberListDTOList)
            
        } catch ( err){
            console.log( err )
        }

    }
    
    useEffect( () => {
        console.log("useEffect called")
        getBoardList()
    }, []) 

    const handleClick : React.MouseEventHandler<HTMLButtonElement> = (event : React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.id)
    }

    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    return (
        <>
            <Alert variant="primary">
                상담 대기 목록
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>고객 전화번호</th>
                        <th>종류</th>
                        <th>메시지</th>
                        <th>생성날자</th>
                        <th>결과달기</th>
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
                                    <td><button onClick={handleClick} id={""+boardList.board_id}>답변달기</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>

    )
}