import { User } from './user';
import { InvalidEmailError } from './errors';

describe('User email', () => {
    it('should not accept empty email', async () => {
        const sut = {
            name: 'anyname',
            email: '',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept email without @', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept more than 64 characters in email', async () => {
        const localPart = 'c'.repeat(100);
        const email = `${localPart}@mail.com`;
        const sut = {
            name: 'anyname',
            email,
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept empty local part', async () => {
        const sut = {
            name: 'anyname',
            email: '@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept more than 256 characters in local part', async () => {
        const localPart = 'c'.repeat(257);
        const email = `${localPart}@mail.com`;
        const sut = {
            name: 'anyname',
            email,
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept empty domain', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept more than 63 characters in domain', async () => {
        const domain = 'c'.repeat(64);
        const email = `anyemail@${domain}.com`;
        const sut = {
            name: 'anyname',
            email,
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should not accept dot as first char on domain', async () => {
        const email = `anyemail@.domain.com`;
        const sut = {
            name: 'anyname',
            email,
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidEmailError);
        }
    });

    it('should be a valid email', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        const user = await User.create(sut);
        expect(user.email).toBe(sut.email);
    });
});
