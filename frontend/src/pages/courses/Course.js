import React, {useState} from 'react';
import Axios from "axios";
import {useParams} from "react-router-dom";
import Card from "../../components/Card";
import CardsList from "../../components/CardsList";

function Course(props) {
    const [course,setCourse] = useState([])
    Axios.get(`http://localhost:5000/api/courses/${useParams().id}`)
        .then(res=>{
            setCourse(res.data.courses[0])
        })
    return (
        <center>
            <br/><br/><br/><br/>
            <h1>Course : {course.name}</h1>
            <img src={"http://localhost:5000/api/"+course.img_url} width={500}/>
            <h3>Code : {course.code}</h3>
            <h3>Status : {course.status}</h3>
        </center>
    );
}

export default Course;