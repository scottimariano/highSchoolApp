import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useState } from 'react';
import Styles from "../../../styles/room/createRoom/CreateRoom.module.css"
import CreateButtons from "../../user/CreateButtons";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateRoom() {

    const { push } = useRouter();
    const [input, setInput] = useState({
        name: '',
        teacher: ''
    })
    function handleChangeForm(e) {
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
        push('/')
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
                    onChange={handleChangeForm}
					onBlur={handleChangeForm}
                    />
                </div>

            </form>
			<CreateButtons handleCreate={handleCreate} handleReset={handleReset}/>
      </div>
  );
};
