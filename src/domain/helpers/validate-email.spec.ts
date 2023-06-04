import { validateEmail } from './validate-email';

describe('Validate email', () => {
    it('should not accept empty email', async () => {
        expect(validateEmail('')).toBeFalsy();
    });

    it('should not accept email without @', async () => {
        expect(validateEmail('anyemail.com')).toBeFalsy();
    });

    it('should not accept more than 64 characters in email', async () => {
        const localPart = 'c'.repeat(100);
        const email = `${localPart}@mail.com`;
        expect(validateEmail(email)).toBeFalsy();
    });

    it('should not accept empty local part', async () => {
        expect(validateEmail('@mail.com')).toBeFalsy();
    });

    it('should not accept more than 256 characters in local part', async () => {
        const localPart = 'c'.repeat(257);
        const email = `${localPart}@mail.com`;
        expect(validateEmail(email)).toBeFalsy();
    });

    it('should not accept empty domain', async () => {
        expect(validateEmail('anyemail@')).toBeFalsy();
    });

    it('should not accept more than 63 characters in domain', async () => {
        const domain = 'c'.repeat(64);
        const email = `anyemail@${domain}.com`;
        expect(validateEmail(email)).toBeFalsy();
    });

    it('should not accept dot as first char on domain', async () => {
        const email = `anyemail@.domain.com`;
        expect(validateEmail(email)).toBeFalsy();
    });

    it('should be a valid email', async () => {
        expect(validateEmail('anyemail@mail.com')).toBeTruthy();
    });
});
