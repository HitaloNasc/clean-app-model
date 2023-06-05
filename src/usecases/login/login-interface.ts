export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface ILogin {
    execute: (data: ILoginRequest) => Promise<ILoginResponse>;
}
