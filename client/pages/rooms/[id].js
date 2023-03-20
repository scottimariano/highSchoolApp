import RoomDetail from "../../components/room/RoomDetail";
import { useRouter } from 'next/router'
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";

const API_URL = process.env.REACT_APP_API_URL

export default function RoomPage(room){

    return (
        <div>
            <Sidebar/>
            <RoomDetail room={room}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { id } = context.params;
    const res = await fetch(`${API_URL}/rooms/${id}`)
    const data = await res.json()
  
    return { props: { data } }

}