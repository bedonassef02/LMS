import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
    return (
        <div className="admin-home-container">
            <h1>Welcome to the Admin Home Page</h1>
            <div className="admin-links-container">
                <Link to="courses" className="admin-link">
                    Courses
                </Link>
                <Link to="instructors" className="admin-link">
                    Instructors
                </Link>
            </div>
        </div>
    );
};

export default Admin;