import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Axios from "axios";
import {useParams} from "react-router-dom";

const EditCourse = () => {
    const course_id = useParams().course_id
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const config = {
        headers: {Authorization: `Bearer ${cookies.access_token}`}
    };

    useEffect(()=>{
        Axios.get(`http://localhost:5000/api/courses/${course_id}`)
            .then(res=>{
                setName(res.data.courses[0].name)
                setCode(res.data.courses[0].code)
            }).catch(err=>{
            console.log(err)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyParameters = {
            name:name,
            code:code
        }

        Axios.put(`http://localhost:5000/api/admin/courses/${course_id}`,
            bodyParameters,
            config
        ).then(res => {
            console.log(bodyParameters)
            console.log(res.data)
            setName('');
            setCode('');
        }).catch(err => {
            console.log(err)
        })
    };


    return (
        <div className="create-course">
            <h2>Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>

                <label htmlFor="code">Code</label>
                <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required/>

                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default EditCourse;