import { HttpResponse } from '@/presentation/ports';

export interface IController<T = any> {
    execute: (request: T) => Promise<HttpResponse>;
}
