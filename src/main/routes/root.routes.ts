import Router, { Request, Response } from 'express';
import { Logger } from '../helpers';

const router = Router();
const path = '/';

router.get('/', (request: Request, response: Response) => {
    Logger.log('route - root - get');
    response.send('The server is running');
});

router.post('/', (request: Request, response: Response) => {
    Logger.log('route - root - post');
    response.send(request.body);
});

export { router, path };
