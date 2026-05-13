'use client'

import { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'

type Props = {
  isOpen: boolean
  onConfirm: (text: string) => void
  onCancel: () => void
}

export default function AddTodoModal({ isOpen, onConfirm, onCancel }: Props) {
  const [text, setText] = useState('')
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true)
      // Two frames: first to mount at starting position, second to trigger transition
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true))
      })
      return () => cancelAnimationFrame(raf)
    } else {
      setEntered(false)
      const timer = setTimeout(() => {
        setMounted(false)
        setText('')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!mounted) return null

  function handleConfirm() {
    if (text.trim()) {
      onConfirm(text.trim())
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`w-full max-w-md px-4 transition-transform duration-300 ease-out ${
          entered ? 'translate-y-0' : 'translate-y-[-100vh]'
        }`}
      >
        <Card
          title={
            <h2 className="text-lg font-semibold text-zinc-800">New task</h2>
          }
          footer={
            <>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!text.trim()}
                className="ml-auto"
              >
                Add
              </Button>
            </>
          }
        >
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Task description…"
            className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-800 focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
        </Card>
      </div>
    </div>
  )
}
