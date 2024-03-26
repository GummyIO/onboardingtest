import { Router } from 'express';
import getTokenDetailsHandler from './handlers/getTokenDetailsHandler';

const tokenRouter = Router();

tokenRouter.post('/details', getTokenDetailsHandler);
tokenRouter.post('//webhook', getTokenDetailsHandler);

export default tokenRouter;
