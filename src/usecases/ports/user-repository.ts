import { IUser } from '@/domain/entities/user';

export interface IUserRepository {
    create: (user: IUser) => Promise<void>;
    findAll: () => Promise<IUser[]>;
    findById: (id: number) => Promise<IUser | null>;
    findByEmail: (email: string) => Promise<IUser | null>;
}
