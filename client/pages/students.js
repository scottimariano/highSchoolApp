import StudentsList from '../components/student/studentsList/StudentsList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StudentsPage(list){

	return <StudentsList list={list}/>
};

export async function getServerSideProps(context) {
    
    const res = await fetch(`${API_URL}/students`)
    let data = await res.json()
    await data.sort((a, b) => {
        const nameA = a.lastName.toLowerCase() + a.name.toLowerCase();
        const nameB = b.lastName.toLowerCase() + b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return { props: { data } }

}
