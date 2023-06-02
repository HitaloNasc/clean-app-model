import { prisma } from './prisma';
import { PrismaUserRepository } from './prisma-user-repository';
import { STATUS } from '@/domain/entities/user';

describe('Prisma User Repository', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it('should add user', async () => {
        const sut = new PrismaUserRepository();
        await sut.create({
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
            status: STATUS.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        });
        const user = await sut.findByEmail('anyemail@mail.com');
        expect(user).toHaveProperty('id');
        expect(user?.name).toBe('anyname');
        expect(user?.email).toBe('anyemail@mail.com');
        expect(user?.status).toBe(STATUS.ACTIVE);
        expect(user).toHaveProperty('created_at');
        expect(user).toHaveProperty('updated_at');
    });

    it('should find all users', async () => {
        const sut = new PrismaUserRepository();
        await sut.create({
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
            status: STATUS.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        });
        const users = await sut.findAll();
        expect(users).toHaveLength(1);
    });

    it('should find user by id', async () => {
        const sut = new PrismaUserRepository();
        await sut.create({
            name: 'anyname',
            email: 'anyemail@mail.com',
            password: 'AAAAaaaa1234@$',
            status: STATUS.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const userByEmail = await sut.findByEmail('anyemail@mail.com');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user = await sut.findById(userByEmail!.id);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(user?.id).toBe(userByEmail!.id);
        expect(user?.name).toBe('anyname');
        expect(user?.email).toBe('anyemail@mail.com');
        expect(user?.status).toBe(STATUS.ACTIVE);
        expect(user).toHaveProperty('created_at');
        expect(user).toHaveProperty('updated_at');
    });
});
