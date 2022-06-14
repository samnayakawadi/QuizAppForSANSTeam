import {Navigate, Outlet} from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const RedirectIfLoggedIn = ()=>{
    const {userContextData} = useContext(UserContext)

    return userContextData.isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default RedirectIfLoggedIn