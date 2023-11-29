import { createContext, useState, ReactNode } from "react"

export type UserInfo = {
    accessToken : string,
    tel : string,
    role : string,
    bLogin : boolean,
    customorTel : string,
    setAccessToken : (token : string) => void,
    setTel : (tel : string) => void,
    setRole : (role : string) => void,
    setBLogin : (bLogin : boolean) => void,
    //setCustomerTel : (customerTel : string) => void
    setCustomerTel : (updateFunction: (prevTel: string) => string) => void;
}

type UserInfoProviderProps = {
    children : ReactNode
}

export const UserInfoStatusContext = createContext<UserInfo | undefined>(undefined)

export const UserInfoProvider : React.FC<UserInfoProviderProps> = ({children}) => {

    // const strAccessToken : string | null =  localStorage.getItem("accessToken") 
    // const [accessToken, setAccessToken] = useState( strAccessToken===null? "": strAccessToken)
    // const strTel : string | null =  localStorage.getItem("tel") 
    // const [tel, setTel] = useState(strTel===null? "": strTel)
    // const strRole : string | null =  localStorage.getItem("role") 
    // const [role, setRole] = useState(strRole===null? "": strRole)
    // const strBLogin : string | null =  localStorage.getItem("bLogin") 
    // const [bLogin, setBLogin] = useState( (strBLogin!==null && strBLogin==="LOGIN")? true: false)
    // const strCustomerTel : string | null =  localStorage.getItem("customerTel") 
    // const [customorTel, setCustomerTel] = useState(strCustomerTel===null? "": strCustomerTel)

    const strAccessToken : string | null =  sessionStorage.getItem("accessToken") 
    const [accessToken, setAccessToken] = useState(strAccessToken===null? "": strAccessToken)
    const strTel : string | null =  sessionStorage.getItem("tel") 
    const [tel, setTel] = useState(strTel===null? "": strTel)
    const strRole : string | null =  sessionStorage.getItem("role") 
    const [role, setRole] = useState(strRole===null? "": strRole)
    const strBLogin : string | null =  sessionStorage.getItem("bLogin") 
    const [bLogin, setBLogin] = useState(strBLogin!==null && strBLogin==="true" ? true: false)
    const strCustomerTel : string | null =  sessionStorage.getItem("customerTel") 
    const [customorTel, setCustomerTel] = useState(strCustomerTel===null? "": strCustomerTel)

    const userInfo : UserInfo = {
        accessToken, setAccessToken, tel, setTel, role, setRole, bLogin, setBLogin, customorTel, setCustomerTel
    } 

    return (
        <UserInfoStatusContext.Provider value={userInfo}>
            {children}
        </UserInfoStatusContext.Provider>
    );
}