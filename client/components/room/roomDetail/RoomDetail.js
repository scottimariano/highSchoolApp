import StudentRoomCard from "./studentRoomCard/StudentRoomCard";
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Styles from "../../../styles/room/roomDetail/RoomDetail.module.css"
import ActionButtons from "../../user/ActionButtons";
import Router from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RoomDetail({room}) {
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({
        name: room.data.name,
        teacher: room.data.teacher
    })
    const [students, setStudents] = useState(room.data.Students)
    const [dismissed, setDismissed] = useState([])
    const { user } = useUser();

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
        let confirmDelete = confirm(`You are going to delete ${room.data.name} room, Are you sure?`)
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
            response.status == 200 ? (
                alert("Room Deleted successfully"),
                Router.push('/')
            ) : alert("We had a problem deleteing the room, please try again")
        })

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
        
        for (const studentId of dismissed) {
            await studentDismissRequest(studentId);
        }

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
            response.status == 200 ? alert("Room Updated successfully") : alert("We had a problems updating the room, please try again")
            Router.reload(window.location.pathname)
        })
    }

    async function handleDismiss(e, id){
        e.preventDefault()
        setDismissed([...dismissed, id])
    }

    return (
        <div className={Styles.container}>
            <h2>ROOM DETAILS</h2>
            <form className={Styles.data}>
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
                    <p className={Styles.attendeesText} >Attendees: <strong>{room.data.attendees}</strong></p>
                </div>
                {room.data.attendees == 0 ? <></> :
                    <ul className={Styles.attendees}>
                        {students ? students.map(student => {
                            return <StudentRoomCard key={student.id} student={student} editMode={editMode} handleDismiss={handleDismiss}/>
                        }): <></>}
                    </ul>
                }

            </form>

            {user && 
                <ActionButtons editMode={editMode}
                    onToggleEditMode={toggleEditMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    id={room.data.id}
                />
            }
      </div>
  );
};
