import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons"; //
import styles from '../../styles/RoomCard.module.css';



export default function RoomCard({room}) {
    return (
        <div className={styles.container}>
            <Link  href={`/rooms/${room.id}`}>
                <h2>Name: {room.name}</h2>
                <p>Techer: {room.teacher}</p>
                <div>
                <p>{room.attendees}</p>
                <span> attendees</span>
                <FontAwesomeIcon style={{fontSize:"25px"}} icon={faPeopleGroup}></FontAwesomeIcon>
                </div>
            </Link>
        </div>
    );
};
