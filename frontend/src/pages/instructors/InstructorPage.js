import React, {useEffect, useState} from 'react';
import './InstructorPage.css';
import CourseCard from "./courses/CourseCard";
import {useCookies} from "react-cookie";
import Axios from "axios";

const InstructorPage = () => {
    const [courses, setCourses] = useState([])
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/instructors/${cookies.user.id}/courses`, config)
            .then(res => {
                setCourses(res.data.courses)
                console.log(res.data)
            }).catch(err=>{
            console.log(err)
        })
    }, [])

    return (
        <div className="course-list">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default InstructorPage;
