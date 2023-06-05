import { InMemoryUserRepository } from '../register-user/in-memory-user-repository';
import { STATUS } from '@/domain/entities/user';
import jwt from 'jsonwebtoken';
import { env } from '@/main/config/env';
import { Login } from './login';

const existsUserTest = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '$2a$10$r8LyTeEJlkRLbgTGWSHs8eUWGVlJ4imu9zzjJhd.gznIoXRzeFKtm',
    status: STATUS.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
};

describe('Login usecase', () => {
    it('should not generate a token for an user without email', async () => {
        const loginData = {
            email: '',
            password: 'AAaa12@$',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should not generate a token for an invalid email', async () => {
        const loginData = {
            email: 'any_email',
            password: 'AAaa12@$',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should not generate a token for an user without password', async () => {
        const loginData = {
            email: 'any_email@mail.com',
            password: '',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should not generate a token for an not resgisted user', async () => {
        const loginData = {
            email: 'not_exists_user@mail.com',
            password: 'AAaa12@$',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([existsUserTest]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(401);
        }
    });

    it('should not generate a token for an inactive user', async () => {
        const loginData = {
            email: existsUserTest.email,
            password: 'AAaa12@$',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([{ ...existsUserTest, status: STATUS.INACTIVE }]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(401);
        }
    });

    it('should not generate a token for a wrong password', async () => {
        const loginData = {
            email: existsUserTest.email,
            password: '12@$AAaa',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([existsUserTest]);
        const sut = new Login(inMemoryUserRepository);

        expect.assertions(1);

        try {
            await sut.execute(loginData);
        } catch (error: any) {
            expect(error.statusCode).toBe(401);
        }
    });

    it('should generate a token for a valid user', async () => {
        const loginData = {
            email: existsUserTest.email,
            password: 'AAaa12@$',
        };

        const inMemoryUserRepository = new InMemoryUserRepository([existsUserTest]);
        const sut = new Login(inMemoryUserRepository);

        const response = await sut.execute(loginData);

        expect(response.token).toBeTruthy();
        expect(jwt.verify(response.token, env.JWT_SECRET)).toBeTruthy();
    });
});
