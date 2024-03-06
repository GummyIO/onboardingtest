import mongoose from 'mongoose';
import { Erc20Contract } from "./utils/contracts/erc20Contract";

const transferSchema = new mongoose.Schema(
    {
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        amount: {
            type: String,
        }
    }
);

const TransferModel = mongoose.model('transfers', transferSchema);

export async function listenForTransfer(chainId : number, address : string) {
    const erc20Test = (await new Erc20Contract(chainId, address)).contract;

    erc20Test.on("Transfer", (to, amount, from) => {
        const data = new TransferModel( {
            from: from,
            to: to,
            amount: amount.toString()
            }
        );
        data.save();
    })
}