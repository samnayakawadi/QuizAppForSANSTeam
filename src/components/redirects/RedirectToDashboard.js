import {Navigate, Outlet} from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const RedirectToDashboard = ()=>{
    
    const {userContextData} = useContext(UserContext)
    
    return userContextData.isLoggedIn ? <Navigate to="/dashboard"/> : <Outlet/>
}

export default RedirectToDashboard;