import React, {useContext} from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserInfo, UserInfoStatusContext } from '../UserInfoStatusContext';
import { CustomConfirmDialog } from './CustomConfirmDialog';

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
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="csr_home">CSR Home</Nav.Link>
                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                {
                    !userInfo.bLogin && (
                        <>
                            <Nav.Link href="/login">Log in</Nav.Link>
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
 
                <Nav.Link eventKey={2} href="#memes">
                    무슨 link
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}



