import React, {useEffect, useState} from 'react';
import './CourseInfo.css';
import {useParams} from "react-router-dom";
import Axios from "axios";

const CourseInfo = () => {
    const id = useParams().id

    const [course, setCourse] = useState({})

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data.courses[0])
                console.log(course)
            })
    }, [])
    return (
        <div className="course-info">
            <div className="course-image">
                <img src={`http://localhost:5000/api/${course.img_url}`} alt="Course" />
            </div>
            <div className="course-details">
                <h1>{course.name}</h1>
                <p>{course.code}</p>
                <p>{course.status}</p>
                {course.status=="active"?
                    <a href="#">Enroll Now</a>
                :
                null}
            </div>
        </div>
    );
};

export default CourseInfo;