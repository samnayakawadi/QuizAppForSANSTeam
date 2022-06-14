import React from "react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({status:false});

  const onChangeHandler = (events)=>{
    setUserData({...userData, [events.target.name]:events.target.value})
  }

  const onSubmitHandler = (events)=>{
    setAlert({status:true, msg:"Processing...", type:"is-primary"})
    events.preventDefault()

    setTimeout(()=>{
      axios.post(`http://localhost:8080/users`, userData).then(response=>{
      if(response.data.status){
        setAlert({status:true, msg:response.data.msg+" Redirecting...", type:"is-success"})
        setTimeout(()=>{
          navigate("/login")
        }, 1100)
      }else{
        setAlert({status:true, msg:response.data.msg, type:"is-info"})  
      }
    }).catch(error=>{
        setAlert({status:true, msg:"Server Error 500", type:"is-danger"})
      })
    }, 1500)
  }

  return (
    <div>
      <div className="columns m-2 is-centered">
        <div className=" box m-2 column is-3 has-background-primary has-text-white has-text-centered">
          <div className="is-size-2 p-5">Register</div>
        </div>
        <div className=" box m-2 column is-5">
          <form className="p-3" onSubmit={onSubmitHandler}>
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input
                  name="name"
                  className="input"
                  type="text"
                  placeholder="e.g Alex Smith"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  name="email"
                  className="input"
                  type="text"
                  placeholder="e.g. alexsmith@gmail.com"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Mobile</label>
              <div className="control">
                <input
                  name="mobile"
                  className="input"
                  type="number"
                  placeholder="e.g. 8421XXXXXX"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  name="username"
                  className="input"
                  type="text"
                  placeholder="e.g. alexsmith"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="e.g. XXXXXX"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {alert.status && <div className={`notification ${alert.type}`}>{alert.msg}</div>}

            <button className="button is-primary is-fullwidth" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
