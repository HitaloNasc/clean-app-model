export class UserAlreadyExistsError extends Error {
    constructor(email: string) {
        super(`User already exist with email: ${email}`);
        this.name = 'UserAlreadyExistsError';
    }
}
