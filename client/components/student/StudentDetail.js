import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from "react";
import StudentCard from "../student/StudentCard";

export default function StudentDetail({student}) {
    //const [room, setRoom] = useState([]);
    return (
        <div>
            <img width={150} height={150} src={student.data.profileImageUrl}></img>
            <p>NAME: {student.data.name}</p>
            <p>SURNAME: {student.data.lastName}</p>
            <p>GENDER: {student.data.gender}</p>
            <p>AGE: {student.data.age}</p>
            {student.data.Room ? <p>ROOM: <Link href={`/rooms/${student.data.Room.id}`}>{student.data.Room.name}</Link></p>
            :
            <p>No courses associated</p>
            }
            {!student.data.siblings.length > 0 ? <p>No relatives</p> :
            <>
                <p>Hermanos:</p>
                <ul>
                    {student.data.siblings.map( sibling => (
                        <li key={sibling.name}>
                            <Link href={`/students/${sibling.id}`}>{sibling.name}</Link>

                        </li>
                    ))}
                </ul>
            </>
            }
        </div>
    );
};
