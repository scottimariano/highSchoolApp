import Link from 'next/link';

import StudentCard from "../student/StudentCard";

export default function RoomDetail({room}) {

    return (
        <div>
            <Link href="/">VER TODOS</Link>
            <h2>ROOM DETAIL</h2>
            <p>NAME: {room.data.name}</p>
            <p>ROOM TEACHER: {room.data.teacher}</p>
            <div>
                <span>{room.data.attendees} student/s</span>
            </div>
            <ul>
                {room.data.Students.map(student => {
                    return <StudentCard key={student.id} student={student}/>
                })}
            </ul>
      </div>
  );
};
