export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    status?: number | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}
