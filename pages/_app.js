import React from 'react';
import Head from 'next/head';
import '../app/globals.css';

function App ({Component, pageProps}) {
    return(
        <main>
            <Head><title>GID</title></Head>
            <Component {...pageProps}/>
        </main> 
    )
}

export default App;