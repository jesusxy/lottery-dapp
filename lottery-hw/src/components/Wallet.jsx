import React, { useState, useEffect } from "react";
import { ethers } from "ethers";


const Wallet = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);

    const connectWallet = async () => {
        if(window.ethereum){
            try {
                const res = await window.ethereum.request({ method: 'eth_requestAccounts'});
                await accountsChanged(res[0]);
            } catch(err){
                console.log('Error Connecting: ', err);
                setErrorMessage('There was a problem connecting to MetaMask')
            }
        } else {
            setErrorMessage('Please install Metamask browser extension');
        }
    }


    const accountsChanged = async (_newAccount) => {
        setAccount(_newAccount);
        try {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [_newAccount.toString(), "latest"],
            });
            setWalletBalance(ethers.utils.formatEther(balance));
            setIsConnected(true);
        } catch(err) {
            console.error(err);
            setIsConnected(false)
            setErrorMessage("There was a problem retrieving wallet balance");
        }
    }


    return(
        <div>
            { isConnected 
            ? <div> 
                <span>Successfully Connected to Wallet : {account.slice(0,4)}...{account.slice(38.42)}</span>
                <h3>Wallet Balance</h3>
                <span>{walletBalance}</span>
              </div>
            : 
                <div>
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