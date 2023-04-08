import React from 'react';
import {Link} from "react-router-dom";

function Card(props) {
    return (
        <>
            <div className="card" key={props.course.id}>
                <Link to={`/courses/${props.course.id}`}>
                    <img
                        src={`http://localhost:5000/api/${props.course.img_url}`}
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