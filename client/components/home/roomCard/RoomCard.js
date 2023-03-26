import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/home/roomCard/RoomCard.module.css"

export default function RoomCard({room}) {

    let attendees = room.attendees > 1 ? "attendees" : "attendee" 

    return (
        <Link  href={`/rooms/${room.id}`}>
            <div className={styles.container}>
                    <p className={styles.title}>Name: <strong>{room.name}</strong></p>
                    <div className={styles.data}>
                        <p className={styles.teacher}>Teacher: {room.teacher}</p>
                        <div className={styles.attendees}>
                            <FontAwesomeIcon style={{fontSize:"25px", color:"#21248b"}} icon={faPeopleGroup}></FontAwesomeIcon>
                            <p>{room.attendees} {attendees}</p>
                        </div>
                    </div>
            </div>
        </Link>
    );
};
