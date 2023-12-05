import React, {useContext} from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';

export const MenuBar = () => {

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">홈</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {userInfo.role==="USER" && <Nav.Link href="/client_counsel_list">고객 게시판</Nav.Link>}
                        {userInfo.role==="CSR" && <Nav.Link href="/csr_home">상담대기 게시판</Nav.Link> }
                        {userInfo.role==="CSR" && <Nav.Link href="/web_chatting_room">웹상담방</Nav.Link> }
                        {/* {userInfo.role==="CSR" && userInfo.customorTel !== "" && <Nav.Link href="/csr_reply">고객 문의 답변 달기</Nav.Link>} */}
                    </Nav>
                    <Nav>
                        {
                            !userInfo.bLogin && (
                                <>
                                    <Nav.Link href="/login">Log in</Nav.Link>
                                    <Nav.Link href="/register">회원가입</Nav.Link>
                                </>
                            )
                        }
                        {
                            userInfo.bLogin && (
                                <>
                                    <Nav.Link href="">{userInfo.tel}님</Nav.Link>
                                    <Nav.Link>{userInfo.role}</Nav.Link>
                                    {/* <CustomConfirmDialog onConfirm={doLogout} text="Logout" message="Logout할까요?"/> */}
                                    <Nav.Link href="/logout">Logout</Nav.Link>
                                </>

                            )
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </Container>
        
    );
}



