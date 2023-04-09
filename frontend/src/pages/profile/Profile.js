import React, {useEffect, useState} from 'react';
import './Profile.css';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const Profile = () => {

    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const isLoggedIn = cookies.user ? true : false
    const [imgUrl, setImgUrl] = useState()

    useEffect(() => {
        if (cookies.user.type === "admin") {
            setImgUrl("https://cdn3.iconfinder.com/data/icons/user-group-black/100/user-process-512.png")
        } else if (cookies.user.type === "student") {
            setImgUrl("https://static.vecteezy.com/system/resources/previews/000/511/962/original/vector-student-glyph-black-icon.jpg")
        } else {
            setImgUrl("https://thumbs.dreamstime.com/b/teacher-icon-vector-male-person-profile-avatar-book-teaching-school-college-university-education-glyph-113755262.jpg")
        }
    }, [])
    return (
        <div>
            {!isLoggedIn ? (
                    <div>
                        <h2>Welcome to your profile page!</h2>
                        <p>Here's some information about you:</p>
                    </div>
                ) :
                <div className="profile">
                    <h1>Profile</h1>
                    <div className="profile-info">
                        <img src={imgUrl}
                             alt="Profile"/>
                        <div className="profile-details">
                            <h2>{cookies.user.username}</h2>
                            <p>{cookies.user.email}</p>
                            <p>{cookies.user.phone}</p>
                            <p>{cookies.user.type}</p>
                            <Link to="change-password" className="change-password-button">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Profile;