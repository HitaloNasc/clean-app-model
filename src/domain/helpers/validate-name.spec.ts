import { validateName } from './validate-name';

describe('Validate name', () => {
    it('should not accept empty name', async () => {
        expect(validateName('')).toBeFalsy();
    });

    it('should not accept less than 2 characters in name', async () => {
        expect(validateName('c')).toBeFalsy();
    });

    it('should not accept more than 255 characters in name', async () => {
        const name = 'c'.repeat(256);
        expect(validateName(name)).toBeFalsy();
    });

    it('should be a valid name', async () => {
        expect(validateName('any_name')).toBeTruthy();
    });
});
