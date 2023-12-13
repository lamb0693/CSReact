import { Button, Container, Form, InputGroup} from "react-bootstrap"
import { useState, useContext } from "react"
import axios, { AxiosResponse } from "axios"
import { UserInfo, UserInfoStatusContext } from "../UserInfoStatusContext"
import { SERVER_ADDRESS } from "../Cons"
import { CounselContext, UploadInfo } from "./CounselContext"

type AddCounselProps = {
    getBoardList : ()=>void
}

export const AddCounsel = (props : AddCounselProps) => {

    const [message, setMessage] = useState<string>("상담할 내용을 입력하세요")

    const [uploadFilePath, setUploadFilePath] = useState<string | null>(null)

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)

    const uploadInfo : UploadInfo | undefined  = useContext(CounselContext);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          const selectedFile = event.target.files[0];
          console.log("selectedFile", selectedFile)
          setUploadFilePath(URL.createObjectURL(selectedFile));
        }
    };
  
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
        formData.append("message", message )

        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        if (uploadFilePath && fileInput.files != null) {
            const selectedFile = fileInput.files[0];
            formData.append('file', selectedFile);
            formData.append('content', "IMAGE")
        } else {
            formData.append('content', "TEXT")
        }

        try {
            const result : AxiosResponse<String> = await axios.post(SERVER_ADDRESS + "/api/board/create", formData, {
                headers: {
                    Authorization: "Bearer:" + sessionStorage.getItem("accessToken"),
                }
            })

            uploadInfo?.setUplopaded(true);

            if(uploadFilePath) setUploadFilePath(null)

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
            if (axios.isAxiosError(err)) {
                console.log(err)
                if( err.response?.status === 400) alert(err.response?.data);
                else alert (err.response?.data)
            } else {
                alert("시스템 관리자에게 문의하세요")
            }
        }
    }

    const handleEditChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value)
    }

    return (
        <Container>
            <Form className="mb-3">
                <InputGroup>
                    <Form.Control type="text" aria-label="Recipient's username with two button addons"
                        placeholder="상담내용 입력" onChange={handleEditChange}/>
                    <Form.Control id="fileInput" type="file" accept=".jpg, .jpeg" onChange={handleFileChange} />
                    <Form.Label>사진 첨부(jpg 만 가능)</Form.Label>
                    <Button variant="outline-secondary" onClick={uploadMessage}>전송</Button>
                </InputGroup>
            </Form>
            {uploadFilePath && <img src={uploadFilePath} width="100%"></img> }
        </Container>

    )
}