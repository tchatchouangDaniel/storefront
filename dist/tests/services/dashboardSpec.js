"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const dashboard_1 = require("../../services/dashboard");
const queries = new dashboard_1.DashBoardQueries();
describe('Dashboard method existence', () => {
    it('should have a productInOrders method', () => {
        expect(queries.productsInOrders).toBeDefined();
    });
    it('should have a product in cart method', () => {
        expect(queries.productsInCart).toBeDefined();
    });
});
