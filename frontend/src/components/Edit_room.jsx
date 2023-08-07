import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_room = () => {
    const [room,setRoom] =useState({
        subjet: "",
        credits: null,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const courseId = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setRoom((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e=> {
        e.preventDefault();
        try{
            await axios.put("http://localhost:8800/rooms/" + courseId,room);
            navigate("/rooms");
        }catch (err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Edit room</h1>
            <input 
            type="text" 
            placeholder="subjet" 
            onChange={handleChange} 
            name="subjet"
            />
            <input 
            type="text" 
            placeholder="credits" 
            onChange={handleChange} 
            name="credits"
            />
            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default Edit_room