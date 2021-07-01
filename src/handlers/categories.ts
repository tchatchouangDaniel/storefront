/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { CategoriesStore } from '../models/categories'

const store = new CategoriesStore()

/**
 * Endpoint to show all categories
 * @param _req request
 * @param res response
 */
const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to find all categories : ${error}`)
  }
}

/**
 * Endpoint to show a category
 * @param _req request
 * @param res response
 */
const show = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error(`no id provided`)
    const result = await store.show(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to find category : ${error}`)
  }
}

/**
 * Endpoint to create a category
 * @param _req request
 * @param res response
 */
const create = async (_req: Request, res: Response) => {
  try {
    const { name } = _req.body
    if (!name) throw new Error('No parameters provided')
    const result = await store.create(name)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to create category : ${error}`)
  }
}

/**
 * Endpoint to update a category
 * @param _req request
 * @param res response
 */
const update = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.body
    const { name } = _req.body
    if (!id || !name) throw new Error('Missing parameters')
    const result = await store.update(id, name)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to update category : ${error}`)
  }
}

/**
 * Endpoint to delete a category
 * @param _req request
 * @param res response
 */
const remove = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing parameters')
    const result = await store.delete(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to remove category : ${error}`)
  }
}

const categoriesRoute = (app: express.Application) => {
  app.get('/categories', index)
  app.get('/categories/:id', show)
  app.post('/categories', express.json(), create)
  app.put('/categories/:id', express.json(), update)
  app.delete('/categories/:id', remove)
}

export default categoriesRoute
