import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import '../app/globals.css';

import {Roboto, Rajdhani} from 'next/font/google';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
  })
  const rajdhani = Rajdhani({
    weight: '400',
    subsets: ['latin'],
  })

function App ({Component, pageProps}) {
    return(
        <main className={roboto.className}>
            <Head><title>GID</title></Head>
            <Component {...pageProps}/>
        </main> 
    )
}

export default App;