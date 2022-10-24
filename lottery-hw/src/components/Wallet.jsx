import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../styles/Wallet.scss";


const Wallet = ({provider}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);

    const connectWallet = async () => {
        if(window.ethereum){
            try {
                const res = await window.ethereum.request({ method: 'eth_requestAccounts'});
                await getWalletBalance(res[0]);
            } catch(err){
                console.log('Error Connecting: ', err);
                setErrorMessage('There was a problem connecting to MetaMask')
            }
        } else {
            setErrorMessage('Please install Metamask browser extension');
        }
    }


    const getWalletBalance = async (_newAccount) => {
        setAccount(_newAccount);
        try {
            let balance = await provider.getBalance(_newAccount);
            balance = ethers.utils.formatEther(balance)
            setWalletBalance((+balance).toFixed(4));
            setIsConnected(true);
        } catch(err) {
            console.error(err);
            setIsConnected(false)
            setErrorMessage("There was a problem retrieving wallet balance");
        }
    }


    return(
        <div className="Wallet">
            { isConnected 
            ? <div className="Wallet__details"> 
                <span>Successfully Connected to Wallet : {account.slice(0,4)}...{account.slice(38.42)}</span>
                <div className="Wallet__balance">
                    <h3>Wallet Balance: </h3>
                    <span>{walletBalance}</span>
                </div>
              </div>
            : 
                <div className="Wallet__connect">
                    <span>Please connect your Wallet before playing</span>
                    <button onClick={connectWallet}>Connect Wallet</button>
                    {errorMessage && (
                        <span>Error: { errorMessage }</span>
                    )}
                </div>
            }
            
        </div>
    );
}

export default Wallet;