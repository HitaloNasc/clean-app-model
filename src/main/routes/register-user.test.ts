import request from 'supertest';
import { prisma } from '@/external/repositories/prisma';
import app from '@/main/config/app';
import { IUser } from '@/domain/entities/user';
import { User } from '@/domain/entities/user';
import { PrismaUserRepository } from '@/external/repositories/prisma';
import { HttpResponse } from '@/presentation/ports';

const registerUser = async (user: IUser): Promise<HttpResponse> => {
    return await request(app).post('/user/register').send(user);
};

describe('Register User Routes', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it('should return 400 when register user with a invalid name', async () => {
        const user = {
            name: 'a',
            email: 'any_emailmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@$',
        };

        const response = await registerUser(user);

        expect(response.statusCode).toBe(412);
    }, 5000);

    it('should return 400 when register user with a invalid email', async () => {
        const user = {
            name: 'any_name',
            email: 'any_emailmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@$',
        };

        const response = await registerUser(user);

        expect(response.statusCode).toBe(412);
    }, 5000);

    it('should return 400 when register user with a invalid password', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'AAaa1200',
            confirmPassword: 'AAaa1200',
        };

        const response = await registerUser(user);

        expect(response.statusCode).toBe(412);
    }, 5000);

    it('should return 400 when register user with diferents passwords', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@)',
        };

        const response = await registerUser(user);

        expect(response.statusCode).toBe(412);
    }, 5000);

    it('should return false when test ecripted password after register user', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@$',
        };

        const response = await registerUser(user);
        const isSamePassword = await User.compareHashedPassword(user.password, undefined);

        expect(response.statusCode).toBe(200);
        expect(isSamePassword).toBeFalsy();
    }, 5000);

    it('should ecripted password when register user', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@$',
        };

        const response = await registerUser(user);
        const repository = new PrismaUserRepository();
        const userFound = await repository.findByEmail(user.email);
        const isSamePassword = await User.compareHashedPassword(user.password, userFound?.password);

        expect(response.statusCode).toBe(200);
        expect(isSamePassword).toBeTruthy();
    }, 5000);

    it('should return 200 when register user', async () => {
        const user = {
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'AAaa12@$',
            confirmPassword: 'AAaa12@$',
        };

        const response = await registerUser(user);

        expect(response.statusCode).toBe(200);
    }, 5000);
});
