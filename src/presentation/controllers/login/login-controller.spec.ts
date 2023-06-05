import { InMemoryUserRepository } from '@/usecases/register-user/in-memory-user-repository';
import { STATUS } from '@/domain/entities/user';
import { Login } from '@/usecases/login';
import { LoginController } from './login-controller';

const existsUserTest = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '$2a$10$r8LyTeEJlkRLbgTGWSHs8eUWGVlJ4imu9zzjJhd.gznIoXRzeFKtm',
    status: STATUS.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
};

const inMemoryUserRepository = new InMemoryUserRepository([existsUserTest]);
const login = new Login(inMemoryUserRepository);
const sut = new LoginController(login);

describe('Login controller', () => {
    it('should not generate a token with a invalid body', async () => {
        const httpRequest = {};

        expect.assertions(1);

        try {
            // @ts-expect-error validate body
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should return 412 if no email is provided', async () => {
        const httpRequest = {
            body: {
                password: 'AAaa12@$',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should return 412 if no password is provided', async () => {
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('should generate a token', async () => {
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'AAaa12@$',
            },
        };

        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
    });
});
