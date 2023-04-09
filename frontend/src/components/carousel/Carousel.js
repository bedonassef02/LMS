import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';

const Carousel = () => {

    return (
        <div className="index">
            <div className="hero">
                <div className="hero-image">
                    <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png" alt="Hero Image"/>
                </div>
                <div className="hero-text">
                    <h1>WELCOME TO LMS</h1>
                    <p>Your Students Deserve an Exceptional Education Experience. Learn How Anthology Can Help. Designed
                        To Help Learners and Instructors Stay Organised and Keep Engagement High. Business. Higher
                        Education. Government</p>
                </div>
            </div>
        </div>
    );
};

export default Carousel;