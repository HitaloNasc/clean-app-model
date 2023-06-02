import { IUser } from '@/domain/entities/user';
import { InMemoryUserRepository } from './in-memory-user-repository';

const users: IUser[] = [{ name: 'any_name', email: 'existingemail@mail.com', password: 'any_password' }];

describe('In memory user repository', () => {
    it('should create a new user', async () => {
        const sut = {
            name: 'create_name',
            email: 'createemail@mail.com',
            password: 'any_password',
        };

        const repository = new InMemoryUserRepository(users);
        await repository.create(sut);
        const user = await repository.findByEmail(sut.email);

        expect(user?.email).toBe(sut.email);
    });

    it('should list all users', async () => {
        const repository = new InMemoryUserRepository(users);
        const allUsers = await repository.findAll();
        expect(allUsers).toHaveLength(1);
    });

    it('should return user by id if user is found', async () => {
        const repository = new InMemoryUserRepository(users);
        const user = await repository.findById(1);
        expect(user?.id).toBe(1);
    });

    it('should return null when user id not exist', async () => {
        const repository = new InMemoryUserRepository(users);
        const user = await repository.findById(999);
        expect(user).toBe(null);
    });

    it('should return user by email if user is found', async () => {
        const repository = new InMemoryUserRepository(users);
        const email = 'existingemail@mail.com';
        const user = await repository.findByEmail(email);
        expect(user?.email).toBe(email);
    });

    it('should return null when user email not exist', async () => {
        const repository = new InMemoryUserRepository(users);
        const user = await repository.findByEmail('random_email@email.email');
        expect(user).toBe(null);
    });
});
