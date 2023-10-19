import React, { useState, useEffect } from 'react';
import { minter } from '../fun/minter';

export default function Minter() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    passport: '',
    email: '',
    pic: '',
    social: '',
    site: '',
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
    const { name, lastName, dateOfBirth, country, passport, email, pic, social, site } = formData;

    // Check if a wallet is connected
    if (!walletConnected) {
      console.error('Wallet not connected. Please connect your wallet.');
      return;
    }

    // Perform the minting process using the connected account and form data
    try {
      const asset = await minter(name, lastName, dateOfBirth, country, passport, email, pic, social, site, account);

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
          {Object.entries(formData).map(([field, value]) => (
            <input
              key={field}
              type={field === 'dateOfBirth' ? 'date' : 'text'}
              name={field}
              placeholder={field}
              value={value}
              onChange={handleInputChange}
              className='block mb-2 p-4 w-full'
            />
          ))}
          <input
            type="file"
            name="pic"
            onChange={handleInputChange}
            className='block mb-2 p-4 border-solid border-white border-2'
          />
        </div>
      )}

      <button onClick={handleMint} className='bg-white p-4 text-black mb-4'>
        Mint
      </button>
    </div>
  );
}
