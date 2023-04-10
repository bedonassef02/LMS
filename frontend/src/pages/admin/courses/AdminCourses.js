import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Axios from "axios";
import "./AdminCourses.css"
import {Link} from "react-router-dom";

function AdminCourses(props) {
    const [courses, setCourses] = useState([])
    const [instructors, setInstructors] = useState([])
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
                console.log(res.data.courses)
            })
        Axios.get("http://localhost:5000/api/admin/instructors", config)
            .then(res => {
                setInstructors(res.data.instructors)
            })
    }, [])

    const handleInstructorAssign = (course_id, instructor_id) => {
        Axios.post("http://localhost:5000/api/admin/assignInstructorToCourse", {
            course_id: course_id,
            instructor_id: instructor_id
        }, config)
            .then(res => {
                console.log(res.data)
            })
    }

    const handleCourseDelete = (id) => {
        Axios.delete(`http://localhost:5000/api/admin/courses/${id}`, config)
            .then(res => {
                console.log(res.data.msg)
                window.location.reload()
            }).catch(err=>{
            console.log(err)})
    }
    return (
        <div className="admin-courses-container">
            <Link to="create">Create New Course</Link>
            <table className="courses-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>
                            <select
                                value={course.id}
                                onChange={(event) =>
                                    handleInstructorAssign(course.id, event.target.value)
                                }
                            >
                                <option value="">Select an instructor</option>
                                {instructors.map((instructor) => (
                                    <option value={instructor.id} key={instructor.id}>
                                        {instructor.email}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button
                                className="delete-button"
                                onClick={() => handleCourseDelete(course.id)}
                            >
                                Delete
                            </button>
                            <Link to={`${course.id}/edit`}>
                                <button className="edit-button">Edit</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCourses;