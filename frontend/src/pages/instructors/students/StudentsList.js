import React, {useEffect, useState} from 'react';
import './StudentsList.css';
import Axios from "axios";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const StudentsList = () => {
    const [students, setStudents] = useState([])
    const course_id = useParams().course_id
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }
    const [grade, setGrade] = useState(0)

    const handleChange = (event) => {
        setGrade(event.target.value);
    };

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/instructors/${cookies.user.id}/courses/${course_id}/students`, config)
            .then(res => {
                setStudents(res.data.students)
                console.log(res.data)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    const changeGradeHandler = (event) => {
        console.log(`http://localhost:5000/api/instructors/${cookies.user.id}/courses/${course_id}/students/${event.target.value}`)
        Axios.post(`http://localhost:5000/api/instructors/${cookies.user.id}/courses/${course_id}/students/${event.target.value}`, {
            grade: grade
        }, config)
            .then(res => {
                console.log(res.data)
                window.location.reload()
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="students-list">
            <h2>Students List</h2>
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Set Grade</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.username}</td>
                        <td>{student.grade}</td>
                        <td>
                            <input type="text"
                                   onChange={(e) => handleChange(e)}/>
                        </td>
                        <td>
                            <button onClick={changeGradeHandler} value={student.id}>Confirm</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsList;
