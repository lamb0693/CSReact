import { Alert, Table } from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useContext, useEffect, useState} from 'react'
import axios, {AxiosResponse} from "axios";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import { SERVER_ADDRESS } from "../Cons";
//import { SERVER_ADDRESS } from "../Cons"; 프록시 설정후 필요 없어짐

export const CSRHome = () => {

    const navigateTo = useNavigate()

    type BoardListType = {
        "board_id": number,
        "name": string,
        "content": string,
        "message": string,
        "strUpdatedAt": string,
        "breplied": boolean,
        "tel" : string
    }

    type PagedBoardListType = {
        memberListDTOList : Array<BoardListType>,
        currentPage : number,
        pageSize : number,
        totalElements : number
    }

   
    const [boardListArray, setBoardListArray] = useState< Array<BoardListType> | null>(null)
    //const [targetPage, setTargetPage] = useState(0)

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    const getBoardList = async () => {
        if(sessionStorage.getItem("accessToken") == null || sessionStorage.getItem("accesstoken")==="" )  return

        try {
            const result : AxiosResponse<PagedBoardListType> = await axios.get(SERVER_ADDRESS + "/api/board/listUnReplied/0",  {
                headers: {
                    Authorization: "Bearer:" + sessionStorage.getItem("accessToken"),
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

    const handleClick : React.MouseEventHandler<HTMLButtonElement> = (
        event : React.MouseEvent<HTMLButtonElement> ) => {
        const strCusTel = event.currentTarget.getAttribute("data-tel")
        console.log("customerTel setting : ", strCusTel)
        if(strCusTel){
            userInfo?.setCustomerTel(prev  => strCusTel)
            localStorage.setItem("customerTel", strCusTel)
            console.log(localStorage.getItem("customerTel"))
            navigateTo("/csr_reply")
        }      
    }

    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    return (
        <Container>
            <Alert variant="primary">
                상담 대기 목록
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>이름</th>
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
                                <tr key={boardList.board_id} >
                                    <td>{boardList.name}</td>
                                    <td>{boardList.content}</td>
                                    <td>{boardList.message}</td>
                                    <td>{boardList.strUpdatedAt}</td>
                                    <td><button data-tel={boardList.tel} onClick={handleClick} id={""+boardList.board_id}>답변달기</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>

    )
}