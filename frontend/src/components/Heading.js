import React from 'react';
import {Link} from "react-router-dom";

function Heading(props) {
    return (
        <>
            <header>
                <div className="p-5 text-center bg-light">
                    <h1 className="mb-3">{props.name}</h1>
                    <Link className="btn btn-primary" to={"/courses"} role="button">See More</Link>
                </div>

            </header>
        </>
    );
}

export default Heading;