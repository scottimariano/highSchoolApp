import Admin from "../components/admin/Admin"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminPage(){
    
    return <Admin/>

}

export const getServerSideProps = withPageAuthRequired({})