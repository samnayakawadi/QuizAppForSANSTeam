import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ()=>{
    const {userContextData, setUserContextData} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(()=>{
        setUserContextData({...userContextData, isLoggedIn:false})

        setTimeout(()=>{
        navigate("/login")
    }, 1500)
    }, [])

    return(
        <div className="columns is-centered m-5">
            <div className="column is-5 has-text-white p-5 box m-5 has-text-centered has-background-info">Logging Out... Please Wait</div>
        </div>
    )
}
export default Logout;