import Link from 'next/link';
import ProfileImage from "../../components/student/ProfileImage";

export default function StudentCard({student}) {
  return (
    // <Link href={`/students/${student.id}`}>
      <div>
        <h2>{student.name + " " + student.lastName} </h2>
        <ProfileImage
            src={student.profileImageUrl ? student.profileImageUrl : "https://placehold.co/20x20"}
            alt={student.name + " " + student.lastName + "profile picture"} 
            layout="fill"/>
        </div>
    // </Link>
  );
};