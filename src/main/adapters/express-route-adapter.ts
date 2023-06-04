import { IController } from '@/presentation/helpers';
import { Request, Response } from 'express';
import { handler } from '../helpers';

export const adaptRoute = (controller: IController) => {
    return async (req: Request, res: Response) => {
        const request = {
            body: req.body || {},
            params: req.params || {},
        };
        const promise = controller.execute(request);
        await handler.json(res, promise);
    };
};
