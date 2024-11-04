
import request from 'supertest';
import { server } from '../server'; 

describe('Filter Controller Tests', () => {
    
    afterAll(async () => {
        server.close(); 
    });

    test('should upload an image successfully', async () => {
        const response = await request(server)
            .post('/api/images/upload') 
            .attach('image', 'src/__tests__/t.jpg');  

        expect(response.status).toBe(200);  
        expect(response.body.message).toBe('Image uploaded successfully!'); // التأكد من الرسالة
        expect(response.body.url).toMatch(/^https?:\/\/.+/)
    });

    test('should return error for unsupported image format', async () => {
        const response = await request(server)
            .post('/api/images/upload/d')
            .attach('image', 'src/__tests__/t.jpg'); 

        expect(response.status).toBe(404); 
        expect(response.body.error).toBeUndefined(); 
    });
});
