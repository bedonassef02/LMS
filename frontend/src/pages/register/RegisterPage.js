import React, {useState} from 'react';
import './RegisterPage.css';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['access_token', 'user']);

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const phoneHandler = (event) => {
        setPhone(event.target.value)
    }

    const formHandler = (event) => {
        event.preventDefault()
        Axios.post("http://localhost:5000/api/register", {
            email: email,
            password: password,
            username: username,
            phone: phone
        }).then(res => {
            Axios.post("http://localhost:5000/api/login", {
                email: email,
                password: password
            }).then(res => {
                let expires = new Date()
                expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
                setCookie('access_token', res.data.token, {path: '/', expires})
                setCookie('user', res.data.user, {path: '/', expires})
                navigate('/')
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="create-course">
            <div className="form">
                <h2>Register</h2>
                <form className="register-form" onSubmit={formHandler}>
                    <label htmlFor="name">username</label>
                    <input type="text" id="name" value={username} onChange={usernameHandler} required/>

                    <label htmlFor="email">email</label>
                    <input type="email" id="email" value={email} onChange={emailHandler} required/>

                    <label htmlFor="password">password</label>
                    <input type="password" id="password" value={password} onChange={passwordHandler} required/>

                    <label htmlFor="phone">phone</label>
                    <input type="text" id="password" value={phone} onChange={phoneHandler} required/>

                    <button type="submit">Register</button>
                    <small className="message">
                        Already registered? <Link to={"/login"}>Login</Link>
                    </small>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;