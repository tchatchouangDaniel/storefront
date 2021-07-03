/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Client from '../database'

export type Status = 'active' | 'complete'

export type Order = {
  id: string | number
  // eslint-disable-next-line camelcase
  user_id: string | number
  status: Status
}

export type OrderProduct = {
  id: string | number
  // eslint-disable-next-line camelcase
  product_id: string | number
  // eslint-disable-next-line camelcase
  order_id: string | number
  quantity: string | number
}

export class OrdersStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to fetch all orders : ${error}`)
    }
  }

  async show(id: string | number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from orders where id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to fetch order : ${error}`)
    }
  }

  async showUserOrder(userId: string | number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from orders where user_id=($1)'
      const result = await conn.query(sql, [userId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to fetch user order : ${error}`)
    }
  }

  async create(
    userId: string | number,
    status: Status = 'active'
  ): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql =
        'insert into orders(user_id,status) values($1, $2) returning *'
      // eslint-disable-next-line camelcase
      const result = await conn.query(sql, [userId, status])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create order : ${error}`)
    }
  }

  async update(id: string | number, status: Status): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'update orders set status=($1) where id=($2) returning *'
      const result = await conn.query(sql, [status, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update order : ${error}`)
    }
  }

  async delete(id: string | number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'delete from orders where id=($1) returning *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete order : ${error}`)
    }
  }

  async addToCart(
    productId: string | number,
    orderId: string | number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect()
      const sql =
        'insert into order_products (quantity,order_id,product_id) values($1,$2,$3)'
      const result = await conn.query(sql, [quantity, orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to add to cart : ${error}`)
    }
  }

  async RemoveFromCart(
    orderId: string | number,
    productId: string | number
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect()
      const sql =
        'delete from order_products where order_id=($1) and product_id=($2) returing *'
      const result = await conn.query(sql, [orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to add to cart : ${error}`)
    }
  }

  async updateCart(
    productId: string | number,
    orderId: string | number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect()
      const sql =
        'update order_products set quantity=($1) where product_id=($2) and order_id=($3) returning *'
      const result = await conn.query(sql, [quantity, productId, orderId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update cart : ${error}`)
    }
  }

  async resetTable(): Promise<void> {
    try {
      const conn = await Client.connect()
      const sql = 'alter sequence orders_id_seq restart with 1'
      await conn.query(sql)
      conn.release()
    } catch (error) {
      throw new Error(`Unable to reset Table : ${error}`)
    }
  }
}
