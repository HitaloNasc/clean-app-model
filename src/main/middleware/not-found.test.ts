import request from 'supertest';
import app from '../config/app';

describe('Not Found Middleware', () => {
    test('should return default content type not found', async () => {
        app.get('/not_found', (req, res) => {
            res.send('');
        });
        const response = await request(app).get('/test_content_type');

        expect(response.status).toBe(404);
    });
});
