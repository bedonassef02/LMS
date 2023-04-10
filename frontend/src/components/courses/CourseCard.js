import React from 'react';
import {Link} from "react-router-dom";

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <div className="image-container">
                <img src={"http://localhost:5000/api/"+course.img_url} alt={course.title} />
            </div>
            <div className="content-container">
                <h3>{course.name}</h3>
                <p>{course.code}</p>
                <Link to={`/courses/${course.id}`} >
                    <button>More</button>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;