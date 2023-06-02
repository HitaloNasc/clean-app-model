export class PasswordAndConfirmPasswordAreDiferentError extends Error {
    constructor() {
        super(`Password and confirmPassword are diferent`);
        this.name = 'PasswordAndConfirmPasswordAreDiferentError';
    }
}
