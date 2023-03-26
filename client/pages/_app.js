import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Layout from '../components/layout/Layout';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <style jsx global>{`
                html {
                font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <link href="https://uploads-ssl.webflow.com/629ffbf53482a7f051677d6b/62b501e03eba9980c694ed0f_favicon.png" rel="shortcut icon" type="image/x-icon"/>
        </Head>
        <UserProvider>
            <Layout>
                <div style={{
                zIndex: -1,
                position: "fixed",
                width: "100vw",
                height: "100vh"
                }}>
                <Image 
                    src="/assets/starsBg.jpg"
                    alt="stars sky"
                    layout="fill"
                    objectFit='cover'
                />
                </div>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    </>
  ) 
}

export default MyApp