import React, { useState } from "react";
import { useNavigate, useLocation, resolvePath } from "react-router-dom";
import axios from "axios";


function Add_student () {

    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const [student,setStudent] = useState({
        Name: "",
        Surname: "",
        Gender: "",
        Age: 0
    })

    const handleChange = (e) => {
        setStudent((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try{
            console.log(roomId);
            await axios.post("http://localhost:8800/Add_student/"+roomId,student);
            navigate("/rooms");
        }catch(err){
            return console.log(err);
        }
    }

    return(
        <div>
            <h1>Add new Student</h1>
            <input type="text" placeholder="Name" onChange={handleChange} name="Name"/>
            <input type="text" placeholder="Surname" onChange={handleChange} name="Surname"/>
            <input type="text" placeholder="Gender" onChange={handleChange} name="Gender"/>
            <input type="text" placeholder="Age" onChange={handleChange} name="Age"/>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default Add_student;