import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import RoomCard from "../components/room/RoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import StudentCard from '../components/student/StudentCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Students = () => {
	const [students, setStudents] = useState([]);
	const [input, setInput] = useState([]);
	const [filteredStudents, setFilteredstudents] = useState([]);
	const { user, error, isLoading } = useUser();

	const getStudents = async ()=>{
		console.log(API_URL)
		const res = await fetch(`${API_URL}/students`);
		const data = await res.json();
		console.log(data)
		setStudents(data);
	}

	useEffect(() => {
		getStudents();
	}, []);
	
	useEffect(() => {
		setFilteredstudents(students)
	}, [students]);


	function handleSearh(input){
		setFilteredstudents(student.filter(student => student.name.includes(input) || student.lastName.includes(input)))
		setInput('');
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
				<input type="text" placeholder='Search Student by name or last name' value={input} onChange={(e) => setInput(e.target.value)}/>
				<button onClick={()=>handleSearh(input)}>
					<FontAwesomeIcon style={{fontSize:"25px"}} icon={faSearch}></FontAwesomeIcon>
				</button>
				<button onClick={()=>handleClearSearch()}>
					CLEAR
				</button>
			</div>
			<div>
                <Link href={`/rooms/create`}> CREATE ROOM </Link>
                <Link href={`/students/create`}> CREATE STUDENT </Link>
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