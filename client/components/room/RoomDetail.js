import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from "react";
import StudentCard from "../student/StudentCard";

export default function RoomDetail({room}) {
    //const [room, setRoom] = useState([]);

    return (
        <div>
            <h2>ROOM DETAIL</h2>
            <p>ROOM TEACHER: {room.data.teacher}</p>
            <p>ROOM ID: {room.data.id}</p>
            <div>
                <span>{room.data.attendees} estudiantes</span>
            </div>
            <ul>
                {room.data.Students.map(student => {
                    return <StudentCard key={student.id} student={student}/>
                })}
            </ul>
      </div>
  );
};
