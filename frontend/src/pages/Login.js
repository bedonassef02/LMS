import React, {useState} from 'react';
import Axios from "axios";
import {Navigate} from "react-router-dom";

function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token,setToken] = useState("")
    const [isAuth,setAuth] = useState(true)
    const [user,setUser] = useState({})

    const formHandler = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/api/login",{
            email:email,
            password:password
        }).then(res=>{
            setToken(res.data.token)
            setUser(res.data.user)
            localStorage.setItem("access_token",token)
            localStorage.setItem("user",JSON.stringify(user))
            setAuth(true)
            return <Navigate replace to="/" />;
        }).catch(err=>{
            setAuth(false)
        })
    }

    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }
    return (
        <form onSubmit={formHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" onChange={emailChange} id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                    else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" onChange={passwordChange} id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-check">
                {!isAuth? "U are not auth":null}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Login;