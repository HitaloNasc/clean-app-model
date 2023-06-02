import { IUser } from '@/domain/entities/user';
import { IUserRepository } from '@/usecases/ports';

export class InMemoryUserRepository implements IUserRepository {
    public users: IUser[];

    constructor(users: IUser[]) {
        this.users = users.map((newUser, index) => ({ id: index + 1, ...newUser }));
    }

    public async create(user: IUser) {
        const id = this.users.length + 1;
        this.users.push({ id, ...user });
    }

    public async findAll() {
        return this.users;
    }

    public async findById(id: number) {
        const user = this.users.find(existUser => existUser.id === id);
        return user ? user : null;
    }
    public async findByEmail(email: string) {
        const user = this.users.find(existUser => existUser.email === email);
        return user ? user : null;
    }
}
