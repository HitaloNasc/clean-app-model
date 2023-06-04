import { IRegisterUser } from './register-user-interface';
import { IUserRepository } from '../ports';
import { IUser } from '@/domain/entities/user';
import { User } from '@/domain/entities/user/user';
import { Errors } from '@/common';

export class RegisterUser implements IRegisterUser {
    private readonly repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    private async validate(user: IUser): Promise<void> {
        const userAlreadyExists = await this.repository.findByEmail(user.email);
        if (userAlreadyExists) {
            throw Errors.PRECONDITION_FAILED([{ key: 'user_already_exists', data: { email: user.email } }]);
        }
    }

    public async execute(userData: IUser) {
        const userEnity = await User.create(userData);
        await this.validate(userEnity);
        await this.repository.create(userEnity);
    }
}
