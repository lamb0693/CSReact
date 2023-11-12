import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserInfo, UserInfoStatusContext } from "../UserInfoStatusContext"
import axios,{ AxiosResponse } from "axios"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { SERVER_ADDRESS } from "../Cons"

export const Register = () => {
    const navigateTo  = useNavigate()

    const [tel, setTel] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        const data = {
            tel : tel,
            name : name,
            password : password
        }

        try{
            const response : AxiosResponse =  await axios.post(SERVER_ADDRESS + "/register", 
                data   
            )
 
            console.log(response.data, response.status)
            if(response.status === 200){
                alert("회원 가입 성공, 로그인 하세요")
                navigateTo("/")
            }else {
                alert("회원 가입 실패" + response.statusText)
                console.log("response is not 200")
            }
        } catch(err ) {
            console.log(err)
            alert(err)
        }  
 
    }
  
    
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert(tel + ", " + password + "," + name)
        register()
     }

    const handleTelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTel(event.target.value)
    }

    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handlePwdChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    return (
        <Container style={{paddingTop:"2vh"}}>

            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    전화번호
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" onChange={handleTelChange} placeholder="숫자만 입력하세요" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                    이름
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" onChange={handleNameChange} placeholder="name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" onChange={handlePwdChange} placeholder="Password" />
                    </Col>
                </Form.Group>
                

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>

        </Container>
    );   
}