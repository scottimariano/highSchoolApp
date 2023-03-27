import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"; //
import Styles from "../../styles/admin/Admin.module.css"
import moment from 'moment';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Admin() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const momentDate = moment(user.updated_at);
    const lastLogin = momentDate.format("DD/MM/YY hh:mm A");

    return (
        user &&
            <div className={Styles.container}>
            <h2>ADMIN PAGE</h2>
            <div className={Styles.data}>
            <div className={Styles.userData}>
            <img src={user.picture}/>
            <span>{user.name}</span>
            <span>Last login: {lastLogin}</span>
                </div>
                <div className={Styles.actionCards}>
                <Link href="/rooms/create">
                <div className={Styles.card}>
                <FontAwesomeIcon style={{fontSize:"100px"}} icon={faChalkboardUser}></FontAwesomeIcon>
                <span>ADD NEW ROOM</span>
                </div>
                </Link>
                <Link href="/students/create">
                        <div className={Styles.card}>
                                <FontAwesomeIcon style={{fontSize:"100px"}} icon={faUserPlus}></FontAwesomeIcon>
                                <span>ADD NEW STUDENT</span>
                        </div>
                    </Link>
                </div>
                </div>
                
                </div>
            
    );
};
