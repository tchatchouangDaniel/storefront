/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
describe('Test endpoints', async () => {
  describe('Test category endpoints', async () => {
    it('expect [GET] /categories response code to be 200', async () => {
      const response = await request.get('/categories')
      expect(response.status).toBe(200)
    })

    it('expect [POST] /categories response code to be 200 and body {id:1,name:"t-shirt"}', async () => {
      const response = await request
        .post('/categories')
        .send({ name: 't-shirt' })
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: 1,
        name: 't-shirt',
      })
    })
  })

  describe('Test product endpoints', async () => {
    it('expect [POST] /products response code to be 200 and body {id:1, name: "black T",description:"black",categoryId:"1", price:4}', async () => {
      const response = await request.post('/products').send({
        name: 'black T',
        description: 'black',
        categoryId: 1,
        price: 4,
      })
      expect(response.body).toEqual({
        id: 1,
        name: 'black T',
        description: 'black',
        categoryId: 1,
        price: 4,
      })
      expect(response.status).toBe(200)
    })

    it('expect [GET] /products response code to be 200', async () => {
      const response = await request.get('/products')
      expect(response.status).toBe(200)
    })

    it('epxect [GET] /products/1 response code to be 200', async () => {
      const response = await request.get('/products/1')
      expect(response.status).toBe(200)
    })

    it('epxect [GET] /products/1 body to be {id:1, name: "black T",description:"black",categoryId:"1", price:4}', async () => {
      const response = await request.get('/products/1')
      expect(response.body).toEqual({
        id: 1,
        name: 'black T',
        description: 'black',
        categoryId: '1',
        price: 4,
      })
    })

    it('epxect [GET] /products body to be [{id:1, name: "black T",description:"black",categoryId:"1", price:4}]', async () => {
      const response = await request.get('/products')
      expect(response.body).toEqual([
        {
          id: 1,
          name: 'black T',
          description: 'black',
          categoryId: '1',
          price: 4,
        },
      ])
    })
  })

  describe('Test users endpoints', async () => {
    it('expect [POST] /users response code to be 200', async () => {
      const response = await request.post('/users').send({
        username: 'admin',
        firstname: 'admin',
        lastname: 'admin',
        password: '1234',
      })
      expect(response.status).toBe(200)
    })

    it('expect [GET] /users response code to be 200', async () => {
      const response = await request.get('/users')
      expect(response.status).toBe(200)
    })

    it('epxect [GET] /users/1 response code to be 200', async () => {
      const response = await request.get('/users/1')
      expect(response.status).toBe(200)
    })
  })

  describe('Test orders endpoints', async () => {
    it('expect [POST] /orders response code to be 200', async () => {
      const response = await request.post('/orders').send({
        userId: 1,
      })
      expect(response.status).toBe(200)
    })

    it('expect [GET] /orders response code to be 200', async () => {
      const response = await request.get('/orders')
      expect(response.status).toBe(200)
    })

    it('epxect [GET] /orders/1 response code to be 200', async () => {
      const response = await request.get('/orders/1')
      expect(response.status).toBe(200)
    })

    it('epxect [GET] /orders/1 response code to be 200', async () => {
      const response = await request.get('/orders/1')
      expect(response.status).toBe(200)
    })
  })
})
