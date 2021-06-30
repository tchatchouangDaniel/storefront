"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersStore = void 0;
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const database_1 = __importDefault(require("../database"));
class OrdersStore {
    // TODO: add Reset
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to fetch all orders : ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from orders where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to fetch order : ${error}`);
        }
    }
    async create(userId, status = 'active') {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into orders(user_id,status) values($1, $2)';
            // eslint-disable-next-line camelcase
            const result = await conn.query(sql, [userId, status]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create order : ${error}`);
        }
    }
    async update(id, status) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'update orders set status=($1) where id=($2) returning *';
            const result = await conn.query(sql, [status, id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update order : ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from orders where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to delete order : ${error}`);
        }
    }
    async addToCart(productId, orderId, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into order_products (quantity,order_id,product_id) values($1,$2,$3)';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to add to cart : ${error}`);
        }
    }
    async RemoveFromCart(productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from order_products where product_id=($1) returing *';
            const result = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to add to cart : ${error}`);
        }
    }
    async updateCart(productId, orderId, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'update order_products set quantity=($1) where product_id=($2) and order_id=($3) returning *';
            const result = await conn.query(sql, [quantity, productId, orderId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update cart : ${error}`);
        }
    }
    async resetTable() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'alter sequence orders_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`Unable to reset Table : ${error}`);
        }
    }
}
exports.OrdersStore = OrdersStore;
