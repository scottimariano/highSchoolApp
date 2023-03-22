import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function StudentCard({student}) {
  const { user, error, isLoading } = useUser();
  
  async function handleDismiss(id){
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
    <div>
		<Link href={`/students/${student.id}`}>
			<h2>{student.name + " " + student.lastName} </h2>
			<img
				src={student.profileImageUrl ? student.profileImageUrl : "https://placehold.co/20x20"}
				alt={student.name + " " + student.lastName + "profile picture"} 
				className={utilStyles.thumbnail}>
			</img>
      	</Link>
      	{user ? 
			<button onClick={()=>handleDismiss(student.id)}>
			Dismiss <FontAwesomeIcon style={{fontSize:"25px"}} icon={faArrowRightFromBracket}></FontAwesomeIcon> 
			</button>
      	: <></>}
        
    </div>
  );
};