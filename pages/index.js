import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Index(props) {
    return (
        <div>
            <Link href="/minter"><Image src="/logo.svg" height="72" width="72" alt="tilata" className='mx-auto my-auto center'/></Link>
            
        </div>
    );
}

export default Index;