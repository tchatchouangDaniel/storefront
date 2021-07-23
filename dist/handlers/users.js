"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../models/users");
const verifyAuth_1 = require("../middleware/verifyAuth");
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
const store = new users_1.UsersStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show all users : ${error}`);
    }
};
const show = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing id parameter');
        const result = await store.show(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to show user : ${error}`);
    }
};
const create = async (_req, res) => {
    try {
        const { username, firstname, lastname, password } = _req.body;
        if (!username || !firstname || !lastname || !password)
            throw new Error('Unable to create a new user');
        const result = await store.create(username, firstname, lastname, password);
        const token = jsonwebtoken_1.default.sign({ user: result }, secret);
        res.send(token);
    }
    catch (error) {
        res.status(400).send(`Unable to show user : ${error}`);
    }
};
const update = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Missing id parameter');
        const { firstname, lastname, newpassword } = _req.body;
        if (!firstname && !lastname && !newpassword)
            throw new Error('Missing parameter(s)');
        const result = await store.update(firstname, lastname, newpassword);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to update user infos : ${error}`);
    }
};
const remove = async (_req, res) => {
    try {
        const { id } = _req.params;
        if (!id)
            throw new Error('Unable to delete user');
        const result = await store.delete(id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(`Unable to delete user : ${error}`);
    }
};
const login = async (_req, res) => {
    try {
        const { username, password } = _req.body;
        if (!username || !password)
            throw new Error('Missing parameter(s)');
        const result = await store.login(username, password);
        if (!result)
            throw new Error('wrong username or password');
        const token = jsonwebtoken_1.default.sign({ user: result }, secret);
        res.send(token);
    }
    catch (error) {
        res.status(400).send(`Unable to authenticate : ${error}`);
    }
};
const usersRoute = (app) => {
    app.get('/users', verifyAuth_1.verifyAuth, index);
    app.get('/users/:id', verifyAuth_1.verifyAuthId, show);
    app.post('/users', express_1.default.json(), create);
    app.post('/users/login', express_1.default.json(), login);
    app.put('/users/:id', express_1.default.json(), verifyAuth_1.verifyAuthId, update);
    app.delete('/users/:id', express_1.default.json(), verifyAuth_1.verifyAuthId, remove);
};
exports.default = usersRoute;
