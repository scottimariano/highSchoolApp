import RoomDetail from "../../components/room/roomDetail/RoomDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RoomPage(room){
    
    return <RoomDetail room={room}/>

}

export async function getServerSideProps(context) {
    
    const { id } = context.params;
    const res = await fetch(`${API_URL}/rooms/${id}`)
    const data = await res.json()
  
    return { props: { data } }

}