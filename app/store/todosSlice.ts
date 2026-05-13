import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
}

type TodosState = {
  items: Todo[]
  history: Todo[][]
  selectedId: string | null
}

const initialState: TodosState = {
  items: [],
  history: [],
  selectedId: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.history.push([...state.items])
      state.items.push({
        id: crypto.randomUUID(),
        text: action.payload,
      })
    },
    selectTodo(state, action: PayloadAction<string>) {
      state.selectedId =
        state.selectedId === action.payload ? null : action.payload
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.history.push([...state.items])
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.selectedId = null
    },
    undo(state) {
      const previous = state.history.pop()
      if (previous !== undefined) {
        state.items = previous
        state.selectedId = null
      }
    },
  },
})

export const { addTodo, selectTodo, deleteTodo, undo } = todosSlice.actions
export default todosSlice.reducer
