import { isEmpty } from './object'
import { describe, it, expect } from 'vitest'

describe('isEmpty', () => {
  it('Should return TRUE for null and undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(null)).toBe(true)
  })

  it('Should return TRUE for objects without own properties', () => {
    const emptyObject = {}
    const emptyObject2 = Object.create({})
    const emptyObject3 = Object.assign({}, null)

    expect(isEmpty(emptyObject)).toBe(true)
    expect(isEmpty(emptyObject2)).toBe(true)
    expect(isEmpty(emptyObject3)).toBe(true)
  })

  it('Should return FALSE for objects with own properties', () => {
    const object = { key: 'value' }
    const objectWithUndefinedProperty = { key: undefined }

    expect(isEmpty(object)).toBe(false)
    expect(isEmpty(objectWithUndefinedProperty)).toBe(false)
  })

  it('Should return TRUE for arrays without own properties', () => {
    const emptyArray: any[] = []
    const emptyArray2: any[] = Array()

    expect(isEmpty(emptyArray)).toBe(true)
    expect(isEmpty(emptyArray2)).toBe(true)
  })

  it('Should return FALSE for arrays with own properties', () => {
    const array = ['value']
    const arrayWithUndefinedProperty = [undefined]

    expect(isEmpty(array)).toBe(false)
    expect(isEmpty(arrayWithUndefinedProperty)).toBe(false)
  })
})
