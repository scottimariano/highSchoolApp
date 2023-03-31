import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../styles/NavBar.module.css';
import { useRouter } from 'next/router';

export default function Layout({children}) {
    const { user } = useUser();
    const router = useRouter();

    return (
        <>
            <div className={styles.navbarContainer}>
                <nav className={styles.container}>
                    <Link  href={`/`} className={styles.logo}>
                        <img 
                            src='https://res.cloudinary.com/dmwfysfrn/image/upload/c_thumb,w_200,g_face/v1680263256/ratherLab/assets/o3mmvcfw8u7jdd76rloo.png'/>
                        <div>
                            <h1>Riverside High School</h1>
                            <p>The Pursuit of Excellence</p>
                        </div>
                    </Link>
                    <div className={styles.navSection}>
                        <div className={styles.navItems}>
                            {router.pathname != '/students' ? <Link  className={styles.navItemsLink} href={`/students/`}>Students</Link> : <></>}
                            {router.pathname != '/' ? <Link  className={styles.navItemsLink} href={`/`}>Rooms</Link> : <></>}
                            {user ? <Link className={styles.navItemsLink} href="/admin">Admin Section</Link> : <></>}
                        </div>
                            {!user ? 
                                <div className={styles.userInfo}>
                                    <a href="/api/auth/login">Login</a>
                                </div> :
                                <div >
                                    <div className={styles.userInfo}>
                                        <img src={user.picture} alt={user.name}></img>
                                        <a href="/api/auth/logout">Logout</a>
                                    </div>
                                </div>
                            }
                    </div>
                </nav>
            </div>
            <div className={styles.navBarTopSpacing}></div>
            {children}
        </>
    );
};