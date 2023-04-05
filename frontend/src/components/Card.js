import React from 'react';
import {Link} from "react-router-dom";

function Card(props) {
    return (
        <>
            <div className="card">
                <Link to={`/courses/${props.course.id}`}>
                    <img
                        src="https://media.istockphoto.com/id/1353769234/photo/training-and-skill-development-concept-with-icons-of-online-course-conference-seminar-webinar.jpg?b=1&s=170667a&w=0&k=20&c=Xvgely4jk8x3zPHifnzlsDg4Ou26QtH424SYrMfIbNo="
                        className="card-img-top"
                        alt="Hollywood Sign on The Hill"/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{props.course.name ?? null}</h5>
                    <p className="card-text">
                        Code : {props.course.code}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">{props.course.status ?? null}</small>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Card;