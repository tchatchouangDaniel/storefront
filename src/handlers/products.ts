/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { ProductsStore } from '../models/products'
import { verifyAuth } from '../middleware/verifyAuth'

const store = new ProductsStore()

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show all products : ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    const result = await store.show(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show product : ${error}`)
  }
}

const create = async (_req: Request, res: Response) => {
  try {
    const { name, description, categoryId, price } = _req.body
    if (!name && !description && !categoryId && !price)
      throw new Error('Missing parameter')
    const result = await store.create(name, description, categoryId, price)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to create product : ${error}`)
  }
}

const update = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const { name, description, price } = _req.body
    if (!name && !description && !price) throw new Error('Missing parameters')
    const result = await store.update(id, name, description, price)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to update product : ${error}`)
  }
}

const remove = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const result = await store.delete(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to delete product : ${error}`)
  }
}

const productsRoute = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuth, express.json(), create)
  app.put('/products/:id', verifyAuth, express.json(), update)
  app.delete('/products/:id', remove)
}

export default productsRoute
