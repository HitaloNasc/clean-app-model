import { hash, compare } from 'bcrypt';
import { UserParams } from './user-params';
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from './errors';

export class User {
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    private constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static validateName(name: string): void {
        if (!name || name.trim().length < 2 || name.trim().length > 255) {
            throw new InvalidNameError(name);
        }
    }

    static validateEmail(email: string): void {
        const tester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            throw new InvalidEmailError(email);
        }
        if (email.length > 256) {
            throw new InvalidEmailError(email);
        }
        if (!tester.test(email)) {
            throw new InvalidEmailError(email);
        }
        const [account, address] = email.split('@');
        if (account.length > 64) {
            throw new InvalidEmailError(email);
        }

        const firstCharDomain = address[0];
        if (firstCharDomain === '.') {
            throw new InvalidEmailError(email);
        }

        const domainParts = address.split('.');
        if (
            domainParts.some(function (part) {
                return part.length > 63;
            })
        ) {
            throw new InvalidEmailError(email);
        }
    }

    static validatePassword(password: string): void {
        if (password.length < 8) {
            throw new InvalidPasswordError();
        }

        if (password.length > 64) {
            throw new InvalidPasswordError();
        }

        if (!/[A-Z]/.test(password)) {
            throw new InvalidPasswordError();
        }

        if (!/[a-z]/.test(password)) {
            throw new InvalidPasswordError();
        }

        if (!/[0-9]/.test(password)) {
            throw new InvalidPasswordError();
        }

        if (!/[!@#$%^&*]/.test(password)) {
            throw new InvalidPasswordError();
        }
    }

    static async compareHashedPassword(password: string, hashPassword: string): Promise<boolean> {
        return await compare(password, hashPassword);
    }

    static async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }

    static async create(userParams: UserParams): Promise<User> {
        const { name, email, password } = userParams;

        User.validateName(name);
        User.validateEmail(email);
        User.validatePassword(password);

        const hashedPassword = await User.hashPassword(password);

        return new User(name, email, hashedPassword);
    }
}
