import { InvalidEmailError } from './invalid-email';

describe('InvalidEmailError', () => {
    it('should throw InvalidEmailError', () => {
        expect(() => {
            throw new InvalidEmailError('test');
        }).toThrow(InvalidEmailError);
    });
});
