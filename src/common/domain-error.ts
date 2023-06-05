export class HttpException extends Error {
    name: string;
    statusCode?: number;
    status?: number;
    title: string | undefined;
    errors: string | object[] | null;

    constructor(statusCode: number, errors?: string | object[] | null, title?: string) {
        super(title);
        this.name = 'HttpException';
        this.statusCode = statusCode;
        this.errors = errors || null;
        this.title = title;
    }
}

type IErr = {
    key: string;
    data?: object;
};

export const Errors = {
    UNAUTHORIZED: (err: IErr[]) => new HttpException(401, err, 'unauthorized'),
    FORBIDDEN: () => new HttpException(403, null, 'forbidden'),
    NOT_FOUND: (err: IErr[]) => new HttpException(404, err, 'not_found'),
    PRECONDITION_FAILED: (err: IErr[]) => new HttpException(412, err, 'precondition_failed'),
    INTERNAL_SERVER_ERROR: () => new HttpException(500, null, 'internal_server_error'),
};
