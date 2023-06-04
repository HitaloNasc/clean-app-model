import { HttpResponse } from '@/presentation/ports';

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data,
});
