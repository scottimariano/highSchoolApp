import Link from 'next/link';
import Styles from "../../../../styles/student/studentList/studentCard/StudentCard.module.css"

export default function StudentCard({student}) {

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
					alt={student.name + " " + student.lastName + "profile picture"}>
				</img>
			</div>
		</Link>
	);
};