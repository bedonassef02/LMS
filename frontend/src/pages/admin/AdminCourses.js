import React, {useEffect, useState} from 'react';
import Axios from "axios";
import AdminNavBar from "../../components/AdminNavBar";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

function AdminCourses(props) {

    const [link, setLink] = useState("http://localhost:5000/api/courses")
    const [courses, setCourses] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);

    useEffect(() => {
        Axios.get(link)
            .then(res => {
                setCourses(res.data.courses)
            })
    }, [])

    const deleteCourseHandler = (event) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        Axios.delete(`http://localhost:5000/api/admin/courses/${event.target.value}`, config)
            .then(res => {
                setCourses(courses.filter(course => course.id != event.target.value))
                console.log(res.data)
            })
    }

    return (
        <center>
            <AdminNavBar/>
            <h1>Admin Courses</h1>
            <Link to={"/admin/courses/create"}>
                <button type="button" className="btn btn-primary me-3">
                    Create Course
                </button>
            </Link>
            <br/><br/><br/>
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

                                            <Link to={`/admin/courses/${course.id}/assign`}>
                                                <button type="button" className="btn btn-success me-3">
                                                    Assign Instructor
                                                </button>
                                            </Link>
                                            <button type="button" className="btn btn-primary me-3">
                                                Edit
                                            </button>
                                            <button type="button" onClick={deleteCourseHandler} value={course.id}
                                                    className="btn btn-danger me-3">
                                                Delete
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

export default AdminCourses;