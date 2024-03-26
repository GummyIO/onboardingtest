import mongoose from 'mongoose';

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

