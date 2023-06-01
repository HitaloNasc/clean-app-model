import { MissingParamError } from './missing-param-error';

export class HttpResponse {
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
