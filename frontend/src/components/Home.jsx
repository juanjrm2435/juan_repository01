import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>RATHER LABS: Challenge_01</h1>
            <h4>Course Manager</h4>
            <p>This web page manages a list of courses and students</p>
            <button><Link to="/Rooms">See Rooms</Link></button>
            <button><Link to="/Add_rooms">Create new room</Link></button>
            <button><Link to="/Login">Administrator mode</Link></button>
        </div>
    )
}

export default Home