/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { OrdersStore } from '../../models/orders'
import { UsersStore } from '../../models/users'

const store = new OrdersStore()
const userStore = new UsersStore()

afterAll(async () => {
  await userStore.delete(1)
  await userStore.resetTable()
  await store.resetTable()
})

describe('order model', () => {
  describe('orders store methods existence', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(store.show).toBeDefined()
    })

    it('should have an update method', () => {
      expect(store.update).toBeDefined()
    })

    it('should have a create method', () => {
      expect(store.create).toBeDefined()
    })

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined()
    })

    it('should have an add to cart method', () => {
      expect(store.addToCart).toBeDefined()
    })

    it('should have an update cart method', () => {
      expect(store.updateCart).toBeDefined()
    })

    it('should have a remove from cart method', () => {
      expect(store.RemoveFromCart).toBeDefined()
    })

    it('should have a resetTable method', () => {
      expect(store.resetTable).toBeDefined()
    })
  })

  describe('orders store methods functionalities', () => {
    it('should create a new order', async () => {
      await userStore.create('admin', 'daniel', 'paul', 'loveAfrica')
      const result = await store.create(1, 'active')

      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
      })
    })

    it('should show all the all orders created', async () => {
      const result = await store.index()

      expect(result).toEqual([
        {
          id: 1,
          user_id: 1,
          status: 'active',
        },
      ])
    })

    it('should show order with id 1', async () => {
      const result = await store.show(1)

      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
      })
    })

    it('should update order with id 1 status to complete', async () => {
      const result = await store.update(1, 'complete')

      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'complete',
      })
    })

    it('should delete order with id 1', async () => {
      await userStore.delete(1)
      const result = await store.delete(1)

      expect(result).toEqual({ id: 1, user_id: 1, status: 'complete' })
    })
  })
})
