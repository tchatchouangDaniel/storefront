/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Client from '../database'

export type Category = {
  id: number | string
  name: string
}

export class CategoriesStore {
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
      const sqlId = 'Select max(id) from categories'
      const conn = await Client.connect()
      const maxIdResult = await conn.query(sqlId)
      const maxId = maxIdResult.rows[0].max
      const newId = maxId ? maxId + 1 : 1
      const sql = 'INSERT INTO categories (id,name) VALUES($1,$2) RETURNING *'
      const result = await conn.query(sql, [newId, name])
      conn.release()
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

  async delete(id: string | number): Promise<Category> {
    try {
      const conn = await Client.connect()
      const sql = 'delete from categories where id=($1) returning *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to update : ${error}`)
    }
  }

  async resetTable(): Promise<void> {
    try {
      const conn = await Client.connect()
      const sql = 'alter sequence categories_id_seq restart with 1'
      await conn.query(sql)
      conn.release()
    } catch (error) {
      throw new Error(`Unable to reset Table : ${error}`)
    }
  }
}
