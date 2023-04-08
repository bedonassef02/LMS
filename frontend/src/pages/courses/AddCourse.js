import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


function AddCourse(props) {

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [img, setImg] = useState({})
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const navigate = useNavigate()
    useEffect(() => {
        try {
            if (!cookies.user.type == "admin") {
                navigate("/login")
            }
        } catch (e) {
            navigate("/login")
        }
    }, [])

    const nameHandler = (event) => {
        setName(event.target.value)
    }
    const codeHandler = (event) => {
        setCode(event.target.value)
    }
    const imgHandler = (e) => {
        setImg({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        })
    };


    const formHandler = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("course_img", img.pictureAsFile);
        formData.append("name", name)
        formData.append("code", code)
        const config = {
            headers: {Authorization: `Bearer ${cookies.access_token}`}
        };

        const bodyParameters = formData

        Axios.post("http://localhost:5000/api/admin/courses",
            bodyParameters,
            config
        )
    }
    return (
        <div>
            <h1>Add New Course</h1>
            <form onSubmit={formHandler}>
                <input type={"text"} placeholder={"enter name"} onChange={nameHandler}/>
                <input type={"text"} placeholder={"enter code"} onChange={codeHandler}/>
                <input type={"file"} onChange={imgHandler}/>
                <button type={"submit"}>Add</button>
            </form>
        </div>
    );
}

export default AddCourse;