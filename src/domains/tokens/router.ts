import { Router } from 'express';
import getTokenDetailsHandler from './handlers/getTokenDetailsHandler';
import processERC20TokenTransferEvents from './handlers/erc20TokenTransfer';

const tokenRouter = Router();

tokenRouter.post('/details', getTokenDetailsHandler);
tokenRouter.post('/webhook', processERC20TokenTransferEvents);

tokenRouter.get('/pingTokenRouter', (_, res) => {
    res.json({ message: 'Token ROuter Ping' });
});

export default tokenRouter;
