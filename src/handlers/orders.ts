/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { OrdersStore } from '../models/orders'

const store = new OrdersStore()

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show all orders`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const result = store.show(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show order : ${error}`)
  }
}

const create = async (_req: Request, res: Response) => {
  try {
    const { userId, status } = _req.body
    if (!userId && !status) throw new Error('Missing parameter')
    const result = await store.create(userId, status)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to create order : ${error}`)
  }
}

const addToCart = async (_req: Request, res: Response) => {
  try {
    const { productId, orderId, quantity } = _req.body
    if (!productId || !orderId || !quantity)
      throw new Error('Missing parameter(s)')
    const result = await store.addToCart(productId, orderId, Number(quantity))
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to add to cart : ${error}`)
  }
}

const updateCart = async (_req: Request, res: Response) => {
  try {
    const { productid, orderid } = _req.params
    const { quantity } = _req.body
    if (!productid || !orderid || quantity)
      throw new Error('Missing parameters')
    const result = await store.updateCart(productid, orderid, quantity)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to update items in cart : ${error}`)
  }
}

const removeFromCart = async (_req: Request, res: Response) => {
  try {
    const { orderid, productid } = _req.params
    if (!orderid || !productid) throw new Error('Missing parameters')
    const result = await store.RemoveFromCart(orderid, productid)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to remove product from cart : ${error}`)
  }
}

const remove = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const result = await store.delete(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to delete order : ${error}`)
  }
}

const ordersRoute = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', create)
  app.post('/orders/:id/products', express.json(), addToCart)
  app.put('/orders/:orderid/products/:productid', express.json(), updateCart)
  app.delete('/orders/:orderid/products/:productid', removeFromCart)
  app.delete('/orders/:id', remove)
}

export default ordersRoute
