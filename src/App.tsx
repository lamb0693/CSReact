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

function App() {
    return (
        <UserInfoProvider>
            <div className="App">
                <Header></Header>
                <MenuBar></MenuBar>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ClientHome/>}/>
                        <Route path="/csr_home" element={<CSRHome/>}/>
                        <Route path="/counsel_list" element={<CounselList/>}/>
                        <Route path="/csr_reply" element={<CSRReply/>}/>
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
        </UserInfoProvider>
    );
}

export default App;
