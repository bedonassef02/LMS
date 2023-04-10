import React from 'react';
import './Navbar.css';
import {FaUserCircle, FaSignInAlt, FaSignOutAlt, FaChalkboardTeacher, FaDatabase, FaUserTie} from 'react-icons/fa';
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'user'])
    const isLoggedIn = cookies.user ? true : false;
    const logoutHandler = () => {
        removeCookie("user", {path: '/'})
        removeCookie("access_token", {path: '/'})
    }

    return (
        <nav className="navbar">
            <Link className="navbar-brand" to={"/"}>LMS</Link>
            <ul className="nav-items">

                {
                    isLoggedIn && cookies.user.type == "admin" ?
                        <li className="nav-item">
                            <Link className="nav-link" to={"/admin"}>Admin <FaDatabase/></Link>
                        </li>
                        :isLoggedIn && cookies.user.type == "instructor"
                            ?
                            <li className="nav-item">
                                <Link className="nav-link" to={"/instructors/"+cookies.user.id}>Instructor <FaUserTie/></Link>
                            </li>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to={"/courses"}>Courses <FaChalkboardTeacher/></Link>
                        </li>
                }
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={logoutHandler}>Logout <FaSignOutAlt/></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                  to={`/profiles/${cookies.user.id}`}>Profile <FaUserCircle/></Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login <FaSignInAlt/></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/register"}>Register <FaUserCircle/></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;