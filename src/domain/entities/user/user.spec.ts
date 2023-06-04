import { User } from './user';

describe('User', () => {
    it('should not create a user with a invalid name', async () => {
        expect.assertions(1);

        try {
            await User.create({
                name: '',
                email: 'any_email@mail.com',
                password: 'AAaa12@$',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should not create a user with a invalid email', async () => {
        expect.assertions(1);

        try {
            await User.create({
                name: 'any_name',
                email: '',
                password: 'AAaa12@$',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should not create a user with a invalid password', async () => {
        expect.assertions(1);

        try {
            await User.create({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'AA$',
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should return a user with a encrypted password', async () => {
        const user = await User.create({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'AAaa12@$',
        });

        const compareHashedPassword = await User.compareHashedPassword('AAaa12@$', user.password);
        expect(compareHashedPassword).toBeTruthy();
    });

    it('should be able to create a new user', async () => {
        const user = await User.create({ name: 'any_name', email: 'any_email@mail.com', password: 'AAaa12@$' });
        expect(user).toBeInstanceOf(User);
    });
});
