"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to fetch all products : ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products where id=($id)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to fetch product : ${error}`);
        }
    }
    async create(name, description, 
    // eslint-disable-next-line camelcase
    category_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into products(name, description, category_id) values($1,$2,$3) returning *';
            // eslint-disable-next-line camelcase
            const result = await conn.query(sql, [name, description, category_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create product : ${error}`);
        }
    }
    async update(id, name, description) {
        try {
            const conn = await database_1.default.connect();
            let sql;
            let result;
            if (!name && !description) {
                throw new Error('No parameters passed');
            }
            if (name) {
                sql = 'update products set name=($1) where id=($2) returning *';
                result = await conn.query(sql, [name, id]);
            }
            if (description) {
                sql = 'update products set description=($1) where id=($2) returning *';
                result = await conn.query(sql, [description, id]);
            }
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update this products : ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from products where id=($id) returning *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to delete product`);
        }
    }
    async resetTable() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'alter sequence products_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`Unable to reset Table : ${error}`);
        }
    }
}
exports.ProductsStore = ProductsStore;
