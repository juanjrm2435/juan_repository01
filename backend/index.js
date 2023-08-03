//const express = require('express');
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "24350351",
  database: "test"
})

const PUERTO = 8800; 

app.listen(PUERTO, ()=> {
  console.log(`Escuchando a traves del puerto: ${PUERTO}`);
});

app.get('/', (req,res) => {
  res.json('Mi primer servidor. Rooms - Actualizado 50');
  //res.send('Mi primer servidor. Rooms - Actualizado 12');
})

app.get('/rooms', (req,res) => {
  const q = "SELECT * FROM rooms";
  db.query(q,(err,data) =>{
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.post("/rooms", (req,res)=>{
  const q = "INSERT INTO rooms (`subjet`,`credits`) VALUES (?)"
  const values = [
    req.body.subjet,
    req.body.credits
  ];

  db.query(q,[values],(err,data)=>{
    if (err) return res.json(err);
    return res.json("Room has been succesfully added");
  })
})

app.delete("/rooms/:id", (req,res)=>{
  const courseId = req.params.id;
  const q = "DELETE FROM rooms WHERE id = ?"

  db.query(q,[courseId], (err,data)=>{
    if (err) return res.json(err);
    return res.json("Room has been succesfully deleted");
  })
})

app.put("/rooms/:id", (req,res)=>{
  const courseId = req.params.id;
  const q = "UPDATE rooms SET `subjet`=?, `credits`=? WHERE id = ?";

  const values = [
    req.body.subjet,
    req.body.credits
  ];

  db.query(q,[...values,courseId], (err,data)=>{
    if (err) return res.json(err);
    return res.json("Room has been edited");
  })
})

app.post("/login",(req,res)=>{
  const sql = "SELECT * FROM login WHERE user = ? AND password = ?"
  const values = [
    req.body.user,
    req.body.password
  ]
  db.query(sql, [req.body.user,req.body.password],(err,data)=>{
    if (err) return res.json("Error FATALISIMO");
    if (data.length > 0){
      return res.json("Login Succesfull");
    }
    return res.json("No record");
  })
})

app.get("/see_students/:id",(req,res)=>{
  const courseId = req.params.id;
  const q = "SELECT * FROM relations WHERE id_room_t =?";
  db.query(q,[courseId],(err,data)=>{
    if (err) return res.json(err);
    if (data.length<1){
      return res.json(data);
    }
    var ids =[];
    for (let i=0;i<data.length;i++){ 
      ids.push(data[i].id_student_t);
    }
    const q2 = "SELECT * FROM students WHERE id_student in (?)"
    db.query(q2,[ids],(err,data2)=>{
      if (err) return res.json(err);
      return res.json(data2);
    })
  })
})

app.delete("/see_students/:id_room/:id_student",(req,res)=>{
  const courseId = req.params.id_room;
  const studentId = req.params.id_student;
  const q = "DELETE FROM relations WHERE id_room_t = ? AND id_student_t = ?";

  db.query(q,[courseId,studentId], (err,data)=>{
    if (err) return res.json(err);
    return res.json("Student has been succesfully deleted");
  })
})

app.post("/add_student/:id_room", (req,res)=>{
  const id_room = req.params.id_room;
  const values1 = [
    req.body.Name,
    req.body.Surname,
    req.body.Gender,
    req.body.Age,
  ];

  const q0 = `SELECT * FROM students WHERE Name = "${values1[0]}" AND Surname = "${values1[1]}" AND Gender = "${values1[2]}" AND Age = ${values1[3]}`;
  //const q0 = `SELECT * FROM students WHERE Name = ? AND Surname = ? AND Gender = ? AND Age = ?`;
  //const q0 = "SELECT * FROM students WHERE (`Name`,`Surname`,`Gender`,`Age`) VALUES (?)";
  db.query(q0,(err,data)=>{
    if (err) return res.json(err);
    console.log(data);
    console.log("Before If");
    if (data.length<1){
      console.log("Inside If");
      console.log(data);
      const q1 = "INSERT INTO students (`Name`,`Surname`,`Gender`,`Age`) VALUES (?)";
      db.query(q1,[values1],(err,data)=>{
        if (err) return res.json(err);
        const q2 = "INSERT INTO relations (`id_room_t`,`id_student_t`) VALUES (?)";
        console.log(data);
        const values2 = [
          id_room,
          data.insertId
        ];

        db.query(q2,[values2],(err,data)=>{
          if(err) return res.json(err);
          return res.json("Student added succesfully");
        })
      })
    } else {
      var id_student = data[0].id_student;
      const values2 = [
        id_room,
        id_student,
      ];
      const q2 = "INSERT INTO relations (`id_room_t`,`id_student_t`) VALUES (?)";
      db.query(q2,[values2],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Student already existent added succesfully to the course selected");
      })
    }
  })
})

app.get("/student_details/:id", (req,res)=>{
  const id_student_b = req.params.id;
  const q = `SELECT * FROM students WHERE id_student=${id_student_b}`;
  db.query(q,(err,data)=>{
    if (err) res.json(err);
    return res.json(data);
  })
})

app.get("/student_details/:id/siblings", (req,res)=>{
  const id_student_b = req.params.id;
  const q = `SELECT DISTINCT id_student_t FROM relations`;
  db.query(q,(err,data)=>{
    if (err) res.json(err);
    var idx_students =[];
    for (let i=0;i<data.length;i++){
      idx_students.push(data[i].id_student_t);
    }
    const q1 = `SELECT Surname FROM students WHERE id_student = ${id_student_b} `
    db.query(q1,(err,data1)=>{
      if (err) res.json(err);
      var stud_surname = data1[0].Surname;
      //console.log(data1);
      const q2 = `SELECT Surname, COUNT(Surname) as siblings FROM students WHERE id_student in (?) and surname="${stud_surname}" GROUP BY Surname`;
      db.query(q2,[idx_students],(err,data2)=>{
        if (err) res.json(err);
        return res.json(data2);
      })
    })
    //console.log(idx_students);
    //return res.json("SUCCES");
  })
})
