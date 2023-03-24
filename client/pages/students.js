import StudentsList from '../components/student/StudentsList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StudentsPage(list){

	return <StudentsList list={list}/>
};

export async function getServerSideProps(context) {
    
    const res = await fetch(`${API_URL}/students`)
    const data = await res.json()

    return { props: { data } }

}
