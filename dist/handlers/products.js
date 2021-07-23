"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const products_1 = require("../models/products");
const verifyAuth_1 = require("../middleware/verifyAuth");
const store = new products_1.ProductsStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show all products : ${error}`);
    }
};
const show = async (_req, res) => {
    try {
        const { id } = _req.params;
        const result = await store.show(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show product : ${error}`);
    }
};
const create = async (_req, res) => {
    try {
        const { name, description, categoryId, price } = _req.body;
        if (!name && !description && !categoryId && !price)
            throw new Error('Missing parameter');
        const result = await store.create(name, description, categoryId, price);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to create product : ${error}`);
    }
};
const update = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing id parameter');
        const { name, description, price } = _req.body;
        if (!name && !description && !price)
            throw new Error('Missing parameters');
        const result = await store.update(id, name, description, price);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to update product : ${error}`);
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
        res.status(400).send(`Unable to delete product : ${error}`);
    }
};
const productsRoute = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuth_1.verifyAuth, express_1.default.json(), create);
    app.put('/products/:id', verifyAuth_1.verifyAuth, express_1.default.json(), update);
    app.delete('/products/:id', remove);
};
exports.default = productsRoute;
