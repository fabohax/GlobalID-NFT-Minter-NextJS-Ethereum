import React, { useState, useEffect } from 'react';
import { mintNFT } from '../fun/minter';

const OpenSea = require('opensea-js');

export default function Minter() {
  const [formData, setFormData] = useState({
    NAME: '',
    LAST_NAME: '',
    DATE_OF_BIRTH: '',
    COUNTRY: '',
    PASSPORT_NUMBER: '',
    EMAIL: '',
    SITE: '',
  });

  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    async function checkWalletConnection() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWalletConnected(true);
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting wallet:', error);
          setWalletConnected(false);
        }
      } else {
        console.error('Ethereum provider not found. Please install MetaMask or another compatible wallet.');
        setWalletConnected(false);
      }
    }

    checkWalletConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleMint() {
    const { NAME, LAST_NAME, DATE_OF_BIRTH, COUNTRY, PASSPORT, EMAIL, SITE } = formData;
  
    // Check if a wallet is connected
    if (!walletConnected) {
      console.error('Wallet not connected. Please connect your wallet.');
      return;
    }
  
    // Check if the wallet is connected to the Sepolia testnet.
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== 11155111) {
      console.error('Wallet not connected to the Sepolia testnet. Please connect to the Sepolia testnet.');
      return;
    }
  
    // Perform the minting process using the connected account and form data
    try {
      const asset = await mintNFT(NAME, LAST_NAME, DATE_OF_BIRTH, COUNTRY, PASSPORT, EMAIL, SITE);
  
      // Display the NFT asset to the user.
      console.log('Minted NFT:', asset);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  }
  
  async function handleConnectWallet() {
    // Connect to the Sepolia testnet.
    await window.ethereum.request({ chainId: 11155111 });
  }

  return (
    <div className='p-4 mx-auto my-auto grid place-content-center pt-12'>
      {!walletConnected && (
        <button onClick={handleConnectWallet} className='bg-white p-4 text-black mb-4'>
          Connect wallet
        </button>
      )}

      {walletConnected && (
        <div id="minter-div">
          <h1>Mint your Global ID</h1>
          <br></br>
          <input
            type="file"
            name="PICTURE"
            onChange={handleInputChange}
            className='block mb-2 p-4 border-solid border-white border-2'
          />
          {Object.entries(formData)
          .filter(([field]) => field !== 'PICTURE')
          .map(([field, value]) => (
            <input
              key={field}
              type={field === 'DATE_OF_BIRTH' ? 'date' : 'text'}
              name={field}
              placeholder={field}
              value={value}
              onChange={handleInputChange}
              className='block mb-2 p-4 w-full text-black'
            />
          ))}
          <button onClick={handleMint} className='bg-white p-4 text-black mb-4'>
            Mint
          </button>
        </div>
      )}      
    </div>
  );
}
