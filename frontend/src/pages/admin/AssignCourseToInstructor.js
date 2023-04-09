import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import Axios from "axios";

function AssignCourseToInstructor(props) {
    const course_id = useParams().id

    const [instructors, setInstructors] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const [instructor_id, setInstructorId] = useState(16)

    useEffect(() => {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        Axios.get(`http://localhost:5000/api/admin/instructors`, config)
            .then(res => {
                setInstructors(res.data.instructors)
            })
    }, [])

    const selectInstructorHandler = (event) => {
        setInstructorId(event.target.value)
    }

    const formHandler = (event) => {
        event.preventDefault()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }

        const bodyParameters = {
            course_id: course_id,
            instructor_id: instructor_id
        };
        Axios.post(`http://localhost:5000/api/admin/assignInstructorToCourse`,
            bodyParameters,
            config)
            .then(res => {
                console.log(res)
            }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div>
            <h1>Assign Course</h1>
            <label htmlFor="cars">Choose an Instructor:</label>

            <form onSubmit={formHandler}>
                <select id="instructors" onChange={selectInstructorHandler}>
                    {
                        instructors ?
                            instructors.map(instructor =>
                                <option value={instructor.id}>{instructor.email}</option>)
                            : null
                    }
                </select>
                <input type={"submit"}/>
            </form>
        </div>
    );
}

export default AssignCourseToInstructor;