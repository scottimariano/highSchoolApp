import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../styles/aside.module.css';
import utilStyles from '../../styles/utils.module.css';

export default function Layout({children}) {
    const { user, error, isLoading } = useUser();

    return (
        <>
            <aside className={styles.container}>
                <Link  href={`/`}>
                <img 
                    src='https://res.cloudinary.com/dmwfysfrn/image/upload/c_thumb,w_200,g_face/v1679344992/ratherLabApp/assets/Screenshot_2022-10-12_112545_1_lmwpzk.webp'
                    className={utilStyles.thumbnail}
                ></img>
                <h1>RatherLab Dev School</h1>
                <p>Cursos de Desarrollo de Software</p>
                </Link>
                <div>
                    {!user ? <a href="/api/auth/login">Login</a> : (
                        <div>
                        <div>
                        <img src={user.picture} alt={user.name} className={utilStyles.borderCircle}></img>
                        <h2>{user.name}</h2>
                        </div>
                        <Link href="/admin">ADMIN SECTION</Link>
                        <a href="/api/auth/logout">Logout</a>
                    </div>
                    ) }
                </div>

            </aside>
            {children}
        </>
    );
};