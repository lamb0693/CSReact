import { Button, Form, InputGroup } from "react-bootstrap"
import { useState, useContext } from "react"
import axios, { AxiosResponse } from "axios"
import { UserInfo, UserInfoStatusContext } from "./UserInfoStatusContext"

type AddCounselProps = {
    getBoardList : ()=>void
}

export const AddCounsel = (props : AddCounselProps) => {

    const [message, setMessage] = useState<string>("상담할 내용을 입력하세요")

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
  
    // data 를 upload 한다
    const uploadMessage = async (event:React.MouseEvent<HTMLButtonElement>) => {

        // if(userInfo == null || message != null) {
        //     console.error(userInfo, message)
        //     return <div>Upload Error</div>
        // } 
        if(localStorage.getItem("accessToken") == null || localStorage.getItem("accesstoken")==="" )  return
        const authHeader : string = "Bearer:" + localStorage.getItem("accessToken")
        console.log(authHeader)

        if(localStorage.getItem("tel") == null  || localStorage.getItem("tel")==="" ) return
        const strTel : string = "" + localStorage.getItem("tel")


        const formData = new FormData()
        formData.append('customerTel', strTel)
        formData.append('content', "TEXT")
        formData.append("message", message )

        try {
            const result : AxiosResponse<String> = await axios.post("/api/board/create", formData, {
                headers: {
                    Authorization: authHeader,
                }
            })

            console.log(result.data)
            props.getBoardList()
            
        } catch ( err){
            console.log( err )
        }
    }

    const handleEditChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value)
    }

    return (
        <Form>
            <InputGroup>
                <Form.Control type="text" aria-label="Recipient's username with two button addons"
                     placeholder="상담내용 입력" onChange={handleEditChange}/>
                <Button variant="outline-secondary" onClick={uploadMessage}>전송</Button>
            </InputGroup>
        </Form>
    )
}