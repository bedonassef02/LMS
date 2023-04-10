import React from 'react';
import {Link} from "react-router-dom";

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <img className="course-image" src={`http://localhost:5000/api/${course.img_url}`} alt={course.title} />
            <h3 className="course-title">{course.name}</h3>
            <p className="course-description">{course.code}</p>
            <Link to={`courses/${course.id}/students`}>Show Students</Link>
        </div>
    );
};

export default CourseCard;