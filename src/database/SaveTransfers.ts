import Moralis from 'moralis';
import dotenv from 'dotenv';
import fs from 'fs';

async function start() {
    dotenv.config();

    try {
        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY,
        });

        const response = await Moralis.EvmApi.token.getTokenTransfers({
            chain: '0x5',
            order: 'DESC',
            address: '0x6420579394dE7cd420D75207654139bcE56f69Da',
        });

        console.log(response.raw);

        const responseTx = fs.writeFileSync('src/database/erc20Transactions/GummyTransactions.txt', response, 'utf8');
    } catch (e) {
        console.error(e);
    }
}

start();
