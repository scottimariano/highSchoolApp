import StudentDetail from "../../components/student/StudentDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RoomPage(student){

    return <StudentDetail student={student}/>

}

export async function getServerSideProps(context) {

    const { id } = context.params;
    const res = await fetch(`${API_URL}/students/${id}`)
    const data = await res.json()
  
    return { props: { data } }

}