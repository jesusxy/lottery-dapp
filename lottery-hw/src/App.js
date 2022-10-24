import './App.css';
import React, {useState, useEffect} from 'react';
import Wallet from './components/Wallet';
import Lottery_ABI from "./ethereum/contracts/Lottery_ABI.json";

import { ethers } from 'ethers';

function App() {
  // state 
  const [lotteryEndDate, setLotteryEndDate] = useState(null);

  // move this into its own func / hook
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const lotteryContractAddress = "0x648C464f78afDE8C61328232Fcf99512E5F105cE";

  // create lottery contract 
  const lotteryContract = new ethers.Contract(lotteryContractAddress, Lottery_ABI, provider);

  const fetchLotteryEndDate = async () => {
     const endDate = await lotteryContract.betsClosingTime();
     console.log('_____ endDate _____', endDate);
     // TODO: format date correctly. right now it is not showing the correct date 
     const formatDate = new Date(endDate * 1000).toLocaleDateString("en-US");
     setLotteryEndDate(formatDate);
 }

  useEffect(() => {
     fetchLotteryEndDate();
  }, [])

  return (
    <div className="App">
      <header className="App-header">Lottery dApp</header>
      <div className="App-content">
        <div>
          <span>Please place your bet before: {lotteryEndDate}</span>
        </div>
        
        <Wallet provider={provider} />

      </div>
    </div>
  );
}

export default App;
