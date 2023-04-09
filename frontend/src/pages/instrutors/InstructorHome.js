import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import {useCookies} from "react-cookie";

function InstructorHome(props) {
    const id = useParams().id

    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const [courses, setCourses] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        Axios.get("http://localhost:5000/api/instructors/16/courses", config)
            .then(res => {
                setCourses(res.data.courses)
            }).catch(err => {
            console.log(err)
        })

        Axios.get("http://localhost:5000/api/instructors/16/students", config)
            .then(res => {
                setStudents(res.data.students)
                console.log(students)
            }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <center>
            <h1>Instructors</h1>
            <h3>Courses</h3>
            {
                courses ?
                    courses.map(course =>
                        <div>
                            <p>{course.id} : {course.name}</p>
                            <Link to={`courses/${course.id}`}>More</Link>
                        </div>)
                    : null
            }
            <h3>Students</h3>

            {
                students ?
                    students.map(student =>
                        <div>
                            <p>{student.student_id} : {student.username}</p>
                        </div>)
                    : null
            }
        </center>
    );
}

export default InstructorHome;