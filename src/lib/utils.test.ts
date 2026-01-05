import { describe, it, expect } from 'vitest'
import { pluralize } from './utils'

describe('pluralize', () => {
  it('should return singular form when count is 1', () => {
    expect(pluralize(1, 'module')).toBe('module')
    expect(pluralize(1, 'example')).toBe('example')
    expect(pluralize(1, 'item')).toBe('item')
  })

  it('should return plural form (default: +s) when count is not 1', () => {
    expect(pluralize(0, 'module')).toBe('modules')
    expect(pluralize(2, 'example')).toBe('examples')
    expect(pluralize(100, 'item')).toBe('items')
  })

  it('should use custom plural form when provided', () => {
    expect(pluralize(0, 'child', 'children')).toBe('children')
    expect(pluralize(2, 'person', 'people')).toBe('people')
    expect(pluralize(5, 'mouse', 'mice')).toBe('mice')
  })

  it('should use singular form with custom plural when count is 1', () => {
    expect(pluralize(1, 'child', 'children')).toBe('child')
    expect(pluralize(1, 'person', 'people')).toBe('person')
  })

  it('should handle negative counts as plural', () => {
    expect(pluralize(-1, 'module')).toBe('modules')
    expect(pluralize(-5, 'example')).toBe('examples')
  })
})
