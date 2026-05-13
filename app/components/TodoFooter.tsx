'use client'

import { useState } from 'react'
import Button from './Button'
import AddTodoModal from './AddTodoModal'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, deleteTodo, undo } from '../store/todosSlice'

export default function TodoFooter() {
  const dispatch = useAppDispatch()
  const hasItems = useAppSelector((state) => state.todos.items.length > 0)
  const hasHistory = useAppSelector((state) => state.todos.history.length > 0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleConfirm(text: string) {
    dispatch(addTodo(text))
    setIsModalOpen(false)
  }

  function handleUndo() {
    dispatch(undo())
  }

  function handleDelete(id: string) {
    dispatch(deleteTodo(id))
  }

  return (
    <>
      <AddTodoModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
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
      <Button onClick={() => setIsModalOpen(true)} className="ml-auto">
        Add
      </Button>
    </>
  )
}
