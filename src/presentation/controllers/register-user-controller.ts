import { HttpRequest, HttpResponse } from '@/presentation/ports';
import { ok, badRequest } from '@/presentation/helpers';
import { MissingParamError, PasswordAndConfirmPasswordAreDiferentError } from '@/presentation/errors';
import { IRegisterUser } from '@/usecases/register-user';

export class RegisterUserController {
    private readonly registerUser: IRegisterUser;

    constructor(resgisterUser: IRegisterUser) {
        this.registerUser = resgisterUser;
    }

    private validate(httpRequest: HttpRequest): HttpResponse | undefined {
        const { body } = httpRequest;
        if (!body.name) {
            return badRequest(new MissingParamError('name'));
        }

        if (!body.email) {
            return badRequest(new MissingParamError('email'));
        }

        if (!body.password) {
            return badRequest(new MissingParamError('password'));
        }

        if (!body.confirmPassword) {
            return badRequest(new MissingParamError('confirmPassword'));
        }

        if (body.password !== body.confirmPassword) {
            return badRequest(new PasswordAndConfirmPasswordAreDiferentError());
        }
    }

    public async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const validation = this.validate(httpRequest);

        if (validation) {
            return validation;
        }

        const userData = {
            name: httpRequest.body.name,
            email: httpRequest.body.email,
            password: httpRequest.body.password,
        };

        await this.registerUser.execute(userData);

        return ok({});
    }
}
