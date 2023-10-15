import { createContext, useState, ReactNode } from "react"

export type UserInfo = {
    accessToken : string,
    tel : string,
    role : string,
    bLogin : boolean,
    setAccessToken : (token : string) => void,
    setTel : (tel : string) => void,
    setRole : (role : string) => void,
    setBLogin : (bLogin : boolean) => void
}

type UserInfoProviderProps = {
    children : ReactNode
}

export const UserInfoStatusContext = createContext<UserInfo | undefined>(undefined)

export const UserInfoProvider : React.FC<UserInfoProviderProps> = ({children}) => {
    const [accessToken, setAccessToken] = useState("")
    const [tel, setTel] = useState("")
    const [role, setRole] = useState("")
    const [bLogin, setBLogin] = useState(false)

    const userInfo : UserInfo = {
        accessToken, setAccessToken, tel, setTel, role, setRole, bLogin, setBLogin
    } 

    return (
        <UserInfoStatusContext.Provider value={userInfo}>
            {children}
        </UserInfoStatusContext.Provider>
    );
}