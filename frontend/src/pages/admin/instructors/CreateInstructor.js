import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Axios from "axios";

function CreateInstructor(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['access_token', 'user']);
    const config = {
        headers: {Authorization: `Bearer ${cookies.access_token}`}
    };

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
        Axios.post("http://localhost:5000/api/admin/instructors", {
            email: email,
            password: password,
            username: username,
            phone: phone
        }, config)
            .then(res => {
                console.log(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="register-page">
            <div className="form">
                <h2>Create Instructor</h2>
                <form className="register-form" onSubmit={formHandler}>
                    <input type="text" placeholder="userame" onChange={usernameHandler}/>
                    <input type="email" placeholder="Email Address" onChange={emailHandler}/>
                    <input type="password" placeholder="Password" onChange={passwordHandler}/>
                    <input type="text" placeholder="Phone" onChange={phoneHandler}/>
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateInstructor;