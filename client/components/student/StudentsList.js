import Head from 'next/head';
import StudentCard from "../student/StudentCard"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/Home.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StudentsList ({list}) {
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredstudents] = useState([]);
    const [toogleSort, changeToogleSort] = useState(true)

	useEffect(() => {
        setStudents(list.data);
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

    function handleSort(){
        const sorted = [...filteredStudents].sort((a, b) => {
            const nameA = a.lastName.toLowerCase() + a.name.toLowerCase();
            const nameB = b.lastName.toLowerCase() + b.name.toLowerCase();
            if (nameA < nameB) {
              return toogleSort === true ? -1 : 1;
            }
            if (nameA > nameB) {
              return toogleSort === true ? 1 : -1;
            }
            return 0;
          });
          setFilteredstudents(sorted);
          changeToogleSort(!toogleSort);
    }

	return (
		<div>
			<Head>
				<title> Students - RatherLab School </title>
			</Head>
			<div className={Styles.searchTag}>
				<FontAwesomeIcon style={{fontSize:"25px"}} icon={faSearch}></FontAwesomeIcon>
				<input type="text" placeholder='Search room by name' onChange={handleSearh}/>

				<button onClick={()=>handleClearSearch()}>
					CLEAR
				</button>
				<button onClick={()=>handleSort()}>
					{toogleSort ? "A-Z" : "Z-A"}
				</button>
			</div>
			<ul className={Styles.roomList}>
                {filteredStudents.map((student) => (
					<li key={student.id}>
						<StudentCard student={student} />
					</li>
				))}
			</ul>
		</div>
		);
};