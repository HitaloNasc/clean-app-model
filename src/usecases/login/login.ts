import { Errors } from '@/common';
import { ILogin, ILoginRequest } from './login-interface';
import { IUserRepository } from '../ports';
import { validateEmail, validatePassword } from '@/domain/helpers';
import { STATUS } from '@/domain/entities/user';
import { User } from '@/domain/entities/user';
import { env } from '@/main/config/env';
import jwt from 'jsonwebtoken';

export class Login implements ILogin {
    constructor(private readonly repository: IUserRepository) {}

    private generateToken(password: string) {
        return jwt.sign(password, env.JWT_SECRET);
    }

    public async execute(data: ILoginRequest) {
        const { email, password } = data;

        if (!validateEmail(email)) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_email', data: { email } }]);
        }

        if (!validatePassword(password)) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_password' }]);
        }

        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw Errors.UNAUTHORIZED([{ key: 'user_does_not_exist', data: { email } }]);
        }

        if (user.status === STATUS.INACTIVE) {
            throw Errors.UNAUTHORIZED([{ key: 'user_is_inactive', data: { email } }]);
        }

        const isSamePassword = await User.compareHashedPassword(password, user.password);
        if (!isSamePassword) {
            throw Errors.UNAUTHORIZED([{ key: 'wrong_password' }]);
        }

        const token = this.generateToken(password);

        // TODO save in data base

        return { token };
    }
}
