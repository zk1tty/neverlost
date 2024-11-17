# neverlost
SmartContract-based wallet powered by Alchemy Contract kit

## Problem(Why I build): 
Key management of wallets is one of the taught experience for any level of users.   
Especially, wallet generations and and key storing is problem.

## Solution(What I build): 
The wallet that you can create accounts connected with social logins, and recover the ownership with other social accounts if necessary.

## How(Technical):  
Using the capability of ModularAccount introduced in Alchemy Account Kit.  
Users can sign in more than 2 social accounts.   
Each account will issue individual Smart Contract Account(not EOA).   
Their wallet will have the ownership of the main ModularAccount.

## Demo(Workflow): 
1. generate 2 individual smart account via social links.(Email and GoogleAccount)
2. Register both of them to the main ModularAccount.
3. Transfer the asset of main ModularAccount wallet by using individual smart account.
