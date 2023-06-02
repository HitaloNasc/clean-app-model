import { IUser } from '@/domain/entities/user';

export interface IRegisterUser {
    execute: (user: IUser) => Promise<void>;
}
