import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TodoList from '../app/components/TodoList'
import todosReducer, { type Todo } from '../app/store/todosSlice'

function renderWithStore(items: Todo[] = [], selectedIds: string[] = []) {
  const store = configureStore({
    reducer: { todos: todosReducer },
    preloadedState: { todos: { items, history: [], selectedIds } },
  })
  return render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

test('shows empty state when there are no items', () => {
  renderWithStore()
  expect(screen.getByText('No items yet. Add one!')).toBeDefined()
})

test('renders all items', () => {
  renderWithStore([
    { id: '1', text: 'Buy milk' },
    { id: '2', text: 'Walk the dog' },
  ])
  expect(screen.getByText('Buy milk')).toBeDefined()
  expect(screen.getByText('Walk the dog')).toBeDefined()
})

test('applies selected styles to selected items', () => {
  renderWithStore([{ id: '1', text: 'Buy milk' }], ['1'])
  expect(screen.getByText('Buy milk').className).toContain('bg-blue-800')
})

test('does not apply selected styles to unselected items', () => {
  renderWithStore([{ id: '1', text: 'Buy milk' }])
  expect(screen.getByText('Buy milk').className).not.toContain('bg-blue-800')
})

test('dispatches selectTodo when an item is clicked', async () => {
  const user = userEvent.setup()
  renderWithStore([{ id: '1', text: 'Buy milk' }])
  await user.click(screen.getByText('Buy milk'))
  expect(screen.getByText('Buy milk').className).toContain('bg-blue-800')
})
