import React from 'react';
import {Link} from "react-router-dom";
import {useCookies} from 'react-cookie';

function Header(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);

    const logoutHandler = () => {
        removeCookie("user", {path: '/'})
        removeCookie("access_token", {path: '/'})
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand me-2" to={"/"}>
                        <img
                            src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png"
                            height="16"
                            alt="MDB Logo"
                            loading="lazy"
                            style={{"marginTop": "-1px"}}
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Learning Managment System</Link>
                            </li>
                        </ul>
                        {!cookies.user ?
                            <div className="d-flex align-items-center">
                                <Link to={"/courses"}>Courses</Link>
                                <button type="button" className="btn btn-link px-3 me-2">
                                    <Link to={"/login"}>Login</Link>
                                </button>
                                <button type="button" className="btn  me-3">
                                    <Link to={"/register"}>Register</Link>
                                </button>
                            </div>
                            : <>
                                <button type="button" onClick={logoutHandler} className="btn btn-danger me-3">
                                    Logout
                                </button>
                                {cookies.user.type == "instructor" ?
                                    < Link to={`/instructors/${cookies.user.id}`}>
                                        <button type="button" className="btn btn-primary me-3">
                                            Instrucors
                                        </button>
                                    </Link>
                                    : null
                                }
                                <Link to={`/profiles/${cookies.user.id}`}>
                                    <button type="button" className="btn btn-primary me-3">
                                        See Profile
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-secondary btn-circle btn-xl">
                                    {cookies.user.username}
                                </button>

                            </>
                        }

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;