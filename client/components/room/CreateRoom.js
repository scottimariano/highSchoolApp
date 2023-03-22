import React, { useRef, useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateRoom() {
	const [input, setInput] = useState({name: '', teacher: ''});
	const [errors, setErrors] = useState({ clear: true });

	function formValidation(input) {
		let errors = { clear: false };
		if (!input.name) {
			errors.name = 'required field';
			errors.clear = true;
		} else {
			if (!/^[a-zA-Z ]+$/g.test(input.name)) {
				errors.name = `Can't contains numbers`;
				errors.clear = true;
			}
		}
        
		if (!input.teacher) {
			errors.teacher = 'required field';
			errors.clear = true;
		}else {
			if (!/^[a-zA-Z ]+$/g.test(input.teacher)) {
				errors.teacher = `Can't contains numbers`;
				errors.clear = true;
			}
		}

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

	function handleSubmit(e) {
		e.preventDefault();
		let data = input;
        const JSONdata = JSON.stringify(data)
        const endpoint = API_URL + '/rooms'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        fetch(endpoint, options)
        .then(response => {
            response.status == 201 ? alert("Room Created successfully") : alert("We had a probleasdam creating the rooms, please try again")
        })
       
		setInput({
			name: '',
			teacher: '',
		});
        setErrors({ clear: true })
	}

	return (
		<div>
			<div >
                <h2>Create new room: </h2>
				<form onSubmit={handleSubmit}>
					<div >
						<div>
                            <label>Room Name: </label>
							<input
								name="name"
								value={input.name}
								required
								onChange={handleChangeForm}
								onBlur={handleChangeForm}></input>
							{!errors.name ? (
								<p></p>
							) : (
								<p>
									{errors.name}
								</p>
							)}
                            <label>Teacher Name: </label>
							<input
								name="teacher"
								value={input.teacher}
								required
								onChange={handleChangeForm}
								onBlur={handleChangeForm}></input>
							{!errors.teacher ? (
								<p></p>
							) : (
								<p>
									{errors.teacher}
								</p>
							)}
						</div>
					</div>
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