"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthId = exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
const verifyAuth = (_req, res, next) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const { user } = jsonwebtoken_1.default.verify(token, secret);
        // @ts-ignore
        _req.userId = user.id;
        // @ts-ignore
        _req.username = user.username;
        next();
    }
    catch (error) {
        res.status(401).send(`Unable to authenticate : ${error}`);
    }
};
exports.verifyAuth = verifyAuth;
const verifyAuthId = (_req, res, next) => {
    try {
        const userId = _req.params.id ? _req.params.id : _req.params.userId;
        if (!userId)
            throw new Error('Missing id parameter');
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const { user } = jsonwebtoken_1.default.verify(token, secret);
        if (Number(user.id) !== Number(userId))
            throw new Error(`No authorization : ${userId} and ${user.id}`);
        next();
    }
    catch (error) {
        res.status(401).send(`Unable to authenticate : ${error}`);
    }
};
exports.verifyAuthId = verifyAuthId;
