"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const categories_1 = require("../models/categories");
const store = new categories_1.CategoriesStore();
/**
 * Endpoint to show all categories
 * @param _req request
 * @param res response
 */
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to find all categories : ${error}`);
    }
};
/**
 * Endpoint to show a category
 * @param _req request
 * @param res response
 */
const show = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error(`no id provided`);
        const result = await store.show(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to find category : ${error}`);
    }
};
/**
 * Endpoint to create a category
 * @param _req request
 * @param res response
 */
const create = async (_req, res) => {
    try {
        const { name } = _req.body;
        if (!name)
            throw new Error('No parameters provided');
        const result = await store.create(name);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to create category : ${error}`);
    }
};
/**
 * Endpoint to update a category
 * @param _req request
 * @param res response
 */
const update = async (_req, res) => {
    try {
        const { id } = _req.body;
        const { name } = _req.body;
        if (!id || !name)
            throw new Error('Missing parameters');
        const result = await store.update(id, name);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to update category : ${error}`);
    }
};
/**
 * Endpoint to delete a category
 * @param _req request
 * @param res response
 */
const remove = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing parameters');
        const result = await store.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to remove category : ${error}`);
    }
};
const categoriesRoute = (app) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', express_1.default.json(), create);
    app.put('/categories/:id', express_1.default.json(), update);
    app.delete('/categories/:id', remove);
};
exports.default = categoriesRoute;
