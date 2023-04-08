import React from 'react';
import {Link} from "react-router-dom";

function AdminNavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/admin/courses"}>Courses</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Instructors</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AdminNavBar;