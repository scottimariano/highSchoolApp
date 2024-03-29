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

    function handleHasSiblings(){
		const withSiblings = filteredStudents.filter(student=>{
			return student.siblings.length > 0
		})
        const sorted = withSiblings.sort((a, b) => {
			return b.siblings.length - a.siblings.length
		});
        setFilteredstudents(sorted);
    }

	return (
		<div>
			<Head>
				<title> Students - Riverside School </title>
			</Head>
			<div className={Styles.searchTag}>
				<FontAwesomeIcon style={{fontSize:"25px", marginRight: "10px"}} icon={faSearch}></FontAwesomeIcon>
				<input type="text" placeholder='Search student by name' value={searchInput} onChange={e=>handleSearh(e)}/>

				<button onClick={()=>handleClearSearch()}>
					Clear
				</button>
				<button onClick={()=>handleSort()}>
					{toogleSort ? "A-Z" : "Z-A"} &darr;
				</button>
				<button onClick={()=>handleHasSiblings()}>
					By Siblings &darr;
				</button>
			</div>
			<h2 className={Styles.title}>STUDENTS</h2>
			<ul className={Styles.studentList}>
                {filteredStudents.map((student) => (
					<li key={student.id}>
						<StudentCard student={student} />
					</li>
				))}
			</ul>
		</div>
		);
};