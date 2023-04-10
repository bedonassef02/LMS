import React, {useEffect, useState} from 'react';
import './CourseInfo.css';
import {useParams} from "react-router-dom";
import Axios from "axios";
import {useCookies} from "react-cookie";

const CourseInfo = () => {

    const id = useParams().id
    const [course, setCourse] = useState({})
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data.courses[0])
                console.log(course)
            })
    }, [])

    const registerCourseHandler = ()=>{
        Axios.post(`http://localhost:5000/api/courses/${id}/register`,{
        },config)
            .then(res => {
                console.log(res.data)
            }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <center className="course-info">
            <div className="course-image">
                <img src={`http://localhost:5000/api/${course.img_url}`} alt="Course" />
            </div>
            <div className="course-details">
                <h1>{course.name}</h1>
                <p>{course.code}</p>
                <p>{course.status}</p>
                {course.status=="active"?
                    <button onClick={registerCourseHandler}>Enroll Now</button>
                :
                null}
            </div>
        </center>
    );
};

export default CourseInfo;