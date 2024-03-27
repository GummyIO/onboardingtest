# Smart Contract project is under the folder hardhat

### ERC20 Token smart contract is GummyERC20Token.sol under the folder hardhat/contracts

### For Smart contract deployment to sepolia testnetwork run
```
npx hardhat run ./scripts/deploy.js --network sepolia
```
It uses infura services for sepolia rpc connection

# ERC20 Transfer event listener
### It uses Moralis stream API, 
### At the Moralis admin portal, a stream is created registering the Webhook API against the deployed contract ERCTransfer events
### A webhook is implemented under the token route to decode the transfer event and persist the data in the database

The token contract is deployed at 0x5b5067B8DD9F7F608960EC61F6d18DD04B799A08 and the same is configured at the Moralis admin portal.

# Metadog Onboarding test dApp Backend

### Install dependencies

```
yarn install
```

#### dev mode

```
yarn dev
```

#### prod mode

```
yarn start
```

#### How to check if the server is running

```
GET /api/v1/ping
```
