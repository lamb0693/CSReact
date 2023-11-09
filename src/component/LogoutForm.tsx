import { CustomConfirmDialog } from "./CustomConfirmDialog"
import { useNavigate } from "react-router"
import { UserInfo } from "../UserInfoStatusContext"
import { useContext } from "react"
import { UserInfoStatusContext } from "../UserInfoStatusContext"
import { Alert, Container } from "react-bootstrap"

export const LogoutForm = () => {
    const navigateTo = useNavigate()

    const userInfo : UserInfo | undefined  = useContext(UserInfoStatusContext)
    if(userInfo === undefined){
        return <div>Form is Not Initialized due to userInfo is undefined</div>
    }

    const doLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("tel")
        localStorage.removeItem("role")
        localStorage.removeItem("bLogin")
        localStorage.removeItem("customerTel")

        userInfo.setTel("")
        userInfo.setAccessToken("")
        userInfo.setRole("")
        userInfo.setBLogin(false)
        userInfo.setCustomerTel("")

        navigateTo("/")
    }

    return(
        <Container>
            <div>
                <Alert variant="primary">
                    Logout Page
                </Alert>
                <CustomConfirmDialog onConfirm={doLogout} text="Logout" message="Logout할까요?"/>  
            </div>
        </Container>
        
    )
}