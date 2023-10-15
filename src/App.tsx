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
                        <Route path="/login" element={<LoginForm/>}/>
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
