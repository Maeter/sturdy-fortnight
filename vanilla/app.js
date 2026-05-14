// State
let state = {
  items: [],
  history: [],
  selectedIds: [],
}

// DOM refs
const emptyState = document.getElementById('empty-state')
const todoList = document.getElementById('todo-list')
const undoBtn = document.getElementById('undo-btn')
const deleteBtn = document.getElementById('delete-btn')
const addBtn = document.getElementById('add-btn')
const modal = document.getElementById('modal')
const modalCard = document.getElementById('modal-card')
const taskInput = document.getElementById('task-input')
const cancelBtn = document.getElementById('modal-cancel-btn')
const confirmBtn = document.getElementById('modal-confirm-btn')

// Mutations
function addTodo(text) {
  state = {
    ...state,
    history: [...state.history, state.items],
    items: [...state.items, { id: crypto.randomUUID(), text }],
  }
  render()
}

function selectTodo(id) {
  state = {
    ...state,
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter((sid) => sid !== id)
      : [...state.selectedIds, id],
  }
  render()
}

function deleteSelected() {
  state = {
    ...state,
    history: [...state.history, state.items],
    items: state.items.filter((item) => !state.selectedIds.includes(item.id)),
    selectedIds: [],
  }
  render()
}

function undo() {
  if (state.history.length === 0) return
  const history = [...state.history]
  const previous = history.pop()
  state = { ...state, history, items: previous, selectedIds: [] }
  render()
}

// Render
function render() {
  const { items, selectedIds, history } = state

  // Empty state vs list
  const hasItems = items.length > 0
  emptyState.style.display = hasItems ? 'none' : ''
  // Use inline style to override the 'hidden' Tailwind class without fighting flex/hidden conflict
  todoList.style.display = hasItems ? 'flex' : 'none'

  // List items
  todoList.innerHTML = ''
  items.forEach((item) => {
    const isSelected = selectedIds.includes(item.id)
    const li = document.createElement('li')
    li.setAttribute('role', 'option')
    li.setAttribute('aria-selected', String(isSelected))
    li.setAttribute('tabindex', '0')
    li.textContent = item.text
    li.className = `cursor-pointer rounded-md border px-2 py-1 text-sm transition-colors ${
      isSelected
        ? 'border-blue-800 bg-blue-800 text-white'
        : 'border-zinc-50 text-zinc-700 hover:border-zinc-100 hover:bg-zinc-100'
    }`
    li.addEventListener('click', () => selectTodo(item.id))
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        selectTodo(item.id)
      }
    })
    todoList.appendChild(li)
  })

  // Button disabled states
  undoBtn.disabled = history.length === 0
  deleteBtn.disabled = selectedIds.length === 0
}

// Modal
function openModal() {
  taskInput.value = ''
  confirmBtn.disabled = true
  modal.classList.remove('hidden')
  modalCard.classList.remove('modal-exit')
  void modalCard.offsetWidth // force reflow to restart animation
  modalCard.classList.add('modal-enter')
  taskInput.focus()
}

function closeModal() {
  modalCard.classList.remove('modal-enter')
  void modalCard.offsetWidth
  modalCard.classList.add('modal-exit')
  modalCard.addEventListener(
    'animationend',
    () => {
      modal.classList.add('hidden')
      modalCard.classList.remove('modal-exit')
    },
    { once: true }
  )
}

// Event listeners
addBtn.addEventListener('click', openModal)
cancelBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal()
})

taskInput.addEventListener('input', () => {
  confirmBtn.disabled = taskInput.value.trim() === ''
})

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    addTodo(taskInput.value.trim())
    closeModal()
  } else if (e.key === 'Escape') {
    closeModal()
  }
})

confirmBtn.addEventListener('click', () => {
  const text = taskInput.value.trim()
  if (text) {
    addTodo(text)
    closeModal()
  }
})

undoBtn.addEventListener('click', undo)
deleteBtn.addEventListener('click', deleteSelected)

// Initial render
render()
