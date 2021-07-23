"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuth_1 = require("../middleware/verifyAuth");
const dashboard_1 = require("../services/dashboard");
const queries = new dashboard_1.DashBoardQueries();
const productsInOrders = async (_req, res) => {
    try {
        const products = await queries.productsInOrders();
        res.send(products);
    }
    catch (error) {
        res.status(400).send(`Unable to find the products : ${error}`);
    }
};
const productsInCart = async (_req, res) => {
    try {
        const { id } = _req.params;
        const cart = await queries.productsInCart(id);
        res.send(cart);
    }
    catch (error) {
        res.status(400).send(`Unable to show products in cart : ${error}`);
    }
};
const dashboardRoute = (app) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/cart/:id', verifyAuth_1.verifyAuth, productsInCart);
};
exports.default = dashboardRoute;
