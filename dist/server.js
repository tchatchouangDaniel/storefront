"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const categories_1 = __importDefault(require("./handlers/categories"));
const orders_1 = __importDefault(require("./handlers/orders"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const app = express_1.default();
const address = '0.0.0.0:3000';
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
categories_1.default(app);
orders_1.default(app);
products_1.default(app);
users_1.default(app);
dashboard_1.default(app);
exports.default = app;
app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`starting app on: ${address}`);
});
