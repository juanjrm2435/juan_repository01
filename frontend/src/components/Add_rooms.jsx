import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add_rooms = () => {
    const [room,setRoom] =useState({
        subjet: "",
        credits: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setRoom((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e=> {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/rooms",room);
            navigate("/rooms");
        }catch (err){
            console.log(err);
        }
    }

    console.log(room);

    return (
        <div className="form">
            <h1>Add new room</h1>
            <input type="text" placeholder="subjet" onChange={handleChange} name="subjet"/>
            <input type="text" placeholder="credits" onChange={handleChange} name="credits"/>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default Add_rooms 