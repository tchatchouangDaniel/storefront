/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { QueryResult } from 'pg'
import Client from '../database'

dotenv.config()
const saltRounds = Number(process.env.SALT_ROUNDS)
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
  id: string | number
  username: string
  firstname: string
  lastname: string
  password: string
}

export class UsersStore {
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

  async create(
    username: string,
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql =
        'insert into users (username,firstname, lastname, password) values($1,$2,$3,$4) returning *'
      const passwordHash = await bcrypt.hash(`${password}${pepper}`, saltRounds)
      const result = await conn.query(sql, [
        username,
        firstname,
        lastname,
        passwordHash,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create user : ${error}`)
    }
  }

  async update(
    id: number | string,
    firstname?: string | null,
    lastname?: string | null,
    newPassword?: string | null
  ): Promise<User> {
    try {
      const conn = await Client.connect()
      let sql: string
      let result: QueryResult<any>
      if (!firstname && !lastname && !newPassword) {
        throw new Error('No parameters provided')
      }
      if (firstname) {
        sql = 'update users set firstname=($1) where id=($2) returning *'
        result = await conn.query(sql, [firstname, id])
      }
      if (lastname) {
        sql = 'update users set lastname=($1) where id=($2) returning *'
        result = await conn.query(sql, [lastname, id])
      }
      if (newPassword) {
        sql = 'update users set password=($1) where id=($2) returning *'
        const passwordHash = await bcrypt.hash(
          `${newPassword}${pepper}`,
          saltRounds
        )
        result = await conn.query(sql, [passwordHash, id])
      }
      conn.release()
      return result!.rows[0]
    } catch (error) {
      throw new Error(`Unable to update a user : ${error}`)
    }
  }

  async login(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect()
    const sql = 'select * from users where username=($1)'
    const result = await conn.query(sql, [username])
    if (result.rows.length) {
      const user = result.rows[0]
      if (await bcrypt.compare(`${password}${pepper}`, user.password))
        return user
    }
    conn.release()
    return null
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

  async resetTable(): Promise<void> {
    try {
      const conn = await Client.connect()
      const sql = 'alter sequence users_id_seq restart with 1'
      await conn.query(sql)
      conn.release()
    } catch (error) {
      throw new Error(`Unable to reset table : ${error}`)
    }
  }
}
