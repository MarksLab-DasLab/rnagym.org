import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>We couldn't find that page.</p>
        <p><Link to="/">Return to the homepage</Link></p>
    </div>
);

export default NotFound;
