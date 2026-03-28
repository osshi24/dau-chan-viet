import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
  })

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('handles array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn(['foo', false, 'bar'])).toBe('foo bar')
  })

  it('handles object syntax for conditional classes', () => {
    expect(cn({ 'foo': true, 'bar': false })).toBe('foo')
    expect(cn({ 'foo': true, 'bar': true })).toBe('foo bar')
  })

  it('handles complex merging with multiple conflicting classes', () => {
    expect(cn('px-2 py-1 text-sm', 'px-4 py-2', 'text-lg')).toBe('px-4 py-2 text-lg')
  })

  it('handles mixed input types', () => {
    expect(cn('foo', ['bar', 'baz'], { 'qux': true, 'quux': false })).toBe('foo bar baz qux')
  })
})
