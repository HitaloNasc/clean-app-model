import { RegisterUser } from './register-user';
import { InMemoryUserRepository } from './in-memory-user-repository';
import { IUser } from '@/domain/entities/user';
import { UserAlreadyExistsError } from '../errors';

const users: IUser[] = [{ name: 'any_name', email: 'existingemail@mail.com', password: 'any_password' }];

describe('RgisterUser usecase', () => {
    it('should not register a user with a email then already exist', async () => {
        const userData = {
            name: 'any_name',
            email: 'existingemail@mail.com',
            password: 'AAaaa1234@$',
        };

        const repository = new InMemoryUserRepository(users);
        const sut = new RegisterUser(repository);

        expect.assertions(1);

        try {
            await sut.execute(userData);
        } catch (error) {
            expect(error).toBeInstanceOf(UserAlreadyExistsError);
        }
    });

    it('should register a new user', async () => {
        const userData = {
            name: 'any_name',
            email: 'register_email@mail.com',
            password: 'AAaa12@$',
        };

        const repository = new InMemoryUserRepository(users);
        const sut = new RegisterUser(repository);
        await sut.execute(userData);

        const user = await repository.findByEmail(userData.email);
        expect(user?.email).toBe(userData.email);
    });
});
