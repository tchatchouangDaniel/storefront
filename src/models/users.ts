/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import Client from '../database'

dotenv.config()
const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
  id: string | number
  firstname: string
  lastname: string
  password: string
}

export class UsersStore {
  // TODO: Create update
  // TODO: Create create
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to fetch all the users : ${error}`)
    }
  }

  async show(id: string | number): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from users where id = $(id)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to fetch user : ${error}`)
    }
  }

  async delete(id: string | number): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'delete from users where id=($1) returning *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to delete user : ${error}`)
    }
  }
}
