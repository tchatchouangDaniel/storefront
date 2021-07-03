"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable import/no-mutable-exports */
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var Client;
var ENV = process.env.ENV;
var config = {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    databaseTest: process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_USER_PASSWORD
};
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password
    });
}
else {
    Client = new pg_1.Pool({
        host: config.host,
        database: config.databaseTest,
        user: config.user,
        password: config.password
    });
}
exports["default"] = Client;
