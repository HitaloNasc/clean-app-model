import { InvalidPasswordError } from './invalid-password';

describe('InvalidPasswordError', () => {
    it('should throw InvalidPasswordError', () => {
        expect(() => {
            throw new InvalidPasswordError();
        }).toThrow(InvalidPasswordError);
    });
});
