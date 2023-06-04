import { hash, compare } from 'bcrypt';
import { IUser } from './user-interface';
import { validateName, validateEmail, validatePassword } from '@/domain/helpers';
import { Errors } from '@/common';
import { STATUS } from './consts';

export class User {
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly status: number;
    public readonly created_at: Date;
    public readonly updated_at: Date;

    private constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = STATUS.ACTIVE;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    static async compareHashedPassword(password: string, hashPassword: string | undefined): Promise<boolean> {
        if (!password || !hashPassword) {
            return false;
        }
        return await compare(password, hashPassword);
    }

    static async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }

    static async create(IUser: IUser): Promise<User> {
        const { name, email, password } = IUser;

        if (!validateName(name)) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_name', data: { name } }]);
        }

        if (!validateEmail(email)) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_email', data: { email } }]);
        }

        if (!validatePassword(password)) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_password' }]);
        }

        const hashedPassword = await User.hashPassword(password);

        return new User(name, email, hashedPassword);
    }
}
