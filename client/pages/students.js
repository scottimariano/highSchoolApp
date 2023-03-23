import Head from 'next/head';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //
import StudentCard from '../components/student/StudentCard';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Students = () => {
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredstudents] = useState([]);

	const getStudents = async ()=>{
		const res = await fetch(`${API_URL}/students`);
		const data = await res.json();
		setStudents(data);
	}

	useEffect(() => {
		getStudents();
	}, []);
	
	useEffect(() => {
		setFilteredstudents(students)
	}, [students]);


	function handleSearh(e){
		let searchTerm = e.target.value.toLowerCase()
		setFilteredstudents(students.filter(student => {
			let name = student.name.toLowerCase();
			let lastName = student.lastName.toLowerCase();
			return (name.includes(searchTerm) || lastName.includes(searchTerm))
		}))
	}

	function handleClearSearch(){
		setFilteredstudents(students)
	}

	return (
		<div>
			<Head>
				<title>RatherLab Dev School</title>
			</Head>
			<div>
				<FontAwesomeIcon style={{fontSize:"25px"}} icon={faSearch}></FontAwesomeIcon>
				<input type="text" placeholder='Search Student by name or last name' onChange={handleSearh}/>
				<button onClick={()=>handleClearSearch()}>
					CLEAR
				</button>
			</div>
			<ul>
				{filteredStudents.map((student) => (
					<li key={student.id}>
						<StudentCard student={student} />
					</li>
				))}
			</ul>
		</div>
		);
};

export default Students;