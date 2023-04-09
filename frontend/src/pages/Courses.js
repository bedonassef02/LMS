import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Link, redirect, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

function Courses(props) {
    const [link, setLink] = useState("http://localhost:5000/api/courses")
    const [courses, setCourses] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);

    useEffect(() => {
        Axios.get(link)
            .then(res => {
                setCourses(res.data.courses)
                console.log(courses)
            })
    }, [link])

    const ActiveCourses = () => {
        if (link.endsWith("true")) {
            setLink(link.slice(0, -12))
        } else {
            setLink(link + "?active=true")
        }
        console.log(link)
    }

    const registerHandler = (event)=>{
        const config = {
            headers: { Authorization: `Bearer ${cookies.access_token}` }
        };

        const bodyParameters = {
            headers: { Authorization: `Bearer ${cookies.access_token}` }
        };

        Axios.post(
            `http://localhost:5000/api/courses/${event.target.value}/register`,
            bodyParameters,
            config
        ).then(res=>{
            console.log(res.data)}).catch(console.log);

        Axios.post(`http://localhost:5000/api/courses/${event.target.value}/register`, config)
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <center>
            <button type="button" className="btn btn-primary me-3" onClick={ActiveCourses}>
                Active Courses
            </button>
            <div className="card mb-3" style={{"maxWidth": "540px"}}>
                {
                    !courses ? null :
                        courses.map(course =>
                            <div key={course.id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={`http://localhost:5000/api/${course.img_url}`}
                                            className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{course.name}</h5>
                                            <p className="card-text">{course.code}</p>
                                            <p className="card-text"><small
                                                className="text-muted">{course.status}</small></p>

                                            {course.status == "active" ?
                                                <button type="button" onClick={registerHandler} value={course.id} className="btn btn-primary me-3">
                                                    Register
                                                </button>
                                                : <button type="button" className="btn btn-danger me-3">
                                                    Soon
                                                </button>}
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>)
                }
            </div>
        </center>
    );
}

export default Courses;