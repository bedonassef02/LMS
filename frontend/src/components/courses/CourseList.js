import React from 'react';
import CourseCard from './CourseCard';
import './CourseList.css'

const CoursesList = ({ courses }) => {
    return (
        <div className="courses-list">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CoursesList;