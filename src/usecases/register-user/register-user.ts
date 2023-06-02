import { IRegisterUser } from './register-user-interface';
import { IUserRepository } from '../ports';
import { IUser } from '@/entities/user';
import { User } from '@/entities/user/user';
import { UserAlreadyExistsError } from '../errors/user-already-exists';

export class RegisterUser implements IRegisterUser {
    private readonly repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    private async validate(user: IUser): Promise<void> {
        const userAlreadyExists = await this.repository.findByEmail(user.email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(user.email);
        }
    }

    public async execute(userData: IUser) {
        const userEnity = await User.create(userData);
        await this.validate(userEnity);
        await this.repository.create(userEnity);
    }
}
