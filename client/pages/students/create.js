import CreateStudent from "../../components/student/createStudent/CreateStudent";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CreateStudentPage(data){
    
    return <CreateStudent formattedStudents={data.formattedStudents} formattedRooms={data.formattedRooms}/>

}

export async function getServerSideProps(context) {

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
    console.log(formattedStudents)
    return { props: { formattedStudents, formattedRooms} }
    
}