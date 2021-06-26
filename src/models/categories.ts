/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Client from '../database'

export type Category = {
  id: number | string
  name: string
}

export class CategoriesStore {
  // TODO: add reset
  async index(): Promise<Category[]> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from categories'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to fetch all categories : ${error}`)
    }
  }

  async show(id: number | string): Promise<Category> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from categories where id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to fetch category : ${error}`)
    }
  }

  async create(name: string): Promise<Category> {
    try {
      const conn = await Client.connect()
      const sql = 'insert into categories(name) values($1) returning *'
      const result = await conn.query(sql, [name])
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create category : ${error}`)
    }
  }

  async update(id: string | number, name: string): Promise<Category> {
    try {
      const conn = await Client.connect()
      const sql = 'update categories set name=($1) where id=($2) returning *'
      const result = await conn.query(sql, [name, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update category : ${error}`)
    }
  }
}
