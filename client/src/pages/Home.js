import React, {useEffect, useState} from 'react';
import Heading from "../components/Heading";
import CardsList from "../components/CardsList";
import Axios from "axios";

function Home(props) {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:5000/api/courses")
            .then(res=>{setCourses(res.data.courses)})
    }, [])
    return (
        <>
            <Heading name={"Our Courses"}/>
            <CardsList courses={courses}/>
        </>
    );
}

export default Home;