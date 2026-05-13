import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Todo = {
  id: string
  text: string
}

type TodosState = {
  items: Todo[]
  history: Todo[][]
}

const initialState: TodosState = {
  items: [],
  history: [],
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
    deleteTodo(state, action: PayloadAction<string>) {
      state.history.push([...state.items])
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    undo(state) {
      const previous = state.history.pop()
      if (previous !== undefined) {
        state.items = previous
      }
    },
  },
})

export const { addTodo, deleteTodo, undo } = todosSlice.actions
export default todosSlice.reducer
