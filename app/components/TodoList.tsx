'use client'

import { useAppSelector } from '../store/hooks'

export default function TodoList() {
  const items = useAppSelector((state) => state.todos.items)

  if (items.length === 0) return null

  return (
    <ul className="mt-4 flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-2 text-sm text-zinc-700"
        >
          {item.text}
        </li>
      ))}
    </ul>
  )
}
