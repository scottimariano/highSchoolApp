import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import RoomCard from "../components/room/RoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
	const [rooms, setRooms] = useState([]);
	const [input, setInput] = useState([]);
	const [filteredRooms, setFilteredRooms] = useState([]);
	const { user, error, isLoading } = useUser();

	const getRooms = async ()=>{
		console.log(API_URL)
		const res = await fetch(`${API_URL}/rooms`);
		const data = await res.json();
		console.log(data)
		setRooms(data);
	}

	useEffect(() => {
		getRooms();
	}, []);
	
	useEffect(() => {
		setFilteredRooms(rooms)
	}, [rooms]);


	function handleSearh(input){
		setFilteredRooms(rooms.filter(room => room.name.includes(input)))
		setInput('');
	}

	function handleClearSearch(){
		setFilteredRooms(rooms)
	}

	return (
		<div>
			<Head>
				<title>RatherLab Dev School</title>
			</Head>
			<div>
				<input type="text" placeholder='Search room by name' value={input} onChange={(e) => setInput(e.target.value)}/>
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