/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
let Client: Pool
const { ENV } = process.env

const config = {
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  databaseTest: process.env.POSTGRES_DB_TEST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_USER_PASSWORD,
}

if (ENV === 'dev') {
  Client = new Pool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
  })
} else {
  Client = new Pool({
    host: config.host,
    database: config.databaseTest,
    user: config.user,
    password: config.password,
  })
}

export default Client
