
import Home from "../components/home/Home";
import Head from 'next/head'
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage (list) {
 return (
    <>
        <Head>
            <link href="https://uploads-ssl.webflow.com/629ffbf53482a7f051677d6b/62b501e03eba9980c694ed0f_favicon.png" rel="shortcut icon" type="image/x-icon"/>
        </Head>
        <Home list={list}/>
    </>
    )
};

export async function getServerSideProps(context) {
    
    const res = await fetch(`${API_URL}/rooms`)
    let data = await res.json()
    await data.sort((a, b) => {
        const nameA = a.name.toLowerCase() + a.teacher.toLowerCase();
        const nameB = b.name.toLowerCase() + b.teacher.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return { props: { data } }

}