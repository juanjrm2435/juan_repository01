//import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Rooms from "./components/Rooms";
import Add_rooms from "./components/Add_rooms";
import Home from "./components/Home";
import "./styles.css";
import Edit_room from "./components/Edit_room";
import Login from "./components/Login";
import See_students from "./components/See_students";
import Add_student from "./components/Add_student";
import Student_details from "./components/Student_details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Rooms" element={<Rooms/>}/>
          <Route path="/Add_rooms" element={<Add_rooms/>}/>
          <Route path="/Edit_room/:id" element={<Edit_room/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/See_Students/:id" element={<See_students/>}/>
          <Route path="/Add_Student/:id" element={<Add_student/>}/>
          <Route path="/Student_details/:id" element={<Student_details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
