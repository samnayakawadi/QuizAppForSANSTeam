import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Login = () => {
  const {userContextData, setUserContextData} = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({status:false});
  // const navigate = useNavigate();

  const onChangeHandler = (events)=>{
    setUserData({...userData, [events.target.name]:events.target.value})
  }

  const onSubmitHandler = (events)=>{
    setAlert({status:true, type:"is-primary", msg:"Processing..."})
    
    setTimeout(()=>{
      axios.post(`http://localhost:8080/validateuser`, userData).then(response=>{
      if(response.data.status){
        setAlert({status:true, type:"is-success", msg:"Login Successfull. Redirecting..."})

        setTimeout(()=>{
          setUserContextData({...userContextData, 
            userid:response.data.userid, 
            name:response.data.name, 
            email:response.data.email, 
            mobile:response.data.mobile, 
            username:response.data.username,
            isLoggedIn:true})
        }, 800)
      }
      else{
        setAlert({status:true, type:"is-info", msg:response.data.msg})
      }
    }).catch(err=>{
      setAlert({status:true, type:"is-danger", msg:"Server Error 500"})
    })
    }, 1000)

    events.preventDefault();
  }
  return (
    <div>
      <div className="columns m-2 is-centered mt-5 mb-5">
        <div className="m-2 box p-5 has-text-white has-background-primary column is-3 has-text-centered">
          <p className="is-size-2">Login</p>
        </div>
        <div className="m-2 column is-5 box ">
          <form onSubmit={onSubmitHandler}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  onChange={onChangeHandler}
                  className="input"
                  name="username"
                  type="text"
                  placeholder="e.g alexsmith"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  onChange={onChangeHandler}
                  className="input"
                  name="password"
                  type="password"
                  placeholder="e.g. XXXXXXX"
                />
              </div>
            </div>

            {alert.status && <div className={`notification ${alert.type}`}>{alert.msg}</div>}

            <button type="submit" className="button is-primary is-fullwidth">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
