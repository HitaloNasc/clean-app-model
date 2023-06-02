import { IUserRepository } from '@/usecases/ports';
import { prisma } from './prisma';
import { IUser } from '@/domain/entities/user';

export class PrismaUserRepository implements IUserRepository {
    public async create(user: IUser): Promise<void> {
        await prisma.user.create({
            data: user,
        });
    }

    public async findAll() {
        return await prisma.user.findMany();
    }

    public async findById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}
