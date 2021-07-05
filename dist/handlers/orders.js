"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var express_1 = __importDefault(require("express"));
var orders_1 = require("../models/orders");
var verifyAuth_1 = require("../middleware/verifyAuth");
var store = new orders_1.OrdersStore();
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // eslint-disable-next-line no-console
                _b = (_a = console).log;
                return [4 /*yield*/, store.showUserOrder(1)];
            case 1:
                // eslint-disable-next-line no-console
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
test();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send("Unable to show all orders : " + error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = _req.params.id;
                return [4 /*yield*/, store.show(id)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send("Unable to show order : " + error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showUserOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = _req.params.userId;
                return [4 /*yield*/, store.showUserOrder(userId)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).send("Unable to show order : " + error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = _req.body.userId;
                if (!userId)
                    throw new Error('Missing parameter');
                return [4 /*yield*/, store.create(userId)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).send("Unable to create order : " + error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addToCart = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, id, _a, productId, quantity, result, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                username = _req.username;
                if (!username)
                    throw new Error('Missing username parameter');
                id = _req.params.id;
                if (!id)
                    throw new Error('Missing id parameter');
                _a = _req.body, productId = _a.productId, quantity = _a.quantity;
                if (!productId || !quantity)
                    throw new Error('Missing parameter(s)');
                return [4 /*yield*/, store.addToCart(username, productId, id, Number(quantity))];
            case 1:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(400).send("Unable to add to cart : " + error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateCart = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productid, orderid, quantity, result, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.params, productid = _a.productid, orderid = _a.orderid;
                quantity = _req.body.quantity;
                if (!productid || !orderid || quantity)
                    throw new Error('Missing parameters');
                return [4 /*yield*/, store.updateCart(productid, orderid, quantity)];
            case 1:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                res.status(400).send("Unable to update items in cart : " + error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var removeFromCart = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderid, productid, result, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.params, orderid = _a.orderid, productid = _a.productid;
                if (!orderid || !productid)
                    throw new Error('Missing parameters');
                return [4 /*yield*/, store.RemoveFromCart(orderid, productid)];
            case 1:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                res.status(400).send("Unable to remove product from cart : " + error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var remove = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = _req.params.id;
                if (!id)
                    throw new Error('Missing id parameter');
                return [4 /*yield*/, store["delete"](id)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(400).send("Unable to delete order : " + error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ordersRoute = function (app) {
    app.get('/orders', index);
    app.get('/orders/:id', verifyAuth_1.verifyAuth, show);
    app.get('/orders/:userId', verifyAuth_1.verifyAuth, showUserOrder);
    app.post('/orders', verifyAuth_1.verifyAuth, express_1["default"].json(), create);
    app.post('/orders/:id/products', express_1["default"].json(), verifyAuth_1.verifyAuth, addToCart);
    app.put('/orders/:orderid/products/:productid', express_1["default"].json(), verifyAuth_1.verifyAuth, updateCart);
    app["delete"]('/orders/:orderid/products/:productid', verifyAuth_1.verifyAuth, removeFromCart);
    app["delete"]('/orders/:id', verifyAuth_1.verifyAuth, remove);
};
exports["default"] = ordersRoute;
