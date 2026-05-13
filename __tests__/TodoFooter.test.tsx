import { expect, test, describe } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TodoFooter from '../app/components/TodoFooter'
import todosReducer, { type Todo } from '../app/store/todosSlice'

type StoreState = {
  items?: Todo[]
  history?: Todo[][]
  selectedIds?: string[]
}

function renderWithStore({
  items = [],
  history = [],
  selectedIds = [],
}: StoreState = {}) {
  const store = configureStore({
    reducer: { todos: todosReducer },
    preloadedState: { todos: { items, history, selectedIds } },
  })
  render(
    <Provider store={store}>
      <TodoFooter />
    </Provider>
  )
  return store
}

const undoButton = () => screen.getAllByRole('button')[0]
const deleteButton = () => screen.getByRole('button', { name: 'Delete' })
const addButton = () => screen.getByRole('button', { name: 'Add' })

describe('Undo', () => {
  test('undo button is disabled when there is no history', () => {
    renderWithStore()
    expect(undoButton()).toHaveProperty('disabled', true)
  })

  test('undo button is enabled when history exists', () => {
    renderWithStore({ history: [[]] })
    expect(undoButton()).toHaveProperty('disabled', false)
  })

  test('undo button click restores the previous state', async () => {
    const user = userEvent.setup()
    const item = { id: '1', text: 'Buy milk' }
    const store = renderWithStore({ items: [item], history: [[]] })
    await user.click(undoButton())
    expect(store.getState().todos.items).toEqual([])
  })

  test('undo can be used multiple times to travel back step by step', async () => {
    const user = userEvent.setup()
    const item1 = { id: '1', text: 'Buy milk' }
    const item2 = { id: '2', text: 'Walk the dog' }
    // history[0] = before item1 was added, history[1] = before item2 was added
    const store = renderWithStore({
      items: [item1, item2],
      history: [[], [item1]],
    })

    await user.click(undoButton())
    expect(store.getState().todos.items).toEqual([item1])

    await user.click(undoButton())
    expect(store.getState().todos.items).toEqual([])

    expect(undoButton()).toHaveProperty('disabled', true)
  })
})

describe('Delete', () => {
  test('delete button is disabled when nothing is selected', () => {
    renderWithStore()
    expect(deleteButton()).toHaveProperty('disabled', true)
  })

  test('delete button is enabled when items are selected', () => {
    renderWithStore({
      items: [{ id: '1', text: 'Buy milk' }],
      selectedIds: ['1'],
    })
    expect(deleteButton()).toHaveProperty('disabled', false)
  })

  test('delete button click removes selected items from the store', async () => {
    const user = userEvent.setup()
    const store = renderWithStore({
      items: [{ id: '1', text: 'Buy milk' }],
      selectedIds: ['1'],
    })
    await user.click(deleteButton())
    expect(store.getState().todos.items).toEqual([])
  })

  test('deletes multiple selected items in bulk, leaving unselected ones intact', async () => {
    const user = userEvent.setup()
    const remaining = { id: '3', text: 'Read a book' }
    const store = renderWithStore({
      items: [
        { id: '1', text: 'Buy milk' },
        { id: '2', text: 'Walk the dog' },
        remaining,
      ],
      selectedIds: ['1', '2'],
    })
    await user.click(deleteButton())
    expect(store.getState().todos.items).toEqual([remaining])
  })
})

describe('Add', () => {
  const placeholderText = 'Task description…'
  test('add button opens the modal', async () => {
    const user = userEvent.setup()
    renderWithStore()
    expect(screen.queryByPlaceholderText(placeholderText)).toBeNull()
    await user.click(addButton())
    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined()
  })

  test('confirming the modal dispatches addTodo and closes it', async () => {
    const user = userEvent.setup()
    const store = renderWithStore()
    await user.click(addButton())
    await user.type(screen.getByPlaceholderText(placeholderText), 'New item')
    // Two "Add" buttons exist when the modal is open (modal confirm + footer).
    // The modal renders first in the DOM, so index 0 is the modal's confirm button.
    await user.click(screen.getAllByRole('button', { name: 'Add' })[0])
    expect(store.getState().todos.items[0].text).toBe('New item')
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull()
    )
  })

  test('pressing Enter in the input confirms and adds the item', async () => {
    const user = userEvent.setup()
    const store = renderWithStore()
    await user.click(addButton())
    await user.type(
      screen.getByPlaceholderText(placeholderText),
      'New item{Enter}'
    )
    expect(store.getState().todos.items[0].text).toBe('New item')
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull()
    )
  })

  test('clicking Cancel closes the modal without adding an item', async () => {
    const user = userEvent.setup()
    const store = renderWithStore()
    await user.click(addButton())
    await user.type(screen.getByPlaceholderText(placeholderText), 'New item')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(store.getState().todos.items).toEqual([])
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull()
    )
  })

  test('pressing Escape closes the modal without adding an item', async () => {
    const user = userEvent.setup()
    const store = renderWithStore()
    await user.click(addButton())
    await user.type(screen.getByPlaceholderText(placeholderText), 'New item')
    await user.keyboard('{Escape}')
    expect(store.getState().todos.items).toEqual([])
    await waitFor(() =>
      expect(screen.queryByPlaceholderText(placeholderText)).toBeNull()
    )
  })
})
