import React, {useEffect, useState} from 'react';
import './AdminInstructors.css';
import {useCookies} from "react-cookie";
import Axios from "axios";
import {Link} from "react-router-dom";

const AdminInstructors = () => {
    const [instructors, setInstructors] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cookies, setCookie] = useCookies(['access_token', 'user'])
    const config = {
        headers: {
            'Authorization': 'Bearer ' + cookies.access_token
        }
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/api/admin/instructors", config)
            .then(res => {
                setInstructors(res.data.instructors)
            })
    }, [])

    const handleDelete = (id) => {
        Axios.delete(`http://localhost:5000/api/admin/instructors/${id}`, config)
        const updatedInstructors = instructors.filter((instructor) => instructor.id !== id);
        setInstructors(updatedInstructors);
    };

    const handleEdit = (id) => {
        const updatedInstructors = instructors.map((instructor) => {
            if (instructor.id === id) {
                return {...instructor, editing: true};
            } else {
                return instructor;
            }
        });
        setInstructors(updatedInstructors);
    };

    const handleSave = (id) => {
        Axios.put(`http://localhost:5000/api/admin/instructors/${id}`, {
            "email": email,
            "username": username,
            "phone": phone,
            "password": "123"
        }, config)
            .then(res => {
                window.location.reload()
                console.log(res.data)
            }).catch(err => {
            console.log(err)
        })
    };

    const handleCancel = (id) => {
        const updatedInstructors = instructors.map((instructor) => {
            if (instructor.id === id) {
                return {...instructor, editing: false};
            } else {
                return instructor;
            }
        });
        setInstructors(updatedInstructors);
    };

    return (
        <div className="admin-instructors-container">
            <Link to="create">Create New Instructor</Link>
            <table className="instructors-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {instructors.map((instructor) => (
                    <tr key={instructor.id}>
                        <td>{instructor.id}</td>
                        {instructor.editing ? (
                            <>
                                <td>
                                    <input type="text" defaultValue={instructor.username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" defaultValue={instructor.email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="text" defaultValue={instructor.phone}
                                           onChange={(e) => setPhone(e.target.value)}/>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave(instructor.id)}>
                                        Save
                                    </button>
                                    <button onClick={() => handleCancel(instructor.id)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{instructor.username}</td>
                                <td>{instructor.email}</td>
                                <td>{instructor.phone}</td>
                                <td>
                                    <button onClick={() => handleEdit(instructor.id)}>Edit</button>
                                    <button onClick={() => handleDelete(instructor.id)}
                                            className={"delete-button"}>Delete
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminInstructors;