import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Axios from "axios";



function CourseList() {

    const [cookies, setCookie] = useCookies(['access_token', 'user'])

    const [courses, setCourses] = useState([])

    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/students/${cookies.user.id}/courses`,config)
            .then(res => {
                setCourses(res.data.courses.sort((c1,c2)=>c1.id>c2.id?1:-1))
                console.log(res.data)
            })
    }, [])

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
            {courses.map(course => (
                <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.grade}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CourseList;
