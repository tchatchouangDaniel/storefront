/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { QueryResult } from 'pg'
import Client from '../database'

export type Product = {
  id: string | number
  name: string
  description: string
  // eslint-disable-next-line camelcase
  category_id: string | number
}

export class ProductsStore {
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
      const sql = 'select * from products where id=($1)'
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

  async update(
    id: string | number,
    name?: string | null,
    description?: string | null
  ): Promise<Product> {
    try {
      const conn = await Client.connect()
      let sql: string
      let result: QueryResult<any>
      if (!name && !description) {
        throw new Error('No parameters passed')
      }
      if (name) {
        sql = 'update products set name=($1) where id=($2) returning *'
        result = await conn.query(sql, [name, id])
      }
      if (description) {
        sql = 'update products set description=($1) where id=($2) returning *'
        result = await conn.query(sql, [description, id])
      }
      conn.release()
      return result!.rows[0]
    } catch (error) {
      throw new Error(`Unable to update this products : ${error}`)
    }
  }

  async delete(id: string | number): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'delete from products where id=($1) returning *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete product : ${error}`)
    }
  }

  async resetTable(): Promise<void> {
    try {
      const conn = await Client.connect()
      const sql = 'alter sequence products_id_seq restart with 1'
      await conn.query(sql)
      conn.release()
    } catch (error) {
      throw new Error(`Unable to reset Table : ${error}`)
    }
  }
}
