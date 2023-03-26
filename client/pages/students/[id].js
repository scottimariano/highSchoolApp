import StudentDetail from "../../components/student/StudentDetail";
import React from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RoomPage(student){

    return (
        <StudentDetail student={student}/>
    )

}

export async function getServerSideProps(context) {

    const { id } = context.params;
    const res = await fetch(`${API_URL}/students/${id}`)
    let data = await res.json()

    const siblingsFormatted = data.siblings.map(sibling=>(
        {
            value: sibling.id,
            label: `${sibling.name} ${sibling.lastName}`
        }
    ))
    data.siblings = siblingsFormatted
    
    
    
    const stundentsRes = await fetch(`${API_URL}/students`);
    const students = await stundentsRes.json();
    const formattedStudents = await students.map(student => ({
        value: student.id,
        label: `${student.name} ${student.lastName}`
    }));
    
    const roomsRes = await fetch(`${API_URL}/rooms`);
    const rooms = await roomsRes.json();
    const formattedRooms = await rooms.map(room => ({
        value: room.id,
        label: `${room.name} (${room.teacher})`
    }));

    const room = data.Room ? formattedRooms.filter(room => room.value === data.Room.id) : [];
    data.room = room
    
    return { props: { data, formattedStudents, formattedRooms} }
    
}