import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:8800/login",{user,password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="User">User</label>
                        <input type="user" placeholder="Enter User" onChange={ e => setUser(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <button>Login</button>
                </form>
            </div>
            
        </div>
    )
}

export default Login