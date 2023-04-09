import React, {useEffect, useState} from 'react';
import Axios from "axios";
import CourseList from "../../components/courses/CourseList";

const CoursesPage = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:5000/api/courses")
            .then(res => {
                setCourses(res.data.courses)
            })
    }, [])

    return (
        <CourseList courses={courses}/>
    );
};

export default CoursesPage;