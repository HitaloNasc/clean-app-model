import { RegisterUserController } from './register-user-controller';
import { RegisterUser } from '@/usecases/register-user';
import { InMemoryUserRepository } from '@/usecases/register-user/in-memory-user-repository';
import { MissingParamError, PasswordAndConfirmPasswordAreDiferentError } from '@/presentation/errors';
import { InvalidEmailError } from '@/domain/errors';

const inMemoryUserRepository = new InMemoryUserRepository([]);
const registerUser = new RegisterUser(inMemoryUserRepository);
const sut = new RegisterUserController(registerUser);

describe('Register User Controller', () => {
    it('Should return 400 if no name is provided', async () => {
        const httpRequest = {
            body: {
                password: 'any_password',
                confirmPassword: 'any_password',
                email: '',
            },
        };

        const httpResponse = await sut.execute(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name').message);
    });

    it('Should return 400 if no email is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                confirmPassword: 'any_password',
            },
        };
        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email').message);
    });

    it('Should return 400 if no password is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                confirmPassword: 'any_password',
            },
        };
        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password').message);
    });

    it('Should return 400 if no confirmPassword is provided', async () => {
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword').message);
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
        const httpResponse = await sut.execute(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new PasswordAndConfirmPasswordAreDiferentError().message);
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
            expect(error).toBeInstanceOf(InvalidEmailError);
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
