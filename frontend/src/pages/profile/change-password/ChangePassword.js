import React, {useState} from 'react';
import "./ChangePassword.css"
import Axios from "axios";
import {useCookies} from "react-cookie";
import {redirect, useNavigate} from "react-router-dom";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const navigate = useNavigate()

    const handleChangePassword = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        const bodyParameters = {
            oldPassword: currentPassword,
            newPassword: newPassword
        };
        if (newPassword === confirmPassword) {
            Axios.post(`http://localhost:5000/api/profiles/${cookies.user.id}/password/change`, bodyParameters, config)
                .then(res => {
                    navigate(`/profiles/${cookies.user.id}`)
                })
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            console.log('Password change failed');
            // add error handling logic here
        }
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordsMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === newPassword);
    };

    return (
        <div className="change-password-page">
            <form onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {!passwordsMatch && (
                        <small style={{color: 'red'}}>Passwords do not match</small>
                    )}
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;