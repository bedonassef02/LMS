import React from 'react';
import Card from "./Card";

function CardsList(props) {
    return (
        <div className="card-group">
            {
                props.courses? props.courses.map(course=><Card course={course}/>):null
            }
        </div>
    );
}

export default CardsList;