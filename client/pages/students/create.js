import CreateStudent from "../../components/student/createStudent/CreateStudent";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateStudentPage(data){
    
    return <CreateStudent formattedStudents={data.formattedStudents} formattedRooms={data.formattedRooms}/>

}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps (context){
        const stundentsRes = await fetch(`${API_URL}/students`);
        const students = await stundentsRes.json();
        const formattedStudents = await students.map(student => ({
            value: student.id,
            label: `${student.name} ${student.lastName}`
        }));
        
        const roomsRes = await fetch(`${API_URL}/rooms`);
        const rooms = await roomsRes.json();
        const formattedRooms = await rooms.map(room => ({
            value: room.id,
            label: `${room.name} (${room.teacher})`
        }));
        return { props: { formattedStudents, formattedRooms} }
    }
})