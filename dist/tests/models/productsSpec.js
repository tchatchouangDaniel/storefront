"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
const products_1 = require("../../models/products");
const categories_1 = require("../../models/categories");
const store = new products_1.ProductsStore();
const catStore = new categories_1.CategoriesStore();
describe('product model', () => {
    describe('products store methods existence', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have an update method', () => {
            expect(store.update).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
        it('should have a resetTable method', () => {
            expect(store.resetTable).toBeDefined();
        });
    });
    describe('products store methods functionalities', () => {
        it('should create a new product', async () => {
            await catStore.create('shoes');
            const result = await store.create('air jordin', 'go higher with air jordin', 1, 10);
            expect(result).toEqual({
                id: 1,
                name: 'air jordin',
                description: 'go higher with air jordin',
                category_id: 1,
                price: 10,
            });
        });
        it('should show all the product created', async () => {
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'air jordin',
                    description: 'go higher with air jordin',
                    category_id: 1,
                    price: 10,
                },
            ]);
        });
        it('should show product with id 1', async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                name: 'air jordin',
                description: 'go higher with air jordin',
                category_id: 1,
                price: 10,
            });
        });
        it('should update product with id 1 description to "go higher with air jordan"', async () => {
            const result = await store.update(1, null, 'go higher with air jordan', null);
            expect(result).toEqual({
                id: 1,
                name: 'air jordin',
                description: 'go higher with air jordan',
                category_id: 1,
                price: 10,
            });
        });
        it('should update product with id 1 title to "air jordan"', async () => {
            const result = await store.update(1, 'air jordan', null, null);
            expect(result).toEqual({
                id: 1,
                name: 'air jordan',
                description: 'go higher with air jordan',
                category_id: 1,
                price: 10,
            });
        });
        it('should update product with id 1 title to "air nike" and description to "go higher with air nike" and price to be 12', async () => {
            const result = await store.update(1, 'air nike', 'go higher with air nike', 12);
            expect(result).toEqual({
                id: 1,
                name: 'air nike',
                description: 'go higher with air nike',
                category_id: 1,
                price: 12,
            });
        });
        it('should delete product with id 1', async () => {
            // Aslo process id sequence reset to 1 after deletion
            const result = await store.delete(1);
            await store.resetTable();
            await catStore.delete(1);
            await catStore.resetTable();
            expect(result).toEqual({
                id: 1,
                name: 'air nike',
                description: 'go higher with air nike',
                category_id: 1,
                price: 12,
            });
        });
    });
});
