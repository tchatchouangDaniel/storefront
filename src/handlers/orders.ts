/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import { OrdersStore } from '../models/orders'
import { verifyAuth } from '../middleware/verifyAuth'

const store = new OrdersStore()

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show all orders : ${error}`)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params
    const result = await store.show(id)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show order : ${error}`)
  }
}

const showUserOrder = async (_req: Request, res: Response) => {
  try {
    const { userId } = _req.params
    const result = await store.showUserOrder(userId)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to show order : ${error}`)
  }
}

const create = async (_req: Request, res: Response) => {
  try {
    const { userId } = _req.body
    if (!userId) throw new Error('Missing parameter')
    const result = await store.create(userId)
    res.send(result)
  } catch (error) {
    res.status(400).send(`Unable to create order : ${error}`)
  }
}

const addToCart = async (_req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { username } = _req
    if (!username) throw new Error('Missing username parameter')
    const { id } = _req.params
    if (!id) throw new Error('Missing id parameter')
    const { productId, quantity } = _req.body
    if (!productId || !quantity) throw new Error('Missing parameter(s)')
    const result = await store.addToCart(
      username,
      productId,
      id,
      Number(quantity)
    )
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
  app.get('/orders/:id', verifyAuth, show)
  app.get('/orders/:userId', verifyAuth, showUserOrder)
  app.post('/orders', verifyAuth, express.json(), create)
  app.post('/orders/:id/products', express.json(), verifyAuth, addToCart)
  app.put(
    '/orders/:orderid/products/:productid',
    express.json(),
    verifyAuth,
    updateCart
  )
  app.delete('/orders/:orderid/products/:productid', verifyAuth, removeFromCart)
  app.delete('/orders/:id', verifyAuth, remove)
}

export default ordersRoute
