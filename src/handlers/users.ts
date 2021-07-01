/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { UsersStore } from '../models/users'

const store = new UsersStore()

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show all users : ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const result = await store.show(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show user : ${error}`)
  }
}

const create = async (_req: Request, res: Response) => {
  try {
    const { username, firstname, lastname, password } = _req.body
    if (!username || !firstname || !lastname || password)
      throw new Error('Unable to create a new user')
    const result = await store.create(username, firstname, lastname, password)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show user : ${error}`)
  }
}

const update = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const { firstname, lastname, newpassword } = _req.body
    if (!firstname && !lastname && !newpassword)
      throw new Error('Missing parameter(s)')
    const result = await store.update(firstname, lastname, newpassword)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to update user infos : ${error}`)
  }
}

const remove = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Unable to delete user')
    const result = await store.delete(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to delete user : ${error}`)
  }
}

const login = async (_req: Request, res: Response) => {
  try {
    const { username, password } = _req.body
    if (!username || !password) throw new Error('Missing parameter(s)')
    const result = await store.login(username, password)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to authenticate : ${error}`)
  }
}

const usersRoute = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', express.json(), create)
  app.post('/users/login', express.json(), login)
  app.put('/users', express.json(), update)
  app.delete('/users/:id', express.json(), remove)
}

export default usersRoute
