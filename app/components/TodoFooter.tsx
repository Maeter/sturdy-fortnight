'use client'

import Button from './Button'

export default function TodoFooter() {
  function handleAdd() {
    console.log('Add clicked')
  }

  function handleUndo() {
    console.log('Undo clicked')
  }

  function handleDelete() {
    console.log('Delete clicked')
  }

  return (
    <>
      <Button variant="outline" onClick={handleUndo}>
        Undo
      </Button>
      <Button variant="outline" onClick={handleAdd}>
        Add
      </Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  )
}
