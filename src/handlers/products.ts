/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { ProductsStore } from '../models/products'

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
    const { name, description } = _req.body
    if (!name && !description) throw new Error('Missing parameters')
    const result = await store.update(name, description)
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
  app.post('/products', express.json(), create)
  app.put('/products/:id', express.json(), update)
  app.delete('/products/:id', remove)
}

export default productsRoute
