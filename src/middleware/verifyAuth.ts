/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/users'

dotenv.config()
const secret = process.env.TOKEN_SECRET as string

export const verifyAuth = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = _req.headers.authorization
    const token = authorizationHeader?.split(' ')[1] as string
    const { user } = jwt.verify(token, secret) as { user: User }
    // @ts-ignore
    _req.id = user.id
    next()
  } catch (error) {
    res.status(401).send(`Unable to authenticate : ${error}`)
  }
}

export const verifyAuthId = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = _req.params.id
    if (!userId) throw new Error('Missing id parameter')
    const authorizationHeader = _req.headers.authorization
    const token = authorizationHeader?.split(' ')[1] as string
    const { user } = jwt.verify(token, secret) as { user: User }
    if (user.id !== userId) throw new Error('No Authorization')
    next()
  } catch (error) {
    res.status(401).send(`Unable to authenticate : ${error}`)
  }
}
