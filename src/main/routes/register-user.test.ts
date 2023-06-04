import request from 'supertest';
import { prisma } from '@/external/repositories/prisma';
import app from '@/main/config/app';
import { IUser } from '@/domain/entities/user';
import { HttpResponse } from '@/presentation/ports';

const registerUser = async (user: IUser): Promise<HttpResponse> => {
    return await request(app).post('/user').send(user);
};

describe('Register User Routes', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    test('should return 200 when register user', async () => {
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
