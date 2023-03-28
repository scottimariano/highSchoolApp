import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Styles from "../../../../styles/room/roomDetail/studentRoomCard/StudentRoomCard.module.css"

export default function StudentRoomCard({student, editMode, handleDismiss}) {
	const { user } = useUser();
	
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
				<button className={Styles.dismissButton} onClick={(e)=>handleDismiss(e, student.id)}>
					Dismiss
				</button>
				: <></>}	
		</div>
	);
};