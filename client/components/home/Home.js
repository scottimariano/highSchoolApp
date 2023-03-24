import Head from 'next/head';
import { useState, useEffect } from "react";
import RoomCard from "../../components/room/RoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/StudentsHome.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
	const [rooms, setRooms] = useState([]);
	const [filteredRooms, setFilteredRooms] = useState([]);
	const [toogleSort, changeToogleSort] = useState(true)

	const getRooms = async ()=>{
		const res = await fetch(`${API_URL}/rooms`);
		const data = await res.json();
		setRooms(data);
	}

	useEffect(() => {
		getRooms();
	}, []);
	
	useEffect(() => {
		setFilteredRooms(rooms)
	}, [rooms]);


	function handleSearh(e){
		let searchTerm = e.target.value
		setFilteredRooms(rooms.filter(room => {
			let roomName = room.name.toLowerCase();
			return roomName.includes(searchTerm.toLowerCase())
		}))
	}

	function handleClearSearch(){
		setFilteredRooms(rooms)
		changeToogleSort(true)
	}

	function handleSort(){
        const sorted = [...filteredRooms].sort((a, b) => {
            const nameA = a.name.toLowerCase() + a.teacher.toLowerCase();
            const nameB = b.name.toLowerCase() + b.teacher.toLowerCase();
            if (nameA < nameB) {
              return toogleSort === true ? -1 : 1;
            }
            if (nameA > nameB) {
              return toogleSort === true ? 1 : -1;
            }
            return 0;
          });
          setFilteredRooms(sorted);
          changeToogleSort(!toogleSort);
    }

	return (
		<div>
			<Head>
				<title> Home page - RatherLab School </title>
			</Head>
			<div className={Styles.searchTag}>
				<FontAwesomeIcon style={{fontSize:"25px"}} icon={faSearch}></FontAwesomeIcon>
				<input type="text" placeholder='Search room by name' onChange={handleSearh}/>

				<button onClick={()=>handleClearSearch()}>
					CLEAR
				</button>
				<button onClick={()=>handleSort()}>
					{toogleSort === true ? "A-Z" : "Z-A"}
				</button>
			</div>
			<ul className={Styles.roomList}>
				{filteredRooms.map((room) => (
					<li key={room.id}>
						<RoomCard room={room} />
					</li>
				))}
			</ul>
		</div>
		);
};

export default Home;