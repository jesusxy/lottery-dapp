import { ethers } from "ethers";
import Lottery_ABI from "../ethereum/contracts/Lottery_ABI.json";

const LOTTERY_CONTRACT_ADDRESS = "0x648C464f78afDE8C61328232Fcf99512E5F105cE";

export default function useLotteryContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lotteryContract = new ethers.Contract(LOTTERY_CONTRACT_ADDRESS, Lottery_ABI, signer);

    return {
        provider, 
        signer,
        lotteryContract
    }
}