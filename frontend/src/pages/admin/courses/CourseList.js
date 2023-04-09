import React from 'react';
import Course from './Course';
import './Course.css'

const CourseList = ({courses}) => {
    return (
        <div className="course-list">
            {courses.map((course) => (
                <Course key={course.id} course={course}/>
            ))}
        </div>
    );
};

export default CourseList;