import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '@/presentation/ports';

export const handlerError = (error: HttpResponse, request: Request, response: Response, next: NextFunction) => {
    const status = error.statusCode || 500;

    response.status(status).send(error);
};
