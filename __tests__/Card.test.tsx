import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../app/components/common/Card'

test('renders children', () => {
  render(<Card>Body content</Card>)
  expect(screen.getByText('Body content')).toBeDefined()
})

test('renders the title slot when provided', () => {
  render(<Card title={<h2>My Title</h2>}>Body</Card>)
  expect(screen.getByRole('heading', { name: 'My Title' })).toBeDefined()
})

test('does not render a title section when omitted', () => {
  render(<Card>Body</Card>)
  expect(screen.queryByRole('heading')).toBeNull()
})

test('renders the footer slot when provided', () => {
  render(<Card footer={<button>Save</button>}>Body</Card>)
  expect(screen.getByRole('button', { name: 'Save' })).toBeDefined()
})

test('does not render a footer section when omitted', () => {
  render(<Card>Body</Card>)
  expect(screen.queryByRole('button')).toBeNull()
})

test('forwards extra className to the root element', () => {
  const { container } = render(<Card className="custom-class">Body</Card>)
  expect(container.firstChild).toHaveProperty(
    'className',
    expect.stringContaining('custom-class')
  )
})
