import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Router from 'next/router'
import Styles from "../../../../styles/room/roomDetail/studentRoomCard/StudentRoomCard.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function StudentRoomCard({student, editMode, handleDismiss}) {
	const { user, error, isLoading } = useUser();
	
	async function handleDismissRequest(id){
		handleDismiss();
		let bodyContent = {roomId: null}
		const res = await fetch(`${API_URL}/students/${id}`,{
			method : 'PUT',
			body: JSON.stringify(bodyContent),
			headers: {
				'Content-Type': 'application/json',
			}
		})
	  Router.reload(window.location.pathname)
	}

	return (
		<div className={Styles.container}>
			<Link href={`/students/${student.id}`}>
				<div className={Styles.card}>
					<div>
						<p className={Styles.title}><strong>{student.lastName}</strong><br/>{student.name} </p>
					</div>
					<img
						src={student.profileImageUrl ? student.profileImageUrl : "https://placehold.co/20x20"}
						alt={student.name + " " + student.lastName + "profile picture"}>
					</img>
				</div>
			</Link>
			{user && editMode ? 
				<button className={Styles.dismissButton} onClick={()=>handleDismissRequest(student.id)}>
					<span>Dismiss</span>
				</button>
				: <></>}	
		</div>
	);
};