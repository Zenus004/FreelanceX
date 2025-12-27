require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/freelancex_test');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'client'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('accessToken');
    });

    it('should login a user', async () => {
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
    });
});
