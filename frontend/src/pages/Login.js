import React, {useState} from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuth,setAuth] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['access_token','user']);
    const navigate = useNavigate()
    const formHandler = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/api/login",{
            email:email,
            password:password
        }).then(res=>{
            let expires = new Date()
            expires.setTime(expires.getTime() + (100000 * 100000))
            setCookie('access_token', res.data.token, { path: '/',  expires})
            setCookie('user', res.data.user, { path: '/',  expires})
            setAuth(true)
            navigate("/")
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