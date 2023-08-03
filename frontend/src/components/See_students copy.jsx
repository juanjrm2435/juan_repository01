import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";


function See_students () {

	var flag_Data = 1;
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const [students,setStudents] = useState([{
        Name: "",
        Surname: "",
        Gender: "",
        Age: 0
    }])

    useEffect(()=>{
		const fetchStudents = async () => {
			try{
				console.log("Consola del NAVEGADOR");
				const res = await axios.get("http://localhost:8800/see_students/"+roomId);
				console.log(res);
				if (res.data.length == 0){
					flag_Data = 0;
				}else{
					flag_Data = 1;
				}
				setStudents(res.data);
			}catch (err){
				console.log(err)
			}
		}
		fetchStudents();
	},[]);

    const handleDelete = async (id_rooom,id_student) =>{
		try{
			await axios.delete("http://localhost:8800/see_students/"+id_rooom+"/"+id_student);
			navigate("/rooms");
            //window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

	if (flag_Data){
		return(
			<div>
				<h1>Students in the room: {roomId}</h1>
				<div className="Rooms">
				<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Surname</th>
								<th>Gender</th>
								<th>Age</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{students.map(student=>(
								<tr key={student.id}>
									<td>{student.id_student}</td>
									<td>{student.Name}</td>
									<td>{student.Surname}</td>
									<td>{student.Gender}</td>
									<td>{student.Age}</td>
									<td><button onClick={()=>handleDelete(roomId,student.id_student)}>Delete</button></td>
								</tr>
							))}
						</tbody>
						<button><Link to={`/Add_student/${roomId}`}>Add Student</Link></button>
					</table>
				</div>
			</div>
		);
	}
	return(
		<div>
			<h1>Students in the room: {roomId}</h1>
			<h3>"There are no students in this course yet.</h3> 
			<h6>Click on "add student" to start adding them"</h6>
			<button><Link to={`/Add_student/${roomId}`}>Add Student</Link></button>
		</div>
	)
}

export default See_students;

/*

*/