import Head from 'next/head';
import StudentCard from "./studentCard/StudentCard"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../styles/student/studentList/StudentsHome.module.css"

export default function StudentsList ({list}) {
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredstudents] = useState([]);
	const [searchInput, setSearchInput] = useState("");
    const [toogleSort, changeToogleSort] = useState(false);

	useEffect(() => {
        setStudents(list.data);
	}, []);
	
	useEffect(() => {
		setFilteredstudents(students)
	}, [students]);

	function handleSearh(e){
		setSearchInput(e.target.value)
		setFilteredstudents(students.filter(student => {
			let name = student.name.toLowerCase();
			let lastName = student.lastName.toLowerCase();
			return (name.includes(e.target.value.toLocaleLowerCase()) ||
					lastName.includes(e.target.value.toLocaleLowerCase()))
		}))
	}

	function handleClearSearch(){
		setFilteredstudents(students)
		setSearchInput("")
        changeToogleSort(false)
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
				<input type="text" placeholder='Search student by name' value={searchInput} onChange={e=>handleSearh(e)}/>

				<button onClick={()=>handleClearSearch()}>
					CLEAR
				</button>
				<button onClick={()=>handleSort()}>
					{toogleSort ? "A-Z" : "Z-A"} &darr;
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