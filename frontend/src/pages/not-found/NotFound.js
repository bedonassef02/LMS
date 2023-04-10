import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for could not be found.</p>
            <Link to="/" className="btn">Go back to home</Link>
        </div>
    );
};

export default NotFound;