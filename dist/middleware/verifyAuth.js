"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthId = exports.verifyAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var secret = process.env.TOKEN_SECRET;
var verifyAuth = function (_req, res, next) {
    try {
        var authorizationHeader = _req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var user = jsonwebtoken_1["default"].verify(token, secret).user;
        // @ts-ignore
        _req.userId = user.id;
        // @ts-ignore
        _req.username = user.username;
        next();
    }
    catch (error) {
        res.status(401).send("Unable to authenticate : " + error);
    }
};
exports.verifyAuth = verifyAuth;
var verifyAuthId = function (_req, res, next) {
    try {
        var userId = _req.params.id ? _req.params.id : _req.params.userId;
        if (!userId)
            throw new Error('Missing id parameter');
        var authorizationHeader = _req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var user = jsonwebtoken_1["default"].verify(token, secret).user;
        if (Number(user.id) !== Number(userId))
            throw new Error("No authorization : " + userId + " and " + user.id);
        next();
    }
    catch (error) {
        res.status(401).send("Unable to authenticate : " + error);
    }
};
exports.verifyAuthId = verifyAuthId;
