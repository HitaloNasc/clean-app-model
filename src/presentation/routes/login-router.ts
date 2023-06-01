import { HttpResponse } from '../helpers/http-response';
import { HttpLoginRequest } from '../helpers/http-login-request';

export class LoginRouter {
    public route(httpRequest: HttpLoginRequest) {
        if (!httpRequest || !httpRequest.body) {
            return HttpResponse.serverError();
        }

        const { email, password } = httpRequest.body;
        if (!email) {
            return HttpResponse.badRequest('email');
        }
        if (!password) {
            return HttpResponse.badRequest('password');
        }

        return HttpResponse.ok();
    }
}
