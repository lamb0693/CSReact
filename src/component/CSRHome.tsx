import { Alert, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useEffect, useState} from 'react'
import axios, {AxiosResponse} from "axios";
import { SERVER_ADDRESS } from "../Cons";

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
        boardList : BoardListType,
        currentPage : number,
        pageSize : number,
        totalElements : number
    }
    
    const [boardList, setBoardList] = useState(null)
    const [targetPage, setTargetPage] = useState(0)

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    const getBoardList = async () => {
        if(localStorage.getItem("accessToken") == null && localStorage.getItem("accesstoken")=="" )  return

        const authHeader : string = "Bearer:" + localStorage.getItem("accessToken")
        console.log(authHeader)

        try {
            const result = await axios.get(SERVER_ADDRESS + '/api/board/getUnreplied', {
                headers: {
                    'Authorization': authHeader
                }
            })

            console.log(result.data)
        } catch ( err){
            console.log( err )
        }

    }
    
    useEffect( () => {
        console.log("useEffect called")
        getBoardList()
    }) 

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
                        <th>내용</th>
                        <th>종류</th>
                        <th>생성날자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>내용물에 대해 문의 드려요</td>
                        <td>TEXT</td>
                        <td>2023-10-15 13:29</td>
                    </tr>
                </tbody>
            </Table>
        </>

    )
}