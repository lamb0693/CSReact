import React, {useContext} from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';

export const MenuBar = () => {

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    const doLogout = () => {
        if(userInfo === undefined) return
        userInfo.setAccessToken("")
        userInfo.setRole("")
        userInfo.setBLogin(false)
        userInfo.setTel("")
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">홈</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {userInfo.role=="USER" && <Nav.Link href="/counsel_list">고객 게시판</Nav.Link>}
                {userInfo.role=="CSR" && <Nav.Link href="/csr_home">상담대기 게시판</Nav.Link> }
                {userInfo.role=="CSR" && userInfo.customorTel != "" && <Nav.Link href="/csr_reply">고객 문의 답변 달기</Nav.Link>}
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
    );
}



