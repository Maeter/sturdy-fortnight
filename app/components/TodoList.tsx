'use client'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectTodo } from '../store/todosSlice'

export default function TodoList() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.todos.items)
  const selectedId = useAppSelector((state) => state.todos.selectedId)

  if (items.length === 0) return null

  return (
    <ul className="mt-4 flex flex-col gap-px rounded-lg border border-zinc-100 bg-zinc-50 p-2">
      {items.map((item) => {
        const isSelected = item.id === selectedId
        return (
          <li
            key={item.id}
            onClick={() => dispatch(selectTodo(item.id))}
            className={`cursor-pointer rounded-lg border p-2 text-sm transition-colors ${
              isSelected
                ? 'border-blue-800 bg-blue-800 text-white'
                : 'border-zinc-50 text-zinc-700 hover:border-zinc-100 hover:bg-zinc-100'
            }`}
          >
            {item.text}
          </li>
        )
      })}
    </ul>
  )
}
