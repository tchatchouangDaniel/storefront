"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
const categories_1 = require("../../models/categories");
const store = new categories_1.CategoriesStore();
describe('categories model', () => {
    describe('categoriesStore method existence', () => {
        fit('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        fit('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        fit('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        fit('should have a upadate method', () => {
            expect(store.update).toBeDefined();
        });
        fit('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
        fit('should have a resetTable method', () => {
            expect(store.resetTable).toBeDefined();
        });
    });
    describe('categoriesStore method functionnalities', () => {
        fit('create category "cloth"', async () => {
            const result = await store.create('cloth');
            expect(result).toEqual({
                id: 1,
                name: 'cloth',
            });
        });
        fit('index should show all the categories', async () => {
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'cloth',
                },
            ]);
        });
        fit('show should show category with id 1', async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                name: 'cloth',
            });
        });
        fit('should update category cloth name to clothes', async () => {
            const result = await store.update(1, 'clothes');
            expect(result).toEqual({
                id: 1,
                name: 'clothes',
            });
        });
        fit('should delete category cloth', async () => {
            const result = await store.delete(1);
            expect(result).toEqual({
                id: 1,
                name: 'clothes',
            });
        });
    });
});
