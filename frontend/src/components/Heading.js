import React from 'react';

function Heading(props) {
    return (
        <>
            <header>
                <div className="p-5 text-center bg-light">
                    <h1 className="mb-3">{props.name}</h1>
                    <a className="btn btn-primary" href="" role="button">See More</a>
                </div>

            </header>
        </>
    );
}

export default Heading;