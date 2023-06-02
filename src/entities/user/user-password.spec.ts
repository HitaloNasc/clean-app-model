import { User } from './user';
import { InvalidPasswordError } from './errors';

describe('User password', () => {
    it('should not accept empty password', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: '',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept more than 64 characters in password', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'c'.repeat(65),
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept less than 8 characters in password', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'c',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept a password without uppercase letters', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'aaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept a password without lowercase letters', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAA1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept a password without numbers', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should not accept a password without special characters', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa12',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    });

    it('should accept a password', async () => {
        const sut = {
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        const user = await User.create(sut);
        const comparedPassword = await User.compareHashedPassword(sut.password, user.password);
        expect(comparedPassword).toBe(true);
    });
});
