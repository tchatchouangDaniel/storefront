"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const orders_1 = require("../models/orders");
const verifyAuth_1 = require("../middleware/verifyAuth");
const store = new orders_1.OrdersStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show all orders : ${error}`);
    }
};
const show = async (_req, res) => {
    try {
        const { id } = _req.params;
        const result = await store.show(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show order : ${error}`);
    }
};
const showUserOrder = async (_req, res) => {
    try {
        const { userId } = _req.params;
        const result = await store.showUserOrder(userId);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show order : ${error}`);
    }
};
const create = async (_req, res) => {
    try {
        const { userId } = _req.body;
        if (!userId)
            throw new Error('Missing parameter');
        const result = await store.create(userId);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to create order : ${error}`);
    }
};
const addToCart = async (_req, res) => {
    try {
        // @ts-ignore
        const { username } = _req;
        if (!username)
            throw new Error('Missing username parameter');
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing id parameter');
        const { productId, quantity } = _req.body;
        if (!productId || !quantity)
            throw new Error('Missing parameter(s)');
        const result = await store.addToCart(username, productId, id, Number(quantity));
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to add to cart : ${error}`);
    }
};
const updateCart = async (_req, res) => {
    try {
        const { productid, orderid } = _req.params;
        const { quantity } = _req.body;
        if (!productid || !orderid || quantity)
            throw new Error('Missing parameters');
        const result = await store.updateCart(productid, orderid, quantity);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to update items in cart : ${error}`);
    }
};
const removeFromCart = async (_req, res) => {
    try {
        const { orderid, productid } = _req.params;
        if (!orderid || !productid)
            throw new Error('Missing parameters');
        const result = await store.RemoveFromCart(orderid, productid);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to remove product from cart : ${error}`);
    }
};
const remove = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing id parameter');
        const result = await store.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to delete order : ${error}`);
    }
};
const ordersRoute = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', verifyAuth_1.verifyAuth, show);
    app.get('/orders/:userId', verifyAuth_1.verifyAuth, showUserOrder);
    app.post('/orders', verifyAuth_1.verifyAuth, express_1.default.json(), create);
    app.post('/orders/:id/products', express_1.default.json(), verifyAuth_1.verifyAuth, addToCart);
    app.put('/orders/:orderid/products/:productid', express_1.default.json(), verifyAuth_1.verifyAuth, updateCart);
    app.delete('/orders/:orderid/products/:productid', verifyAuth_1.verifyAuth, removeFromCart);
    app.delete('/orders/:id', verifyAuth_1.verifyAuth, remove);
};
exports.default = ordersRoute;
