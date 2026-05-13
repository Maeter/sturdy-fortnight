import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
}

type TodosState = {
  items: Todo[]
  snapshot: Todo[] | null
  selectedIds: string[]
}

const initialState: TodosState = {
  items: [],
  snapshot: null,
  selectedIds: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.snapshot = [...state.items]
      state.items.push({ id: crypto.randomUUID(), text: action.payload })
    },
    selectTodo(state, action: PayloadAction<string>) {
      const id = action.payload
      state.selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id]
    },
    deleteSelected(state) {
      state.snapshot = [...state.items]
      state.items = state.items.filter(
        (item) => !state.selectedIds.includes(item.id)
      )
      state.selectedIds = []
    },
    undo(state) {
      if (state.snapshot !== null) {
        state.items = state.snapshot
        state.snapshot = null
        state.selectedIds = []
      }
    },
  },
})

export const { addTodo, selectTodo, deleteSelected, undo } = todosSlice.actions
export default todosSlice.reducer
