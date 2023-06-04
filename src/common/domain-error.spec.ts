import { Errors } from './domain-error';

describe('Errors', () => {
    it('should has statusCode 401', () => {
        expect(Errors.UNAUTHORIZED([{ key: '' }]).statusCode).toBe(401);
    });

    it('should has statusCode 403', () => {
        expect(Errors.FORBIDDEN().statusCode).toBe(403);
    });

    it('should has statusCode 404', () => {
        expect(Errors.NOT_FOUND([{ key: '' }]).statusCode).toBe(404);
    });

    it('should has statusCode 412', () => {
        expect(Errors.PRECONDITION_FAILED([{ key: '' }]).statusCode).toBe(412);
    });

    it('should has statusCode 500', () => {
        expect(Errors.INTERNAL_SERVER_ERROR().statusCode).toBe(500);
    });
});
