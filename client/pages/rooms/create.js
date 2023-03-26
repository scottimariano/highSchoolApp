import CreateRoom from "../../components/room/createRoom/CreateRoom";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function CreateStudentPage(){
    
    return <CreateRoom/>

}

export const getServerSideProps = withPageAuthRequired({})