import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
}

type TodosState = {
  items: Todo[]
  history: Todo[][]
  selectedIds: string[]
}

const initialState: TodosState = {
  items: [],
  history: [],
  selectedIds: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.history.push([...state.items])
      state.items.push({ id: crypto.randomUUID(), text: action.payload })
    },
    selectTodo(state, action: PayloadAction<string>) {
      const id = action.payload
      state.selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id]
    },
    deleteSelected(state) {
      state.history.push([...state.items])
      state.items = state.items.filter(
        (item) => !state.selectedIds.includes(item.id)
      )
      state.selectedIds = []
    },
    undo(state) {
      const previous = state.history.pop()
      if (previous !== undefined) {
        state.items = previous
        state.selectedIds = []
      }
    },
  },
})

export const { addTodo, selectTodo, deleteSelected, undo } = todosSlice.actions
export default todosSlice.reducer
