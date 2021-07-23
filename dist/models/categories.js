"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesStore = void 0;
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const database_1 = __importDefault(require("../database"));
class CategoriesStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from categories';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to fetch all categories : ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from categories where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to fetch category : ${error}`);
        }
    }
    async create(name) {
        try {
            // const sqlId = 'Select max(id) from categories'
            const conn = await database_1.default.connect();
            // const maxIdResult = await conn.query(sqlId)
            // const maxId = maxIdResult.rows[0].max
            // const newId = maxId ? maxId + 1 : 1
            const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [name]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create category : ${error}`);
        }
    }
    async update(id, name) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'update categories set name=($1) where id=($2) returning *';
            const result = await conn.query(sql, [name, id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update category : ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from categories where id=($1) returning *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update : ${error}`);
        }
    }
    async deleteAll() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from categories';
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`Unable to update : ${error}`);
        }
    }
    async resetTable() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'alter sequence categories_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`Unable to reset Table : ${error}`);
        }
    }
}
exports.CategoriesStore = CategoriesStore;
