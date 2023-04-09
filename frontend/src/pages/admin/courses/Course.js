import React from 'react';
import Axios from "axios";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";

const Course = ({course}) => {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const config = {
        headers: {Authorization: `Bearer ${cookies.access_token}`}
    };

    const deleteCourseHandler = (event) => {
        Axios.delete(`http://localhost:5000/api/admin/courses/${course.id}`, config)
            .then(res => {
                window.location.reload();
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="course">
            <img src={`http://localhost:5000/api/${course.img_url}`} alt={course.title}/>
            <div className="course-details">
                <h2>{course.name}</h2>
                <p>{course.code}</p>
                <Link className="edit-button" to={`courses/${course.id}/edit`}>
                    Edit
                </Link>
                <button className="delete-button" value={course.id} onClick={deleteCourseHandler}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Course;