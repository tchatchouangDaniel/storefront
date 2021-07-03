"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var categories_1 = __importDefault(require("./handlers/categories"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var app = express_1["default"]();
var address = '0.0.0.0:3000';
app.use(morgan_1["default"]('dev'));
app.use(helmet_1["default"]());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
categories_1["default"](app);
orders_1["default"](app);
products_1["default"](app);
users_1["default"](app);
dashboard_1["default"](app);
app.listen(3000, function () {
    // eslint-disable-next-line no-console
    console.log("starting app on: " + address);
});
