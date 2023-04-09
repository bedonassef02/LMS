import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";
import {useCookies} from "react-cookie";

function InstructorCourses(props) {

    const {course_id, id} = useParams()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const [students, setStudents] = useState([])
    const [grade, setGrade] = useState(0)
    const [std_id, setStdId] = useState(0)

    useEffect(() => {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        Axios.get("http://localhost:5000/api/instructors/16/courses/25/students", config)
            .then(res => {
                setStudents(res.data.students)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    const gradeHandler = (event) => {
        setGrade(event.target.value)
    }

    const stdIdHandler = (event)=>{
        setStdId(event.target.value)
    }
    const formHandler = (event) => {
        event.preventDefault()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        const bodyParameters = {
            grade: grade
        };

        Axios.post(`http://localhost:5000/api/instructors/${cookies.user.id}/courses/${course_id}/students/${std_id}`, bodyParameters, config)
            .then(res => {
                console.log("Done")
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <h1>Students</h1>
            {
                students ?
                    students.map(student =>
                        <div>
                            <h3>{student.id} : {student.username} - Grade : {student.grade}</h3>
                            <form onSubmit={formHandler}>
                                <input placeholder={"set grade"} onChange={gradeHandler}/>
                                <button type={"submit"} onClick={stdIdHandler} value={student.id}>Update</button>
                            </form>
                        </div>)
                    : null
            }
        </div>
    );
}

export default InstructorCourses;