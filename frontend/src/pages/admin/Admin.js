import React, {useEffect, useState} from 'react';
import './Admin.css';
import Axios from "axios";
import {useCookies} from "react-cookie";
import CourseList from "./courses/CourseList";
import {Link} from "react-router-dom";

const Admin = () => {
    const [courses, setCourses] = useState([])
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/api/admin/courses", config)
            .then(res => {
                setCourses(res.data.courses)
            })
    }, [])
    return (
        <div className="admin">
            <h1>Manage Courses and Instructors</h1>
            <CourseList courses={courses}/>
            <Link className="add-course" to={"courses/create"}>Add Course</Link>
            <div className="instructor-list">
                <div className="instructor">
                    <h2>Instructor Name</h2>
                    <p>Instructor Bio</p>
                    <div className="instructor-buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                {/* Repeat this instructor element for each instructor */}
            </div>
            <button className="add-instructor">Add Instructor</button>
        </div>
    );
};

export default Admin;