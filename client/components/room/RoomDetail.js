import Link from 'next/link';

import StudentCard from "../student/StudentCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Router from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RoomDetail({room}) {
    const { push } = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({
        name: room.data.name,
        teacher: room.data.teacher
    })
    const [students, setStudents] = useState(room.data.Students)
    const [dismissed, setDismissed] = useState([])

    const toggleEditMode = () => {
      setEditMode(!editMode);
    };

    useEffect(()=>{
        setInput({
            name: room.data.name,
            teacher: room.data.teacher
        })
        setStudents(room.data.Students)
    },[editMode])

    useEffect(()=>{
        setStudents(students.filter(student => !dismissed.includes(student.id)))
    },[dismissed])

    function handleDelete(roomId){
        let confirmDelete = confirm(`You are going to delete ${room.data.name} room, Are you sure`)
        if (confirmDelete){
            const endpoint = API_URL + '/rooms/' + roomId
            const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 200 ? alert("Room Deleted successfully") : alert("We had a probleasdam deleteing the room, please try again")
        })
        push(`/`);
        }
    }

    function handleChangeForm(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

    async function studentDismissRequest(studentId){
        let bodyContent = {roomId: null}
        fetch(`${API_URL}/students/${studentId}`,{
            method : 'PUT',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    async function handleEdit(roomId){
        
        dismissed.forEach(studentId => {
            studentDismissRequest(studentId)
        });

        const endpoint = API_URL + '/rooms/' + roomId
        let data = input;
        const JSONdata = JSON.stringify(data)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 200 ? alert("Room Updated successfully") : alert("We had a probleasdam updating the room, please try again")
        })
        push(`/rooms/${roomId}`);
    }

    async function handleDismiss(id){
        setDismissed([...dismissed, id])
    }

    return (
        <div>
            <Link href="/">VER TODOS</Link>
            <h2>ROOM DETAIL</h2>
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    disabled={!editMode}
                    onChange={handleChangeForm}
				    onBlur={handleChangeForm}
                    />
                </div>
                <div>
                    <label htmlFor="teacher">Teacher: </label>
                    <input
                    type="text"
                    id="teacher"
                    name="teacher"
                    value={input.teacher}
                    disabled={!editMode}
                    onChange={handleChangeForm}
					onBlur={handleChangeForm}
                    />
                </div>
                <div>
                    <label htmlFor="attendees">Attendees: </label>
                    <input
                    type="number"
                    id="attendees"
                    name="attendees"
                    value={room.data.attendees}
                    disabled={true}
                    
                    />
                </div>
            </form>
            <ul>
                {students ? students.map(student => {
                    return <StudentCard key={student.id} student={student} editMode={editMode} handleDismiss={handleDismiss}/>
                }): <></>}
            </ul>

            {editMode ? (
                <>
                    <button onClick={toggleEditMode}>CANCELAR CAMBIOS</button>
                    <button onClick={() => handleEdit(room.data.id)}>GUARDAR</button>
                </>
                ) : (
                <>
                    <button onClick={toggleEditMode}>EDITAR</button>
                    <button onClick={() => handleDelete(room.data.id)}>ELIMINAR</button>
                </>
            )}
      </div>
  );
};
