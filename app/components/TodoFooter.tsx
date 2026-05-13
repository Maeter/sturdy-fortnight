'use client'

import Button from './Button'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, deleteTodo, undo } from '../store/todosSlice'

export default function TodoFooter() {
  const dispatch = useAppDispatch()
  const hasItems = useAppSelector((state) => state.todos.items.length > 0)
  const hasHistory = useAppSelector((state) => state.todos.history.length > 0)

  function handleAdd() {
    dispatch(addTodo('New task'))
  }

  function handleUndo() {
    dispatch(undo())
  }

  function handleDelete(id: string) {
    dispatch(deleteTodo(id))
  }

  return (
    <>
      <Button variant="outline" onClick={handleUndo} disabled={!hasHistory}>
        Undo
      </Button>
      <Button
        variant="outline"
        onClick={() => handleDelete('placeholder-id')}
        disabled={!hasItems}
      >
        Delete
      </Button>
      <Button onClick={() => handleAdd()} className="ml-auto">
        Add
      </Button>
    </>
  )
}
