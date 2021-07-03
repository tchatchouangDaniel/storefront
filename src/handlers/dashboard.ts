/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { verifyAuth } from '../middleware/verifyAuth'
import { DashBoardQueries } from '../services/dashboard'

const queries = new DashBoardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await queries.productsInOrders()
    res.send(products)
  } catch (error) {
    res.status(400).send(`Unable to find the products : ${error}`)
  }
}

const productsInCart = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    const cart = await queries.productsInCart(id)
    res.send(cart)
  } catch (error) {
    res.status(400).send(`Unable to show products in cart : ${error}`)
  }
}

const dashboardRoute = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders)
  app.get('/cart/:id', verifyAuth, productsInCart)
}

export default dashboardRoute
