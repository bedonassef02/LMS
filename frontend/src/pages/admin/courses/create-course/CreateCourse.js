import React, {useState} from 'react';
import './CreateCourse.css'
import {useCookies} from "react-cookie";
import Axios from "axios";

const CreateCourse = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const config = {
        headers: {Authorization: `Bearer ${cookies.access_token}`}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);
        formData.append('course_img', file);
        const bodyParameters = formData

        Axios.post("http://localhost:5000/api/admin/courses",
            bodyParameters,
            config
        ).then(res => {
            console.log(res.data)
            setName('');
            setCode('');
            setImage('');
            setFile(null);
        }).catch(err => {
            console.log(err)
        })
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="create-course">
            <h2>Create a New Course</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>

                <label htmlFor="code">Code</label>
                <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required/>


                <label htmlFor="image">Image</label>
                <div className="image-preview">
                    {image ? <img src={image} alt="Course Preview"/> : <div></div>}
                    <input type="file" id="image" accept="image/*" onChange={handleFileChange} required/>
                </div>

                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;