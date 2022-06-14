// import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import HomeNavbar from "../navbars/HomeNavbar"
import DashboardNavbar from "../navbars/DashboardNavbar"

const NavbarRedirects = ()=>{
    
    const {userContextData} = useContext(UserContext)
    
    return userContextData.isLoggedIn ? <DashboardNavbar/> : <HomeNavbar/>;
}

export default NavbarRedirects