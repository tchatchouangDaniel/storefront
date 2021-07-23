"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardQueries = void 0;
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
const database_1 = __importDefault(require("../database"));
class DashBoardQueries {
    async productsInOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT products.name, products.price, order_products.order_id from products, order_products where products.id = order_products.id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to get product in orders : ${error}`);
        }
    }
    async productsInCart(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select order_products.product_id, products.name, order_products.quantity from order_products, products, orders where order_products.product_id=products.id and orders.user_id=($1) and orders.id = order_products.id';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to see product in cart : ${error}`);
        }
    }
}
exports.DashBoardQueries = DashBoardQueries;
