/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Client from '../database'

export type Product = {
  id: string | number
  name: string
  description: string
  // eslint-disable-next-line camelcase
  category_id: string | number
}

export class ProductsStore {
  // TODO: add update
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to fetch all products : ${error}`)
    }
  }

  async show(id: string | number): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from products where id=($id)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to fetch product : ${error}`)
    }
  }

  async create(
    name: string,
    description: string,
    // eslint-disable-next-line camelcase
    category_id: string | number
  ): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql =
        'insert into products(name, description, category_id) values($1,$2,$3) returning *'
      // eslint-disable-next-line camelcase
      const result = await conn.query(sql, [name, description, category_id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create product : ${error}`)
    }
  }

  async delete(id: string | number): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'delete from products where id=($id) returning *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete product`)
    }
  }
}
