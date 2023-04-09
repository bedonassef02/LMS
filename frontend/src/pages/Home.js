import React, {useEffect, useState} from 'react';
import Axios from "axios";
import CourseList from "../components/courses/CourseList";
import Carousel from "../components/carousel/Carousel";

function Home(props) {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:5000/api/courses")
            .then(res => {
                setCourses(res.data.courses)
            })
    }, [])
    return (
        <div>
            <Carousel/>
            <center><h1>Our Courses</h1></center>
            <CourseList courses={courses}/>
        </div>
    );
}

export default Home;