import StudentRoomCard from "../student/StudentRoomCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ActionButtons from "../user/ActionButtons";
import Styles from "../../styles/CreateRoom.module.css"
import CreateButtons from "../user/CreateButtons";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateRoom() {
	/// AGREGAR VALIDACION DE RUTA!!!

    const { push } = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({
        name: '',
        teacher: ''
    })
  
    const { user } = useUser();

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
