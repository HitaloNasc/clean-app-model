import { HttpRequest, HttpResponse } from '@/presentation/ports';
import { IController } from '@/presentation/helpers';
import { ILogin } from '@/usecases/login';
import { Logger } from '@/main/helpers';
import { Errors } from '@/common';
import { ok } from '@/presentation/helpers';

export class LoginController implements IController {
    constructor(private readonly login: ILogin) {}

    private validate(httpRequest: HttpRequest): void {
        const { body } = httpRequest;

        if (!body) {
            throw Errors.PRECONDITION_FAILED([{ key: 'invalid_body' }]);
        }

        const obrigatory = ['email', 'password'] as const;

        obrigatory.forEach(key => {
            if (!body[key]) {
                throw Errors.PRECONDITION_FAILED([{ key: 'obrigatory_param_is_missing', data: { key } }]);
            }
        });
    }

    public async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        Logger.log('controllers - loginController - execute');
        Logger.dir({ httpRequest });

        this.validate(httpRequest);

        const loginData = {
            email: httpRequest.body.email,
            password: httpRequest.body.password,
        };

        const response = await this.login.execute(loginData);

        return ok(response);
    }
}
