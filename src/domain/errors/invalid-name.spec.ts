import { InvalidNameError } from './invalid-name';

describe('InvalidNameError', () => {
    it('should throw InvalidNameError', () => {
        expect(() => {
            throw new InvalidNameError('test');
        }).toThrow(InvalidNameError);
    });
});
