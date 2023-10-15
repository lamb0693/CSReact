import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useContext} from 'react';
import { SERVER_ADDRESS } from '../Cons';
import axios, {AxiosResponse} from "axios"
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { useNavigate } from 'react-router-dom'


export const LoginForm = () => {
    const navigateTo  = useNavigate()

    const [tel, setTel] = useState('010XXXXYYYY')
    const [password, setPassword] = useState('')

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }


    const getToken3 = async () => {
        try{
            const response : AxiosResponse =  await axios.post(SERVER_ADDRESS + "/getToken",
                {
                    tel : tel,
                    password : password
                }
            ) 
            console.log(response.data, response.status)
            if(response.status === 200){
                userInfo.setAccessToken(response.data.accessToken)
                userInfo.setTel(response.data.tel)
                userInfo.setRole(response.data.role)
                userInfo.setBLogin(true)
                console.log("tel = " + userInfo.tel)
                if(userInfo.role === 'USER') navigateTo("/")
                else if (userInfo.role === 'CSR') navigateTo("/csr_home")
            }else {
                console.log("response is not 200")
            }
        } catch(err ) {
            console.log(err)
        }  
 
    }
  
    
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //******Ajax login 
        alert(tel + ", " + password)
        getToken3()

        //****** */
    }

    const handleTelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTel(event.target.value)
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

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" onChange={handlePwdChange} placeholder="Password" />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check label="Remember me" />
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

