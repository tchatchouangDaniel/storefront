"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("../../server"));
const categories_1 = require("../../models/categories");
dotenv_1.default.config();
const catStore = new categories_1.CategoriesStore();
const request = supertest_1.default(server_1.default);
// eslint-disable-next-line no-unused-vars
let token;
describe('Test endpoints', () => {
    describe('Test category endpoints', () => {
        it('expect [GET] /categories response code to be 200', async () => {
            await catStore.deleteAll();
            const response = await request.get('/categories');
            expect(response.status).toBe(200);
        });
        it('expect [POST] /categories response code to be 200', async () => {
            const response = await request
                .post('/categories')
                .send({ name: 't-shirt' });
            expect(response.status).toBe(200);
        });
    });
    describe('Test users endpoints', () => {
        it('expect [POST] /users response code to be 200', async () => {
            const response = await request.post('/users').send({
                username: 'admin',
                firstname: 'admin',
                lastname: 'admin',
                password: '1234',
            });
            expect(response.status).toBe(200);
        });
        it('expect [POST] /users/login response code to be 200', async () => {
            const response = await request
                .post('/users/login')
                .send({ username: 'admin', password: '1234' });
            token = response.text;
            console.log(token);
            expect(response.status).toBe(200);
        });
        it('expect [GET] /users response code to be 200', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
        it('epxect [GET] /users/1 response code to be 200', async () => {
            const response = await request
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
    describe('Test orders endpoints', () => {
        it('expect [POST] /orders response code to be 200', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                userId: 1,
            });
            expect(response.status).toBe(200);
        });
        it('expect [GET] /orders response code to be 200', async () => {
            const response = await request.get('/orders');
            expect(response.status).toBe(200);
        });
        it('epxect [GET] /orders/1 response code to be 200', async () => {
            const response = await request
                .get('/orders/1')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
    describe('Test product endpoints', () => {
        it('expect [POST] /products response code to be 200', async () => {
            const response = await request
                .post('/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'black T',
                description: 'black',
                categoryId: 1,
                price: 4,
            });
            expect(response.status).toBe(200);
        });
        it('expect [GET] /products response code to be 200', async () => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        });
        it('epxect [GET] /products/1 response code to be 200', async () => {
            const response = await request.get('/products/1');
            expect(response.status).toBe(200);
        });
    });
});
