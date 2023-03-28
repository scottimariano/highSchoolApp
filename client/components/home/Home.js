import Head from 'next/head';
import { useState, useEffect } from "react";
import RoomCard from "./roomCard/RoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/home/Home.module.css"

export default function Home ({list}) {
	const [rooms, setRooms] = useState([]);
	const [filteredRooms, setFilteredRooms] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [toogleSort, changeToogleSort] = useState(false)
	
	useEffect(() => {
		setRooms(list.data);
	}, []);
	
	useEffect(() => {
		setFilteredRooms(rooms)
	}, [rooms]);


	function handleSearh(e){
		setSearchInput(e.target.value)
		setFilteredRooms(rooms.filter(room => {
			let roomName = room.name.toLowerCase();
			return roomName.includes(searchInput.toLowerCase())
		}))
	}

	function handleClearSearch(){
		setFilteredRooms(rooms)
		setSearchInput("")
		changeToogleSort(false)
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
				<FontAwesomeIcon style={{fontSize:"25px", marginRight: "10px"}} icon={faSearch}></FontAwesomeIcon>
				<input type="text" placeholder='Search room by name' value={searchInput} onChange={e=>handleSearh(e)}/>

				<button onClick={()=>handleClearSearch()}>
					Clear
				</button>
				<button onClick={()=>handleSort()}>
					{toogleSort === true ? "A-Z" : "Z-A"} &darr;
				</button>
			</div>
			<h2 className={Styles.title}>ROOMS</h2>
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