//initialize
//setup stream specifying webhook, can be created from the dashboard

//implement web hook to persist the ERCTransfer data in DB

import Moralis from "moralis";
import { ethers, BigNumber } from 'ethers';
import { Request, Response } from 'express';
import TransferModel from "src/database/models/erc20tokentransfer.model";

interface Transfer{
    from : string
    to : string
    value : BigNumber
 
}

export default async function processERC20TokenTransferEvents(
    req: Request,
    res: Response,
) {

    const webhook = req.body;
    if (webhook.logs.length == 0)
    {
    console.log("No Logs");
    return  res.status(200).json();
    }
    
    
    const decodedLogs = Moralis.Streams.parsedLogs<Transfer>(webhook);

    
    const data = new TransferModel( {
        from: decodedLogs[0].from,
        to: decodedLogs[0].to,
        amount: ethers.utils.formatEther( decodedLogs[0].value)
        }
    );
    data.save();
    return  res.status(200).json();

}