import { ok } from './http-helper';

describe('Http helper', () => {
    it('should return status code 200', () => {
        expect(ok({})).toEqual({
            statusCode: 200,
            body: {},
        });
    });
});
