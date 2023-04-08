import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {useCookies} from "react-cookie";
import CardsList from "../components/CardsList";
import AdminNavBar from "../components/AdminNavBar";


function Profile(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['user','access_token']);
    const [courses, setCourses] = useState([])
    const [instructors, setInstructors] = useState([])
    const [url, setUrl] = useState("http://localhost:5000/api/courses")


    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }
        try {
            if (cookies.user.type === "admin") {
                setUrl("http://localhost:5000/api/admin/courses")
                Axios.get(url, config)
                    .then(res => {
                        setCourses(res.data.courses)
                    })

                Axios.get(`http://localhost:5000/api/admin/instructors`, config)
                    .then(res => {
                        setInstructors(res.data.instructors)
                    })
            } else if (cookies.user.type === "student") {
                Axios.get(`http://localhost:5000/api/students/${cookies.user.id}/courses`, config)
                    .then(res => {
                        setCourses(res.data.courses)
                    })
            } else {
                Axios.get(url)
                    .then(res => {
                        setCourses(res.data.courses)
                    })
            }
        } catch (e) {
        }
    }, [])
    return (
        <>
            <h1>Profile</h1>
            {cookies.user.type == "admin"?<><AdminNavBar/> <br/><br/><br/></>:null}
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                </tr>
                </thead>
                <tbody>

                {
                    <tr>
                        <th scope="row">{cookies.user ? cookies.user.id : null}</th>
                        <td>{cookies.user ? cookies.user.username : null}</td>
                        <td>{cookies.user ? cookies.user.email : null}</td>
                        <td>{cookies.user ? cookies.user.phone : null}</td>
                    </tr>
                }

                </tbody>
            </table>

            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course</th>
                    <th scope="col">Code</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>

                {
                    courses ?
                        courses.map(course =>
                            <tr>
                                <th scope="row">{course.id}</th>
                                <td>{course.name}</td>
                                <td>{course.code}</td>
                                <td>{course.status}</td>
                            </tr>)
                        : null
                }

                </tbody>
            </table>


            {
                cookies.user && cookies.user.type && cookies.user.type == "admin" ?
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Instructor name</th>
                            <th scope="col">Instructor email</th>
                            <th scope="col">Instructor phone</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            instructors ?
                                instructors.map(instructor =>
                                    <tr>
                                        <th scope="row">{instructor.id}</th>
                                        <td>{instructor.username}</td>
                                        <td>{instructor.email}</td>
                                        <td>{instructor.status}</td>
                                    </tr>)
                                : null
                        }

                        </tbody>
                    </table>
                    : null
            }
        </>

    );
}

export default Profile;