import { validatePassword } from './validate-password';

describe('Validate password', () => {
    it('should not accept empty password', async () => {
        expect(validatePassword('')).toBeDefined();
    });

    it('should not accept less than 8 characters in password', async () => {
        expect(validatePassword('c')).toBeFalsy();
    });

    it('should not accept more than 64 characters in password', async () => {
        const password = 'AAaa12@$'.repeat(65);
        expect(validatePassword(password)).toBeFalsy();
    });

    it('should not accept a password without uppercase letters', async () => {
        expect(validatePassword('aaaa1234@$')).toBeFalsy();
    });

    it('should not accept a password without lowercase letters', async () => {
        expect(validatePassword('AAAA1234@$')).toBeFalsy();
    });

    it('should not accept a password without numbers', async () => {
        expect(validatePassword('AAAAaaaa@$')).toBeFalsy();
    });

    it('should not accept a password without special characters', async () => {
        expect(validatePassword('AAAAaaaa12')).toBeFalsy();
    });

    it('should accept a password', async () => {
        expect(validatePassword('AAAAaaaa1234@$')).toBeTruthy();
    });
});
