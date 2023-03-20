import Link from 'next/link';
import styles from '../../styles/Aside.module.css';
export default function Sidebar({student}) {
  return (
    // <Link href={`/students/${student.id}`}>
        <aside className={styles.container}>
            <h1>RatherLab Dev School</h1>
            <p>Cursos de Desarrollo de Software</p>
            <ul>
                <Link href={`/login`}> LOGIN </Link>
                <Link href={`/createRoom`}> CREATE ROOM </Link>
                <Link href={`/createStudent`}> CREATE STUDENT </Link>
            </ul>
        </aside>
    // </Link>
  );
};