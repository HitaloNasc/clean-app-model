import request from 'supertest';
import app from '../config/app';

describe('Body parser Middleware', () => {
    it('should parse body as json', async () => {
        await request(app).post('/').send({ name: 'Otavio' }).expect({ name: 'Otavio' });
    });
});
