'use client'

import { useState } from 'react'
import Button from './Button'
import AddTodoModal from './AddTodoModal'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, deleteSelected, undo } from '../store/todosSlice'

export default function TodoFooter() {
  const dispatch = useAppDispatch()
  const hasSelection = useAppSelector(
    (state) => state.todos.selectedIds.length > 0
  )
  const hasHistory = useAppSelector((state) => state.todos.snapshot !== null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleConfirm(text: string) {
    dispatch(addTodo(text))
    setIsModalOpen(false)
  }

  return (
    <>
      <AddTodoModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
      <Button
        variant="outline"
        onClick={() => dispatch(undo())}
        disabled={!hasHistory}
      >
        Undo
      </Button>
      <Button
        variant="outline"
        onClick={() => dispatch(deleteSelected())}
        disabled={!hasSelection}
      >
        Delete
      </Button>
      <Button onClick={() => setIsModalOpen(true)} className="ml-auto">
        Add
      </Button>
    </>
  )
}
