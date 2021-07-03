/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { DashBoardQueries } from '../../services/dashboard'

const queries = new DashBoardQueries()

describe('Dashboard method existence', () => {
  it('should have a productInOrders method', () => {
    expect(queries.productsInOrders).toBeDefined()
  })
  it('should have a product in cart method', () => {
    expect(queries.productsInCart).toBeDefined()
  })
})
// TODO: Complete tests
