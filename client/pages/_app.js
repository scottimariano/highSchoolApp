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
            <link href="https://res.cloudinary.com/dmwfysfrn/image/upload/c_thumb,w_200,g_face/v1680263256/ratherLab/assets/o3mmvcfw8u7jdd76rloo.png" rel="shortcut icon" type="image/x-icon"/>
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
                        rel="preload"
                        src="/assets/starsBg.jpg"
                        alt="stars sky"
                        as="image"
                        fill
                        priority
                    />
                </div>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    </>
  ) 
}

export default MyApp