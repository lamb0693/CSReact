import React from 'react';
import './App.css';
import { ClientHome } from './component/ClientHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MenuBar } from './component/MenuBar';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { LoginForm } from './component/LoginForm';
import { UserInfoProvider } from './UserInfoStatusContext';
import { CSRHome } from './component/CSRHome';
import { LogoutForm } from './component/LogoutForm';
import { CounselList } from './component/counsel_component/CounselList';
import { Register } from './component/Register';
import { CSRReply } from './component/CSRReply';
import { ViewDetails } from './component/ViewDetails';
import { WebChattingRoom } from './component/WebChattingRoom';
import { CounselContextProvider } from './component/CounselContext';

function App() {
    return (
        <UserInfoProvider>
            <CounselContextProvider>
                <div className="App">
                    <Header></Header>
                    <MenuBar></MenuBar>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ClientHome/>}/>
                            <Route path="/csr_home" element={<CSRHome/>}/>
                            <Route path="/client_counsel_list" element={<CounselList/>}/>
                            <Route path="/view_details" element={<ViewDetails/>}/>
                            <Route path="/csr_reply" element={<CSRReply/>}/>
                            <Route path="/web_chatting_room" element={<WebChattingRoom/>}/>
                            <Route path="/login" element={<LoginForm/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/logout" element={<LogoutForm/>}/>
                            {/* <Route path="/about/intro" element={<Content/>}/>
                            <Route path="/about/intro/:userId" element={<Content/>}/>
                            <Route path='profile/*' element={<Home name={"Profile"}/>}>
                                <Route path='special' element={<Content />} />
                            </Route>
                            <Route path='*' element={<Error/>}/> */}
                        </Routes>
                    </BrowserRouter>
                    <Footer/>
                </div>
            </CounselContextProvider>
        </UserInfoProvider>
    );
}

export default App;
