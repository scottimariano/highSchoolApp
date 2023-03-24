import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router'
import Styles from "../../styles/StudentCard.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function StudentCard({student, editMode, handleDismiss}) {
	const { user, error, isLoading } = useUser();
	
	// async function handleDismiss(id){
	//   let bodyContent = {roomId: null}
	//   const res = await fetch(`${API_URL}/students/${id}`,{
	//     method : 'PUT',
	//     body: JSON.stringify(bodyContent),
	//     headers: {
	//       'Content-Type': 'application/json',
	//     }
	//   })
	//   Router.reload(window.location.pathname)
	// }

	return (
		<Link href={`/students/${student.id}`}>
			<div className={Styles.container}>
				<div>
					<p className={Styles.title}>Name: <strong>{student.lastName}</strong> {student.name} </p>
					<div className={Styles.data}>
						<p className={Styles.teacher}>Age: {student.age}</p>
						<p className={Styles.teacher}>Gender: {student.gender}</p>
					</div>
				</div>
				<img
					src={student.profileImageUrl ? student.profileImageUrl : "https://placehold.co/20x20"}
					alt={student.name + " " + student.lastName + "profile picture"} 
					className={utilStyles.thumbnail}>
				</img>
				{user && editMode ? 
					<button onClick={()=>handleDismiss(student.id)}>
					Dismiss <FontAwesomeIcon style={{fontSize:"25px"}} icon={faArrowRightFromBracket}></FontAwesomeIcon> 
					</button>
					: <></>}	
			</div>
		</Link>
	);
};