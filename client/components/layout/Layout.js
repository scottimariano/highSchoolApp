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
                            src='https://res.cloudinary.com/dmwfysfrn/image/upload/c_thumb,w_200,g_face/v1679344992/ratherLabApp/assets/Screenshot_2022-10-12_112545_1_lmwpzk.webp'/>
                        <div>
                            <h1>RatherLab University</h1>
                            <p>Boost your development</p>
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