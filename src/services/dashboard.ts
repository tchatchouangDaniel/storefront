/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import Client from '../database'

export class DashBoardQueries {
  // TODO: Add tests
  async productsInOrders(): Promise<
    {
      name: string
      price: number
      // eslint-disable-next-line camelcase
      order_id: string | number
    }[]
  > {
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT products.name, products.price, order_products.order_id from products, order_products where products.id = order_products.id'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to get product in orders : ${error}`)
    }
  }

  // TODO: Add tests
  async productsInCart(userId: string | number): Promise<
    {
      // eslint-disable-next-line camelcase
      product_id: string | number
      quantity: number
    }[]
  > {
    try {
      const conn = await Client.connect()
      const sql =
        'select order_products.product_id, products.name, order_products.quantity from order_products, products, orders where order_products.product_id=products.id and orders.user_id=($1) and orders.id = orders_products.id'
      const result = await conn.query(sql, [userId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to see product in cart : ${error}`)
    }
  }
}
