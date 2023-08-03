import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rooms = () => {
	const [rooms,setRooms] = useState([]);

	useEffect(()=>{
		const fetchAllRooms = async () => {
			try{
				const res = await axios.get("http://localhost:8800/rooms");
				setRooms(res.data);
			}catch (err){
				console.log(err)
			}
		}
		fetchAllRooms();
	},[]);

	const handleDelete = async (id) =>{
		try{
			await axios.delete("http://localhost:8800/rooms/"+id);
			window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

    return(
		<div>
			<h1>Rooms</h1>
			<div className="Rooms">
			<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Subjet</th>
							<th>Credits</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{rooms.map(room=>(
							<tr key={room.id}>
								<td>{room.id}</td>
								<td>{room.subjet}</td>
								<td>{room.credits}</td>
								<td>
									<button><Link to={`/See_students/${room.id}`}>See Students</Link></button>
									<button><Link to={`/Edit_room/${room.id}`}>Edit</Link></button>
									<button onClick={()=>handleDelete(room.id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
    );
}

export default Rooms; 

/*
<div className="room" key={room.id}>
							<h2>{room.subjet}</h2>
							<p>{room.credits}</p>
							<button>See Students</button>
							<button>Modify room information</button>
							<button>Delete Room</button>
						</div>
*/ 