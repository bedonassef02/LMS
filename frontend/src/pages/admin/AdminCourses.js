import React, {useEffect, useState} from 'react';
import Axios from "axios";

function AdminCourses(props) {

    const [link, setLink] = useState("http://localhost:5000/api/courses")
    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get(link)
            .then(res => {
                setCourses(res.data.courses)
                console.log(courses)
            })
    }, [])

    return (
        <center>
            <h1>Admin Courses</h1>

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

                                            <button type="button" className="btn btn-success me-3">
                                                Assign Instructor
                                            </button><button type="button" className="btn btn-primary me-3">
                                                Edit
                                            </button>
                                            <button type="button" className="btn btn-danger me-3">
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