# NeverLost Wallet
Wallet which a uswer  
powered by [Alchemy Contract kit](https://accountkit.alchemy.com/smart-contracts/overview)

## Problem(Why I build) 
Key management of wallets is one of the taught experience for any level of users.   
Especially, wallet generations and and key storing is problem.

## Solution(What I build)
The wallet that you can create accounts connected with social logins, and recover the ownership with other social accounts if necessary.

## How(Technical)
Using the capability of ModularAccount introduced in Alchemy Account Kit.  
Users can sign in more than 2 social accounts.   
Each account will issue individual Smart Contract Account(not EOA).   
Their wallet will have the ownership of the main ModularAccount.

## Demo(Workflow) 
1. generate 2 individual smart account via social links.(Email and GoogleAccount)
2. Register both of them to the main ModularAccount.
3. Transfer the asset of main ModularAccount wallet by using individual smart account.

[Watch the demo video here](https://www.loom.com/embed/11a68039ddc64211bf4d95a75aba4deb?sid=efd75226-b697-4f62-8442-15c545163665)

<img width="806" alt="Screenshot 2567-11-17 at 10 08 50" src="https://github.com/user-attachments/assets/8b5d05dc-d656-481e-ab63-5748ac67b4e1">

## Network and Smart Contract Account
- Network: Ethereum Sepolia testnet
- Modular Account: [0x11C3B85374215863c8C1B92B0c14E76c9284863d](https://sepolia.etherscan.io/address/0x11C3B85374215863c8C1B92B0c14E76c9284863d#tokentxns)

- Network: Arbitrum Sepolia testnet
- Smart Contract Account: [0x11C3B85374215863c8C1B92B0c14E76c9284863d](https://sepolia.arbiscan.io/address/0x11C3B85374215863c8C1B92B0c14E76c9284863d)
