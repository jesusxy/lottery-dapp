# Lottery dApp Weekend Homework - Oct 22/23

This README file has our reports that go over each function execution, transaction hash, or the revert reason (if there was one) when 
interacting with the Lottery.sol contract.

**Group Members:**

- Adrian Sandoval
- Jesus Chavez
- Arjun Mukherjee
- Micah Bly
- Jose Marvn Henriquez


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Jesus

### Deployed Lottery.sol contract to goerli testnet using Remix.

###### Contract deployment tx details
```
transactionHash: 0x357407fbd2d19dda0d0d7ce6cefb146c75450112205fae917ea4f7161beb7a98,
lotteryContractAddress: "0x648C464f78afDE8C61328232Fcf99512E5F105cE",
```

###### Function exection-> `openBets( )`
```
transactionHash: 0xa329e56b9af51fdab7200df3bb48be281f615e94c1d9a31f1dd35273cbfcc335
```

This function opens the lottery and allows users to enter lottery. As the owner of contract I called this function through remix and passed `1666670319` for the `closingTime` param value. 

`1666670319 -> Mon Oct 24 2022 22:58:39`

Only issue I was able to observe is the closing time not displaying correctly on frontend. On front-end the closing time is `8/17/2075`.


###### Function exection-> `placeBet( )`

This function transfers `betFee + betPrice` from user to the Lottery contract.
```lotteryToken.transferFrom(msg.sender, address(this), betPrice + betFee);```

When called the transaction was reverted with the following error: 
```Error: cannot estimate gas; transaction may fail or may require manual gas limit```

I believe this is due to my metamask account not having sufficient funds. 
`betFee = 0.2 eth` and `betPrice = 0.5`, while my account balance was only 1.7 goerliEth.
