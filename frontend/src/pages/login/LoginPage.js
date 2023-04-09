import React, {useState} from 'react';
import './LoginPage.css';
import Axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const navigate = useNavigate()
    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
    };
    return (
        <div className="login-page">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={handleUsernameChange}/>
                    <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    {error && <div className="error">{error}</div>}
                    <button type={"submit"}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;