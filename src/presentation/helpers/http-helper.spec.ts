import { ok, badRequest, serverError } from './http-helper';

describe('Http helper', () => {
    it('should return status code 200', () => {
        expect(ok({})).toEqual({
            statusCode: 200,
            body: {},
        });
    });

    it('should return status code 400', () => {
        expect(badRequest(new Error())).toEqual({
            statusCode: 400,
            body: new Error().message,
        });
    });

    it('should return status code 500', () => {
        expect(serverError()).toEqual({
            statusCode: 500,
            body: {},
        });
    });
});
