type LoginRequest = {
    email: string;
    password: string;
};

type HttpRequest = {
    body: LoginRequest;
};

class HttpResponse {
    static badRequest(paramName: string) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName),
        };
    }

    static serverError() {
        return {
            statusCode: 500,
            body: {},
        };
    }

    static ok() {
        return {
            statusCode: 200,
            body: {},
        };
    }
}

class MissingParamError extends Error {
    constructor(private paramName: string) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }
}

class LoginRouter {
    public route(httpRequest: HttpRequest) {
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

describe('Login Router', () => {
    it('Should return 400 if no email is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                password: 'any_password',
                email: '',
            },
        };

        const httpResponse = sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    it('Should return 400 if no password is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                password: '',
                email: 'any_email@mail.com',
            },
        };

        const httpResponse = sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
    });

    it('Should return 500 if no httpRequest is provided', async () => {
        const sut = new LoginRouter();
        // @ts-expect-error test if no httpRequest is provided
        const httpResponse = sut.route();
        expect(httpResponse.statusCode).toBe(500);
    });

    it('Should return 500 if no httpRequest has no body', async () => {
        const sut = new LoginRouter();
        // @ts-expect-error test if no httpRequest has no body
        const httpResponse = sut.route({});
        expect(httpResponse.statusCode).toBe(500);
    });
});
