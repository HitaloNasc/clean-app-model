type LoginRequest = {
    email: string;
    password: string;
};

type HttpRequest = {
    body: LoginRequest;
};

type HttpResponse = {
    statusCode: number;
};

class LoginRouter {
    public route(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest || !httpRequest.body) {
            return { statusCode: 500 };
        }

        const { email, password } = httpRequest.body;

        if (!email || !password) {
            return { statusCode: 400 };
        }

        return { statusCode: 200 };
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
