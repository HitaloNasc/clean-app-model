import { hash, compare } from 'bcrypt';
import { IUser } from './user-interface';
import { validateName, validateEmail, validatePassword } from '@/domain/helpers';
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../errors';
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

    static async compareHashedPassword(password: string, hashPassword: string): Promise<boolean> {
        return await compare(password, hashPassword);
    }

    static async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }

    static async create(IUser: IUser): Promise<User> {
        const { name, email, password } = IUser;

        if (!validateName(name)) {
            throw new InvalidNameError(name);
        }

        if (!validateEmail(email)) {
            throw new InvalidEmailError(email);
        }

        if (!validatePassword(password)) {
            throw new InvalidPasswordError();
        }

        const hashedPassword = await User.hashPassword(password);

        return new User(name, email, hashedPassword);
    }
}
