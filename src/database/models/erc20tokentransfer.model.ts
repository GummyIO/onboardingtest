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

export default TransferModel;

