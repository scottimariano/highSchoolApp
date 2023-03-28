import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import {reactSelectStyles} from '../../../styles/react-select/reactSelectStyles'
import { CldUploadButton } from 'next-cloudinary';
import Select from 'react-select'
import Router from 'next/router'
import ActionButtons from '../../user/ActionButtons';
import Styles from "../../../styles/student/studentDetail/StudentDetail.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL
const NO_PROFILE_PICTURE = "/assets/defaultAvatar.png"

export default function StudentDetail({student}) {
    const { push } = useRouter();
    const [editMode, setEditMode] = useState(false);
    const { user } = useUser();
    const [input, setInput] = useState({
        name: student.data.name,
        lastName: student.data.lastName,
        age: student.data.age,
        gender: student.data.gender,
        profileImageUrl: student.data.profileImageUrl,
        siblings: student.data.siblings,
        room: student.data.room,
        roomId: student.data.roomId
    })
    const students = student.formattedStudents.filter(s=>s.value != student.data.id)
    
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    console.log(input)

    useEffect(()=>{
        setInput({
            name: student.data.name,
            lastName: student.data.lastName,
            age: student.data.age,
            gender: student.data.gender,
            profileImageUrl: student.data.profileImageUrl,
            siblings: student.data.siblings,
            room: student.data.room
        })
    },[editMode])

    function handleDelete(studentId){
        let confirmDelete = confirm(`You are going to delete ${student.data.name}, Are you sure`)
        if (confirmDelete){
            const endpoint = API_URL + '/students/' + studentId
            const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 200 ? alert("Student Deleted successfully") : alert("We had a problem deleteing the student, please try again")
        })
        push(`/students`);
        }
    }

    function handleChangeForm(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

    async function handleEdit(studentId){
        let siblingsFormatted = input.siblings.map(sibling=>sibling.value)
        let roomId = input.room ? input.room[0].value : null
        let dataFormatted = {
            ...input,
            roomId: roomId,
            siblingsIds: siblingsFormatted
        }
        
        const endpoint = API_URL + '/students/' + studentId
        const JSONdata = JSON.stringify(dataFormatted)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }
        console.log(dataFormatted)
        fetch(endpoint, options)
        .then(response => {
            response.status == 200 ? alert("Student Updated successfully") : alert("We had a problem updating the student, please try again")
        })
        .then(response => {
            Router.reload(window.location.pathname)
        })
    }

    function handleOnUpload(result, widget) {

		setInput({
			...input,
			profileImageUrl: result.info.secure_url
		})

	}

    function handleNoPic(e) {
        e.preventDefault()
		setInput({
			...input,
			profileImageUrl: NO_PROFILE_PICTURE
		})

	}

    function handleSiblingSelection(siblingsSelection){
		setInput({
            ...input,
            siblings: siblingsSelection})
	}

    function handleRoomSelection(roomSelection){
		setInput({
            ...input,
            room: roomSelection})
	}

    return (
        <div className={Styles.container}>
            <h2>STUDENT DETAILS</h2>
            <form className={Styles.data}>
                <div className={Styles.dataInputs}>
                    <div className={Styles.selectContainer}>
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
                    <div className={Styles.selectContainer}>
                        <label htmlFor="teacher">Last Name: </label>
                        <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={input.lastName}
                        disabled={!editMode}
                        onChange={handleChangeForm}
                        onBlur={handleChangeForm}
                        />
                    </div>
                    <div className={Styles.selectContainer}>
                        <label htmlFor="age">Age: </label>
                        <input
                        className={Styles.ageInput}
                        type="number"
                        id="age"
                        name="age"
                        value={input.age}
                        min="1"
                        disabled={!editMode}
                        onChange={handleChangeForm}
                        onBlur={handleChangeForm}
                        />
                        <label htmlFor="gender">Gender: </label>
                        <select
                            id="gender"
                            name="gender"
                            value={input.gender}
                            disabled={!editMode}
                            onChange={handleChangeForm}
                            onBlur={handleChangeForm}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className={Styles.selectContainer}>
                        <label htmlFor="siblings">Siblings: </label>
                        <Select
                            options={students}
                            instanceId = "siblingSelect"
                            isMulti
                            isClearable
                            styles={reactSelectStyles}
                            value={input.siblings}
                            onChange={handleSiblingSelection}
                            placeholder= {student.data.siblings.length == 0 ?
                                "No relatives asociated":
                                "Choose a student to asociate"}
                            isDisabled={!editMode}
                        />
                    </div>
                    <div className={Styles.selectContainer}>
                        <label htmlFor="Room">Room: </label>
                        {!student.data.roomId == "" ? <p>No room associated</p> :
                        <Select
                            options={student.formattedRooms}
                            instanceId = "siblingSelect"
                            isClearable
                            styles={reactSelectStyles}
                            value={input.room}
                            onChange={handleRoomSelection}
                            placeholder= {student.data.room.length == 0 ?
                                "No room asociated":
                                "Choose a room to asociate"}
                            isDisabled={!editMode}
                        />}
                    </div>
                </div>
                <div className={Styles.profilePicContainer}>
                    <img width={150} height={150} alt="Profile Picture" src={input.profileImageUrl}></img>
                    {editMode ? 
                        <div className={Styles.picActionButtons}>
                            <CldUploadButton className={Styles.picButton} uploadPreset="bvkbj8ac" onUpload={handleOnUpload} >
                                Update Picture
                            </CldUploadButton>
                            <button className={Styles.picButton} onClick={handleNoPic}> Default Picture</button>
                        </div>
                    : 
                        <></>
                    }
                </div>
                </form>

            {user && 
                <ActionButtons editMode={editMode}
                    onToggleEditMode={toggleEditMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    id={student.data.id}
                />
            }
        </div>
  );
};