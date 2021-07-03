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
var products_1 = require("../models/products");
var verifyAuth_1 = require("../middleware/verifyAuth");
var store = new products_1.ProductsStore();
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
                res.status(400).send("Unable to show all products : " + error_1);
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
                res.status(400).send("Unable to show product : " + error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, categoryId, price, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.body, name_1 = _a.name, description = _a.description, categoryId = _a.categoryId, price = _a.price;
                if (!name_1 && !description && !categoryId && !price)
                    throw new Error('Missing parameter');
                return [4 /*yield*/, store.create(name_1, description, categoryId, price)];
            case 1:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(400).send("Unable to create product : " + error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, description, price, result, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = _req.params.id;
                if (!id)
                    throw new Error('Missing id parameter');
                _a = _req.body, name_2 = _a.name, description = _a.description, price = _a.price;
                if (!name_2 && !description && !price)
                    throw new Error('Missing parameters');
                return [4 /*yield*/, store.update(id, name_2, description, price)];
            case 1:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(400).send("Unable to update product : " + error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var remove = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_5;
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
                error_5 = _a.sent();
                res.status(400).send("Unable to delete product : " + error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var productsRoute = function (app) {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuth_1.verifyAuth, express_1["default"].json(), create);
    app.put('/products/:id', verifyAuth_1.verifyAuth, express_1["default"].json(), update);
    app["delete"]('/products/:id', remove);
};
exports["default"] = productsRoute;
