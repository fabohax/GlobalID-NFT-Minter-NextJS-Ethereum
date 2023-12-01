import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Index(props) {
    return (
        <div className='flex overflow-hidden h-full place-content-center justify-center items-center'>
        <Link href="/minter">
            <button className='absolute bg-black text-black mt-24 p-4 pr-8 pl-8 flex mx-auto rounded-lg bg-white z-10'>Mint Global ID</button>
        </Link>        

        </div>
    );
}

export default Index;