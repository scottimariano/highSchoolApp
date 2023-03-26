import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import Select from 'react-select'
import { CldUploadButton } from 'next-cloudinary';
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateStudent() {
	const [input, setInput] = useState({
		name: '',
		lastName: '',
		age: '',
		gender: '',
		roomId: '',
		siblingsIds: [],
		profileImageUrl: '',
	});
	const [errors, setErrors] = useState({ clear: true });
	const [students, setStudents] = useState([])
	const [siblings, setSiblings] = useState([])
	const [rooms, setRooms] = useState([])
	const [room, setRoom] = useState([])
	const [profilePic, updateProfilePic] = useState();

	const getStudents = async ()=>{
		const res = await fetch(`${API_URL}/students`);
		const data = await res.json();
		const formattedStudents = data.map(student => ({
			value: student.id,
			label: `${student.name} ${student.lastName}`
		  }));
		setStudents(formattedStudents);
	}

	const getRooms = async ()=>{
		const res = await fetch(`${API_URL}/rooms`);
		const data = await res.json();
		const formattedRoom = data.map(room => ({
			value: room.id,
			label: `${room.name} ${room.teacher}`
		  }));
		  setRooms(formattedRoom);
	}

	useEffect(() => {
		getStudents();
		getRooms();
	}, []);

	useEffect(() => {
		console.log("profilePic");
		console.log(profilePic);
		console.log(input);
	}, [input]);
	

	function handleSiblingSelection(siblings){
		setSiblings(siblings)
		setInput({
			...input,
			siblingsIds: siblings.map(option => option.value)
		})
	}

	function handleRoomSelection(room){
		setRoom(room)
		if(room){
			setInput({
				...input,
				roomId: room.value
			})
		} else {
			setInput({
				...input,
				roomId: ''
			})
		}
	}

	function formValidation(input) {
		let errors = { clear: false };
		// if (!input.name) {
		// 	errors.name = 'required field';
		// 	errors.clear = true;
		// } else {
		// 	if (!/^[a-zA-Z ]+$/g.test(input.name)) {
		// 		errors.name = `Can't contains numbers`;
		// 		errors.clear = true;
		// 	}
		// }
        
		// if (!input.lastName) {
		// 	errors.lastName = 'required field';
		// 	errors.clear = true;
		// }else {
		// 	if (!/^[a-zA-Z ]+$/g.test(input.lastName)) {
		// 		errors.lastName = `Can't contains numbers`;
		// 		errors.clear = true;
		// 	}
		// }

		return errors;
	}

	function handleChangeForm(e) {
		setErrors(
			formValidation({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	function handleOnUpload(result, widget) {

		updateProfilePic(result.info);
		setInput({
			...input,
			profileImageUrl: result.info.secure_url
		})

	}

	function handleSubmit(e) {
		e.preventDefault();
		let data = input;
		setSiblings([]);
        const JSONdata = JSON.stringify(data)
        const endpoint = API_URL + '/students'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 201 ? alert("Student Created successfully") : alert("We had a probleasdam creating the student, please try again")
        })
       
		setInput({
			name: '',
			lastName: '',
			age: '',
			gender: '',
			roomId: '',
			siblingsIds: [],
			profileImageUrl: [],
		});
        setErrors({ clear: true });
        updateProfilePic();
	}

	return (
		<div>
			<div >
                <h2>Create new room: </h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Name: </label>
						<input
							name="name"
							value={input.name}
							required
							onChange={handleChangeForm}
							onBlur={handleChangeForm}></input>
						{!errors.name ? (<p></p>) : (<p>{errors.name}</p>)}
						<label>Last Name: </label>
						<input
							name="lastName"
							value={input.lastName}
							required
							onChange={handleChangeForm}
							onBlur={handleChangeForm}></input>
						{!errors.lastName ? (<p></p>) : (<p>{errors.lastName}</p>)}
						<label>Age: </label>
						<input
							name="age"
							type="number"
							value={input.age}
							required
							onChange={handleChangeForm}
							onBlur={handleChangeForm}></input>
						{!errors.age ? (<p></p>) : (<p>{errors.age}</p>)}
						<div>
							<label >
								Siblings
							</label>
							<Select
							options={students}
							instanceId = "siblingSelect"
							isMulti
							isClearable
							value={siblings}
							placeholder="Select if student has siblings"
							onChange={handleSiblingSelection}
							/>
						</div>
						<div>
							<label >
								Room
							</label>
							<Select
							options={rooms}
							instanceId = "roomSelect"
							isClearable
							value={room}
							placeholder="Asign a room"
							onChange={handleRoomSelection}
							/>
						</div>
					</div>
					<CldUploadButton uploadPreset="bvkbj8ac" onUpload={handleOnUpload} />

					{profilePic && (
						<>
						{profilePic.resource_type === 'image' && (
							<p><img width={150} height={150} src={ profilePic.secure_url } alt="Uploaded image" /></p>
						)}
						</>
					)}
					<div>
						<button type="submit" disabled={errors.clear}>
							<h4>Create Room</h4>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};