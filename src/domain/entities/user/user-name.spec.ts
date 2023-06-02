import { User } from './user';
import { InvalidNameError } from '../../errors';

describe('User entity - name', () => {
    it('should not accept empty name', async () => {
        const sut = {
            name: '',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidNameError);
        }
    });

    it('should not accept more than 255 characters in name', async () => {
        const sut = {
            name: 'c'.repeat(256),
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidNameError);
        }
    });

    it('should not accept less than 2 characters in name', async () => {
        const sut = {
            name: 'c',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        expect.assertions(1);

        try {
            await User.create(sut);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidNameError);
        }
    });

    it('should be a valid name', async () => {
        const sut = {
            name: 'Any Name',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
        };

        const user = await User.create(sut);
        expect(user.name).toBe(sut.name);
    });
});
