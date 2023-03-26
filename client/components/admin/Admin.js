import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"; //

export default function Admin() {
    
    return (
        <div>
            <h2>ADMIN PAGE</h2>
            <div>
                <FontAwesomeIcon style={{fontSize:"150px"}} icon={faChalkboardUser}></FontAwesomeIcon>
                <Link href="/rooms/create">ADD NEW ROOM</Link>
            </div>
            <div>
                <FontAwesomeIcon style={{fontSize:"150px"}} icon={faUserPlus}></FontAwesomeIcon>
                <Link href="/students/create">ADD STUDENT</Link>
            </div>

        </div>
  );
};
