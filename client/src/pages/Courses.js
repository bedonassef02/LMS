import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Link} from "react-router-dom";

function Courses(props) {
    const [link,setLink] = useState("http://localhost:5000/api/courses")
    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get(link)
            .then(res => {
                setCourses(res.data.courses)
                console.log(courses)
            })
    }, [link])

    const ActiveCourses = ()=>{
        if(link.endsWith("true")){
            setLink(link.slice(0,-12))
        }else {
            setLink(link + "?active=true")
        }
        console.log(link)
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
                            <div  key={course.id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src="https://assets-global.website-files.com/5e39e095596498a8b9624af1/6193022cdf422e5241274126_Portfolio%20course.jpg"
                                            className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{course.name}</h5>
                                            <p className="card-text">{course.code}</p>
                                            <p className="card-text"><small
                                                className="text-muted">{course.status}</small></p>

                                            <button type="button" className="btn btn-primary me-3">
                                                Register
                                            </button>
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