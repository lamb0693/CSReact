import { Button, Form, InputGroup } from "react-bootstrap"
import { useState, useContext } from "react"
import axios, { AxiosResponse } from "axios"
import { UserInfo, UserInfoStatusContext } from "../UserInfoStatusContext"
import { SERVER_ADDRESS } from "../Cons"

type AddCounselProps = {
    getBoardList : ()=>void
}

export const AddCounsel = (props : AddCounselProps) => {

    const [message, setMessage] = useState<string>("상담할 내용을 입력하세요")

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
  
    // data 를 upload 한다
    const uploadMessage = async (event:React.MouseEvent<HTMLButtonElement>) => {

        if(userInfo == null || message == null) {
            console.error(userInfo, message)
            return <div>Upload Error</div>
        } 

          // 자기 전화번호는 accessToken으로 감, customerTel만 실어서 보냄
        // if(localStorage.getItem("tel") === null  || localStorage.getItem("tel")==="" ) return
        // if(userInfo == null) return

        const strTel = userInfo.customorTel  
        console.log("customerTel ", strTel)  

        const formData = new FormData()
        formData.append('customerTel', userInfo.customorTel)
        formData.append('content', "TEXT")
        formData.append("message", message )

        try {
            const result : AxiosResponse<String> = await axios.post(SERVER_ADDRESS + "/api/board/create", formData, {
                headers: {
                    Authorization: "Bearer:" + sessionStorage.getItem("accessToken"),
                }
            })

            console.log(result.data)
            props.getBoardList()


            // CSR 이면 성공하면 답변 모두 확인으로 처리
            if(userInfo.role === "CSR"){
                const formData2 = new FormData()
                formData2.append('customerTel', strTel)
                const result2 : AxiosResponse<String> = await axios.post(SERVER_ADDRESS + "/api/board/markReply", formData2, {
                    headers: {
                        Authorization:"Bearer:" + sessionStorage.getItem("accessToken"),
                    }
                })
                console.log(result2.data)
            }
            
        } catch ( err){
            console.log( err )
        }
    }

    const handleEditChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value)
    }

    return (
        <Form className="mb-3">
            <InputGroup>
                <Form.Control type="text" aria-label="Recipient's username with two button addons"
                     placeholder="상담내용 입력" onChange={handleEditChange}/>
                <Button variant="outline-secondary" onClick={uploadMessage}>전송</Button>
            </InputGroup>
        </Form>
    )
}