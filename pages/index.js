import React, {useState, useEffect} from 'react'
import { WalletProvider } from '@/com/WalletContext'
import WalletConnector from '@/com/WalletConnector'

export default function Info() {

  return (
    <WalletProvider>
      <div className='flex flex-col items-center justify-center h-screen'>
            <WalletConnector/>
      </div>
    </WalletProvider>
  )
}
