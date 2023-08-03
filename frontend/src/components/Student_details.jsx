import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Student_details () {

    const location = useLocation();
    const navigate = useNavigate();

    const id_student = location.pathname.split("/")[2];

    const [student,setStudent] = useState([{
        Name: "",
        Surname: "",
        Gender: "",
        Age: 0
    }])

    const [siblings,setSiblings] = useState(0);

    useEffect(()=>{
		const fetchStudent = async () => {
			try{
				const res = await axios.get("http://localhost:8800/student_details/"+id_student);
				setStudent(res.data);
			}catch(err){
				console.log(err);
			}
		}
		fetchStudent();
	},[]);

    
    const handleClick = async (id_student) =>{
		try{
			const res = await axios.get("http://localhost:8800/student_details/"+id_student+"/siblings");
            console.log(res.data[0].siblings);
            setSiblings(res.data[0].siblings);
            console.log(siblings);
            /*
            if (siblings > 1){
                return(
                    <div>
                        <p>Discount exists! the student has {siblings} siblings</p>
                    </div>
                )
            }else{
                return(
                    <div>
                        <p>No discount the student has no siblings</p>
                    </div>
                )    
            }*/
		}catch(err){
			console.log(err);
		}
	}
    
    //handleClick(id_student);

	return(
		<div>
			<h1>Details of the student: {id_student}</h1>
				<div className="Rooms">
				    <table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Surname</th>
								<th>Gender</th>
								<th>Age</th>
								<th>Discount?</th>
							</tr>
						</thead>
						<tbody>
							{student.map(stud=>(
								<tr key={stud.id}>
									<td>{stud.id_student}</td>
									<td>{stud.Name}</td>
									<td>{stud.Surname}</td>
									<td>{stud.Gender}</td>
									<td>{stud.Age}</td>
									<td><button onClick={()=>handleClick(stud.id_student)}>Ask</button></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
		</div>
	);
}

export default Student_details;