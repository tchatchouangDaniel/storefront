/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { UsersStore } from '../../models/users'

dotenv.config()
const store = new UsersStore()
const pepper = process.env.BCRYPT_PASSWORD

afterAll(async () => {
  await store.resetTable()
})

describe('user model', () => {
  describe('users store methods existence', () => {
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

    it('should have a login method', () => {
      expect(store.login).toBeDefined()
    })
    it('should have a resetTable method', () => {
      expect(store.resetTable).toBeDefined()
    })
  })

  describe('users store methods functionalities', () => {
    it('should create a new user', async () => {
      const result = await store.create('admin', 'daniel', 'paul', 'chicken')
      expect(result.username).toEqual('admin')
      expect(result.firstname).toEqual('daniel')
      expect(result.lastname).toEqual('paul')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })

    it('should show all the user created', async () => {
      const result = await store.index()
      expect(result[0].username).toEqual('admin')
      expect(result[0].firstname).toEqual('daniel')
      expect(result[0].lastname).toEqual('paul')
      expect(
        bcrypt.compareSync(`chicken${pepper}`, result[0].password)
      ).toBeTrue()
    })

    it('should show user with id 1', async () => {
      const result = await store.show(1)
      expect(result.username).toEqual('admin')
      expect(result.firstname).toEqual('daniel')
      expect(result.lastname).toEqual('paul')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })

    it('should display the user logged in', async () => {
      const result = await store.login('admin', 'chicken')
      expect(result!.username).toEqual('admin')
      expect(
        bcrypt.compareSync(`chicken${pepper}`, result!.password)
      ).toBeTrue()
    })

    it('should update user with id 1 firstname to ouokam', async () => {
      const result = await store.update(1, 'ouokam')
      expect(result.firstname).toEqual('ouokam')
      expect(result.lastname).toEqual('paul')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })

    it('should update user with id 1 lastname to claude', async () => {
      const result = await store.update(1, null, 'claude')
      expect(result.firstname).toEqual('ouokam')
      expect(result.lastname).toEqual('claude')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })

    it('should update user with id 1 password to 1234', async () => {
      const result = await store.update(1, null, null, '1234')
      expect(result.firstname).toEqual('ouokam')
      expect(result.lastname).toEqual('claude')
      expect(bcrypt.compareSync(`1234${pepper}`, result.password)).toBeTrue()
    })

    it('should update user with id 1 daniel paul chicken', async () => {
      const result = await store.update(1, 'daniel', 'paul', 'chicken')
      expect(result.firstname).toEqual('daniel')
      expect(result.lastname).toEqual('paul')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })

    it('should delete user with id 1', async () => {
      const result = await store.delete(1)

      expect(result.firstname).toEqual('daniel')
      expect(result.lastname).toEqual('paul')
      expect(bcrypt.compareSync(`chicken${pepper}`, result.password)).toBeTrue()
    })
  })
})
