import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Styles from "../../../styles/room/createRoom/CreateRoom.module.css"
import CreateButtons from "../../user/CreateButtons";
import { validateInput } from '../../../utils/newRoomValidator';
import Router from 'next/router'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateRoom() {

    const [input, setInput] = useState({
        name: '',
        teacher: ''
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
			name: '',
			teacher: ''
		})
        setErrors({
            hasErrors: true
        })
	}

    function handleBlur(e){
        handleChangeForm(e)
    }

    async function handleCreate(){
        
        const endpoint = API_URL + '/rooms'
        let data = input;
        const JSONdata = JSON.stringify(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }
        fetch(endpoint, options)
        .then(response => {
            response.status == 201 ? alert("Room Created successfully") : alert("We had a problem creating the room, please try again")
        })
        handleReset();
        Router.push(`/`)
    }

    return (
        <div className={Styles.container}>
            <h2>CREATE NEW ROOM</h2>
            <form className={Styles.data}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={handleChangeForm}
				    onBlur={handleBlur}
                    />
                    <span className={Styles.errors}>{errors.name ? errors.name : ""}</span>

                </div>
                <div>
                    <label htmlFor="teacher">Teacher: </label>
                    <input
                    type="text"
                    id="teacher"
                    name="teacher"
                    value={input.teacher}
                    onChange={handleChangeForm}
					onBlur={handleBlur}
                    />
                    <span className={Styles.errors}>{errors.teacher ? errors.teacher : ""}</span>
                </div>

            </form>
			<CreateButtons handleCreate={handleCreate} handleReset={handleReset} hasErrors={errors.hasErrors}/>
      </div>
  );
};
