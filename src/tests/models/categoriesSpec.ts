/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { CategoriesStore } from '../../models/categories'

const store = new CategoriesStore()

describe('categories model', () => {
  describe('categoriesStore method existence', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(store.create).toBeDefined()
    })

    it('should have a upadate method', () => {
      expect(store.update).toBeDefined()
    })

    // TODO: write code for resetTable
    // it('should have a resetTable method', () => {
    //   expect(store.resetTable).toBeDefined()
    // })
  })

  describe('categoriesStore method functionnalities', () => {
    it('create category "cloth"', async () => {
      const result = await store.create('cloth')

      expect(result).toEqual({
        id: 1,
        name: 'cloth',
      })
    })

    it('index should show all the categories', async () => {
      const result = await store.index()

      expect(result).toEqual([
        {
          id: 1,
          name: 'cloth',
        },
      ])
    })

    it('show should show category with id 1', async () => {
      const result = await store.show(1)

      expect(result).toEqual({
        id: 1,
        name: 'cloth',
      })
    })

    it('should update category cloth name to clothes', async () => {
      const result = await store.update(1, 'clothes')

      expect(result).toEqual({
        id: 1,
        name: 'clothes',
      })
    })

    // it('should reset table id order', async () => {

    // })
  })
})