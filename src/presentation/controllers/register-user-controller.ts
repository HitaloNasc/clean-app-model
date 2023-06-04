import { HttpRequest, HttpResponse } from '@/presentation/ports';
import { IController } from '@/presentation/helpers';
import { ok } from '@/presentation/helpers';
import { IRegisterUser } from '@/usecases/register-user';
import { Logger } from '@/main/helpers';
import { Errors } from '@/common';

export class RegisterUserController implements IController {
    private readonly registerUser: IRegisterUser;

    constructor(resgisterUser: IRegisterUser) {
        this.registerUser = resgisterUser;
    }

    private validate(httpRequest: HttpRequest): void {
        const { body } = httpRequest;

        if (!body) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_body' }]);
        }

        const obrigatory = ['name', 'email', 'password', 'confirmPassword'] as const;

        obrigatory.forEach(key => {
            if (!body[key]) {
                throw Errors.PRECONDITION_FAILED([{ key: 'user_controller_obrigatory_param_is_missing', data: { key } }]);
            }
        });

        if (body.password !== body.confirmPassword) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_password' }]);
        }
    }

    public async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        Logger.log('controllers - registerUserController - execute');
        Logger.dir({ httpRequest });

        this.validate(httpRequest);

        const userData = {
            name: httpRequest.body.name,
            email: httpRequest.body.email,
            password: httpRequest.body.password,
        };

        await this.registerUser.execute(userData);

        return ok({});
    }
}
