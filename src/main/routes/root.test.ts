import request from 'supertest';
import app from '../config/app';

describe('Route root', () => {
    it('should handle GET request', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should handle POST request', async () => {
        const body = { message: 'Hello, world!' };

        const response = await request(app).post('/').send(body);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(body);
    });
});
