import { IUser } from '@/entities/user';

export interface IRegisterUser {
    execute: (user: IUser) => Promise<void>;
}
