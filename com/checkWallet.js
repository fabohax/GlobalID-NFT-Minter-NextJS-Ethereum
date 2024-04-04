import React from "react";

export const checkWallet = () => {
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
}