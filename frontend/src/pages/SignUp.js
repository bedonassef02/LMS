import React, {useState} from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function SignUp(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'user']);

    const formHandler = (event) => {
        event.preventDefault();
        console.log(email, username, phone, password)
        Axios.post("http://localhost:5000/api/register", {
            email: email,
            password: password,
            username: username,
            phone: phone
        }).then(res => {
            Axios.post("http://localhost:5000/api/login", {
                email: email,
                password: password,
            }).then(result => {
                let expires = new Date()
                expires.setTime(expires.getTime() + (1000 * 1000))
                setCookie('access_token', result.data.token, {path: '/', expires})
                setCookie('user', result.data.user, {path: '/', expires})
                navigate("/")
            })
        }).catch(err => {
            console.log("ERROR")
        })
    }

    const emailChange = (event) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const phoneChange = (event) => {
        setPhone(event.target.value)
    }
    const usernameChange = (event) => {
        setUsername(event.target.value)
    }
    return (
        <form onSubmit={formHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" onChange={usernameChange} id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Enter Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" onChange={emailChange} id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input type="text" className="form-control" onChange={phoneChange} id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Enter Phone"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" onChange={passwordChange} id="exampleInputPassword1"
                       placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default SignUp;