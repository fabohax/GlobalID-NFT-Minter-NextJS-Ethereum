import React, { createContext, useState, useEffect } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(null);

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

    const getConnectedWalletAddress = async () => {
      if (walletConnected) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setConnectedWalletAddress(accounts[0]);
      } else {
        setConnectedWalletAddress(null);
      }
    };

    getConnectedWalletAddress();
  }, [walletConnected]);

  async function handleConnectWallet() {
    try {
      // Connect to the Optimism chain (chainId: 10)
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x010' }], // Use chainId 10 for Optimism
      });
  
      // Add an event listener to be notified when the list of connected accounts changes.
      window.ethereum.on('accountsChanged', () => {
        // Update or refresh the page if needed.
      });
  
      console.log('Connected to Optimism chain!');
    } catch (error) {
      console.error('Error connecting to Optimism:', error);
      // Handle errors appropriately, e.g., display an error message to the user.
    }
  }  

  async function handleDisconnectWallet() {
    setWalletConnected(false);
    setAccount(null);
    setConnectedWalletAddress(null);
  
    window.ethereum.removeListener('accountsChanged', () => {});
  
    console.log('Wallet disconnected!');
    alert('Wallet disconnected. Revoke permissions from the Dapp in your wallet settings if desired.');
  }

  const value = {
    walletConnected,
    account,
    connectedWalletAddress,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
