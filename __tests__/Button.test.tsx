import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '../app/components/common/Button'

test('renders its label', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined()
})

test('is disabled when the disabled prop is set', () => {
  render(<Button disabled>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toHaveProperty(
    'disabled',
    true
  )
})

test('applies filled variant classes by default', () => {
  render(<Button>Filled</Button>)
  expect(screen.getByRole('button', { name: 'Filled' }).className).toContain(
    'bg-blue-800'
  )
})

test('applies outline variant classes when variant is outline', () => {
  render(<Button variant="outline">Outline</Button>)
  const button = screen.getByRole('button', { name: 'Outline' })
  expect(button.className).toContain('border-blue-800')
  expect(button.className).not.toContain('bg-blue-800')
})
