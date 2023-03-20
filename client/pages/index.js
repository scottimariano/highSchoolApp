import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import RoomCard from "../components/room/RoomCard";
import Sidebar from "../components/sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //

import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3300';


const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    axios.get("/rooms")
      .then((response) => {
        setRooms(response.data)
        setFilteredRooms(response.data)
      })
      .catch((error) => console.error(error));
  }, []);


  function handleSearh(searchInput){
    setFilteredRooms(rooms.filter(room => room.name == searchInput))
  }

  function handleClearSearch(){
    setFilteredRooms(rooms)
  }

  return (
    <div>
      <Head>
        <title>RatherLab Dev School</title>
      </Head>
      <Sidebar/>
      <div>
        <input type="text" placeholder='Search room by name'/>
        <button onClick={()=>handleSearh("Math")}>
          <FontAwesomeIcon style={{fontSize:"25px"}} icon={faSearch}></FontAwesomeIcon>
        </button>
        <button onClick={()=>handleClearSearch()}>
          CLEAR
        </button>
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