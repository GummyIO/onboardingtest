import 'dotenv/config';

import connectMongo from './connectMongo';
import startServer from './startServer';
import fnftData from './cronJobs/fnftData';
import votingData from './cronJobs/votingData';
import populateInvestmentsData from './cronJobs/populateInvestmentsData';
import bondingFarmData from './cronJobs/bondingFarmData';
import multiPayData from './cronJobs/multiPayData';
import epFarmData from './cronJobs/epFarmData';
import taxReportData from './cronJobs/taxReportData';
import Moralis from 'moralis';
import { moralisApiKey } from './constants';
import getTokenPriceData from './cronJobs/priceData/getTokenPriceData';
import getLPTokenPriceData from './cronJobs/priceData/getLPTokenPriceData';

const execute = async () => {
    // await connectMongo();
    await Moralis.start({
        apiKey: moralisApiKey,
    });

    //await listenForTransfer(5, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

    // votingData(); // This cronjob is working on voting contract so this is not used anymore
    // populateInvestmentsData();
    // fnftData();
    // bondingFarmData();
    // epFarmData();
    // multiPayData();
    // taxReportData();

    startServer();
};

execute();
