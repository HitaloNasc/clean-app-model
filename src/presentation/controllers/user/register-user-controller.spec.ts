import { RegisterUserController } from './register-user-controller';
import { RegisterUser } from '@/usecases/register-user';
import { InMemoryUserRepository } from '@/usecases/register-user/in-memory-user-repository';

const inMemoryUserRepository = new InMemoryUserRepository([]);
const registerUser = new RegisterUser(inMemoryUserRepository);
const sut = new RegisterUserController(registerUser);

describe('Register User Controller', () => {
    it('Should not register a new user with a invalid body', async () => {
        const httpRequest = {};

        expect.assertions(1);

        try {
            //@ts-expect-error test invalid body
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should return 400 if no name is provided', async () => {
        const httpRequest = {
            body: {
                password: 'any_password',
                confirmPassword: 'any_password',
                email: '',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should return 400 if no email is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                confirmPassword: 'any_password',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should return 400 if no password is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                confirmPassword: 'any_password',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should return 400 if no confirmPassword is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should return 400 if password and confirmPassword are different', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                confirmPassword: 'anypassword',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error: any) {
            expect(error.statusCode).toBe(412);
        }
    });

    it('Should not create a new user if email is invalid', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email',
                password: 'AAaa1234@$',
                confirmPassword: 'AAaa1234@$',
            },
        };

        expect.assertions(1);

        try {
            await sut.execute(httpRequest);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('Should create a new user', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'AAaa1234@$',
                confirmPassword: 'AAaa1234@$',
            },
        };

        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
    });
});
