import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { SERVER_ADDRESS } from '../Cons';
import axios, {AxiosError, AxiosResponse} from "axios"


export const LoginForm = () => {
    const [tel, setTel] = useState('010XXXXYYYY')
    const [password, setPassword] = useState('')

    const postData = {
        tel: "01031795981",
        password: "00000000",
    }
   

    const getToken = async () => {
        try{
            const response : AxiosResponse =  await axios.post("http://localhost:8080/auth/login", 
            {
                tel : "01031795981",
                password : "00000000"
            })
            console.log(response)
        } catch(err ) {
            console.log(err)
        }
    }

    const getToken2 = async () =>{
        try {
            const result = await axios.get(SERVER_ADDRESS + "/")

            console.log(result.data)
        } catch (err) {
            console.log(err)
        }
    } 

    const getToken3 = async () => {
        try{
            const response : AxiosResponse =  await axios.post("http://localhost:8080/getToken",
                {
                    tel : tel,
                    password : password
                }
            ) 
            console.log(response.data)
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

