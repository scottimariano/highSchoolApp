import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import {reactSelectStyles} from '../../../styles/react-select/reactSelectStyles'
import { CldUploadButton } from 'next-cloudinary';
import Select from 'react-select'
import Styles from "../../../styles/student/createStudent/CreateStudent.module.css"
import CreateButtons from "../../user/CreateButtons";
import { validateInput } from '../../../utils/newStudentValidator';

const API_URL = process.env.NEXT_PUBLIC_API_URL
const NO_PROFILE_PICTURE = "/assets/defaultAvatar.png"

export default function CreateStudent(data) {
    const formRef = useRef(null);
    const { push } = useRouter();
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        age: "",
        gender: "",
        profileImageUrl: NO_PROFILE_PICTURE,
        siblings: [],
		siblingsSelected:[],
        room: ""
    })
    const [ errors, setErrors ] = useState({hasErrors: true})

    function handleChangeForm(e) {
        setErrors(
            validateInput({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	function handleReset(){
		setInput({
			name: "",
			lastName: "",
			age: "",
			gender: "",
			profileImageUrl: "",
			siblings: [],
			room: ""
		})
        setErrors({
            hasErrors: true
        })
	}

    async function handleCreate(){
        let siblingsFormatted = input.siblings.map(sibling=>sibling.value)
        let roomId = input.room ? input.room.value : null
        let dataFormatted = {
            ...input,
            roomId: roomId,
            siblingsIds: siblingsFormatted
        }

        const endpoint = API_URL + '/students'
        const JSONdata = JSON.stringify(dataFormatted)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 201 ? alert("Student created successfully") : alert("We had a problem creating the student, please try again")
			return response.json();
        })
        .then(data => {
            data.id ? push(`/students/${data.id}`) : push(`/students`)
        })
    }

    function handleOnUpload(result, widget) {

		setInput({
			...input,
			profileImageUrl: result.info.secure_url
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
            <h2>CREATE NEW STUDENT</h2>
            <form className={Styles.data} ref={formRef} onSubmit={(e)=>handleSubmit(e)} method="post">
                <div className={Styles.dataInputs}>
                    <div className={Styles.selectContainer}>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleChangeForm}
                            onBlur={handleChangeForm}
                            required
                            />
                            <span className={Styles.errors}>{errors.name ? errors.name : ""}</span>
                        </div>
                    </div>
                    <div className={Styles.selectContainer}>
                        <div>
                            <label htmlFor="teacher">Last Name: </label>
                            <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={input.lastName}
                            onChange={handleChangeForm}
                            onBlur={handleChangeForm}
                            required
                            />
                            <span className={Styles.errors}>{errors.lastName ? errors.lastName : ""}</span>
                        </div>
                    </div>
                    <div className={Styles.selectContainer}>
                        <div>
                            <label htmlFor="age">Age: </label>
                                <input
                                className={Styles.ageInput}
                                type="number"
                                id="age"
                                name="age"
                                value={input.age}
                                min="1"
                                onChange={handleChangeForm}
                                onBlur={handleChangeForm}
                                required
                                />
                            <span className={Styles.errors}>{errors.age ? errors.age : ""}</span>
                        </div>
                        <div className={Styles.genderInput}>
                            <label htmlFor="gender">Gender: </label>
                            <select
                                id="gender"
                                name="gender"
                                value={input.gender}
                                onChange={handleChangeForm}
                                onBlur={handleChangeForm}
                                required
                                >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <span className={Styles.errors}>{errors.gender ? errors.gender : ""}</span>
                            </div>
                    </div>
                    <div className={`${Styles.selectContainer} ${Styles.reactSelectContainer}`}>
                        <label htmlFor="siblings">Siblings: </label>
                        <Select
                            options={data.formattedStudents}
                            instanceId = "siblingSelect"
                            isMulti
                            isClearable
                            styles={reactSelectStyles}
                            value={input.siblings}
                            onChange={handleSiblingSelection}
                            placeholder="Choose a student to asociate"
                        />
                    </div>
                    <div className={Styles.selectContainer}>
                        <label htmlFor="Room">Room: </label>
                        <Select
                            options={data.formattedRooms}
                            instanceId = "siblingSelect"
                            isClearable
                            styles={reactSelectStyles}
                            value={input.room}
                            onChange={handleRoomSelection}
                            placeholder= "Choose a room to asociate"
                        />
                    </div>
                </div>
                <div className={Styles.profilePicContainer}>
                    <img width={150} height={150} alt="Profile Picture" src={input.profileImageUrl} />
					<div className={Styles.picActionButtons}>
						<CldUploadButton className={Styles.picButton} uploadPreset="bvkbj8ac" onUpload={handleOnUpload} >
							Update Picture
						</CldUploadButton>
					</div>
                </div>
                </form>

				<CreateButtons handleCreate={handleCreate} handleReset={handleReset} hasErrors={errors.hasErrors}/>
        </div>
  );
};