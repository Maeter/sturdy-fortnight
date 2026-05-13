'use client'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectTodo } from '../store/todosSlice'

export default function TodoList() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.todos.items)
  const selectedIds = useAppSelector((state) => state.todos.selectedIds)

  if (items.length === 0)
    return (
      <p className="mt-6 mb-4 text-center text-sm text-zinc-400">
        No items yet. Add one!
      </p>
    )

  return (
    <ul className="mt-6 mb-4 flex flex-col gap-px rounded-md border border-zinc-100 bg-zinc-50 p-2">
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id)
        return (
          <li
            key={item.id}
            onClick={() => dispatch(selectTodo(item.id))}
            className={`cursor-pointer rounded-md border px-2 py-1 text-sm transition-colors ${
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
