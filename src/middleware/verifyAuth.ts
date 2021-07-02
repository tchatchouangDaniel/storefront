/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/users'

dotenv.config()

export const verifyAuth = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = _req.headers.authorization
    const token = authorizationHeader?.split(' ')[1] as string
    const secret = process.env.TOKEN_SECRET as string
    const {user}= jwt.verify(token, secret) as {
      user: {
        id: string | number
        username: string
        firstname: string
        lastname: string
        password: string
      }
      // @ts-ignore
    _req.id = user.id
    next()
  } catch (error) {
    res.status(401).send(`Unable to authenticate : ${error}`)
  }
}
