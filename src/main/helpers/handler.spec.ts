import { Response } from 'express';
import { Logger } from './logger';
import { handler } from './handler';

describe('Handler', () => {
    let response: Response;

    beforeEach(() => {
        response = {} as Response;
        Logger.dir = jest.fn();
        Logger.log = jest.fn();
        response.status = jest.fn().mockReturnThis();
        response.json = jest.fn().mockReturnThis();
        response.end = jest.fn();
    });

    it('should handle successful JSON response', async () => {
        const data = { result: 'success' };
        const promise = Promise.resolve(data);

        await handler.json(response, promise);

        expect(Logger.log).toHaveBeenCalledWith('lib - handler - json');
        expect(Logger.dir).toHaveBeenCalledWith({ statusCode: 200 });
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(data);
        expect(response.end).toHaveBeenCalled();
    });

    it('should handle error JSON response', async () => {
        const error = {
            statusCode: 500,
            title: 'Internal Server Error',
            errors: ['Something went wrong'],
        };
        const promise = Promise.reject(error);

        await handler.json(response, promise);

        expect(Logger.log).toHaveBeenCalledWith('lib - handler - json');
        expect(Logger.log).toHaveBeenCalledWith('lib - handler - handlerError');
        expect(Logger.dir).toHaveBeenCalledWith(error);
        expect(response.status).toHaveBeenCalledWith(error.statusCode);
        expect(response.json).toHaveBeenCalledWith({
            statusCode: error.statusCode,
            title: error.title,
            message: {
                result: 'error',
                msg: error.errors,
            },
        });
        expect(response.end).toHaveBeenCalled();
    });
});
