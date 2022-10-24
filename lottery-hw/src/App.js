import './App.css';
import React, {useState, useEffect} from 'react';
import { BigNumber, ethers } from 'ethers';

import Wallet from './components/Wallet';
import Lottery_ABI from "./ethereum/contracts/Lottery_ABI.json";
import useLotteryContract from './hooks/useLotteryContract';


function App() {
  // state 
  const [lotteryEndDate, setLotteryEndDate] = useState(null);
  const [prizePool, setPrizePool] = useState(null);
  const [lotteryFee, setLotteryFee] = useState(null);
  const { provider, signer, lotteryContract } = useLotteryContract();

  const fetchLotteryEndDate = async () => {
     const endDate = await lotteryContract.betsClosingTime();
     console.log('_____ endDate _____', endDate);

     // TODO: format date correctly. right now it is not showing the correct date 
     const formatDate = new Date(endDate * 1000).toLocaleDateString("en-US");
     setLotteryEndDate(formatDate);
 }

 const fetchLotteryPrizePool = async () => {
  const _prizePool = await lotteryContract.prizePool();
  let formatPrizePool = ethers.utils.formatEther(_prizePool);
  setPrizePool((+formatPrizePool).toFixed(4));

 }

 const getLotteryFee = async () => {
  let _betFee = await lotteryContract.betFee();
  let _betPrice = await lotteryContract.betPrice();
  let _total = _betFee.add(_betPrice);
  _total = ethers.utils.formatEther(_total);
  setLotteryFee((+_total).toFixed(3));
 }

 const enterLotteryHandler = async () => {
    const placeBet = await lotteryContract.placeBet();
    await placeBet.wait();

    await fetchLotteryPrizePool();
 }

  useEffect(() => {
     fetchLotteryEndDate();
     fetchLotteryPrizePool();
     getLotteryFee();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Lottery dApp</header>
      <div className="App-content">
        <div className='App-lottery'>
          <div>
            <h4>Please place your bet before: {lotteryEndDate}</h4>
          </div>
          <div>
            <h2 className='App-lottery-pool'>Lottery Pool: {prizePool}</h2>
            <span>To enter lottery please send - {lotteryFee} ETH</span>
          </div>
          <div className='App-enter-lottery'>
            <button onClick={enterLotteryHandler} className="App-lottery-button">Enter Lottery</button>
          </div>
        </div>
        
        <Wallet provider={provider} />

      </div>
    </div>
  );
}

export default App;
