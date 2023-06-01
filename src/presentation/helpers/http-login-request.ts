type BodyLoginRequest = {
    email: string;
    password: string;
};
export interface HttpLoginRequest {
    body: BodyLoginRequest;
}
