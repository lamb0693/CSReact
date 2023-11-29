import { Alert, Container} from "react-bootstrap"
import { UserInfo, UserInfoStatusContext } from "../UserInfoStatusContext";
import { useContext } from 'react'
//import axios, {AxiosResponse} from "axios";
//import { SERVER_ADDRESS } from "../Cons";
import { CounselList } from "./counsel_component/CounselList";

export const CSRReply = () => {

    // type BoardListType = {
    //     "board_id": number,
    //     "name": string,
    //     "content": string,
    //     "message": string,
    //     "strUpdatedAt": string,
    //     "breplied": false
    // }

    //const [boardListArray, setBoardListArray] = useState< Array<BoardListType> | null>(null)
    //const [targetPage, setTargetPage] = useState(0)

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    // const getBoardList = async () => {

    //     const authHeader : string = "Bearer:" + sessionStorage.getItem("accessToken")
    //     console.log(authHeader)

  
    //     try {
    //         if(userInfo==null || userInfo===undefined) return
    //         const formData = new FormData();
    //         formData.append('noOfDisplay', '30');
    //         formData.append('tel', userInfo?.customorTel)
    //         const result : AxiosResponse<Array<BoardListType>> = await axios.post(SERVER_ADDRESS + "/api/board/list", formData,  
    //             {headers: {
    //                 Authorization: authHeader,
    //             }
    //         })

    //         console.log(result.data)
    //         setBoardListArray(result.data)
            
    //     } catch ( err){
    //         console.log( err )
    //     }

    // }
   
    // useEffect( () => {
    //     console.log("useEffect called")
    //     getBoardList()
    // }, []) 

    // if(userInfo === undefined){
    //     return <div>Form is Not Initialized due to userInfo is undefined</div>
    // }

    return (
        <Container>
            <Alert variant="primary">
                답변 달기 : 상담 중인 고객 전화 번호 : {userInfo?.customorTel}
            </Alert>
            {/* <AddCounsel getBoardList={getBoardList}></AddCounsel> */}
            <CounselList></CounselList>
        </Container>

    )
}