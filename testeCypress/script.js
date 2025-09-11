const STORAGE_KEY = 'spaceTasks_data_v1'
const THEME_KEY = 'spaceTasks_theme_v1'
const CHALLENGE_KEY = 'spaceTasks_challenge_v1'

const addTaskBtn = document.getElementById('add-task')
const newTaskInput = document.getElementById('new-task')
const taskCategory = document.getElementById('task-category')
const taskList = document.getElementById('task-list')
const emptyMessage = document.getElementById('empty-message')
const filterBtns = document.querySelectorAll('.filter-btn')
const pendingCountEl = document.getElementById('pending-count')
const completedCountEl = document.getElementById('completed-count')
const generateChallengeBtn = document.getElementById('generate-challenge')
const dailyChallengeEl = document.getElementById('daily-challenge')
const toggleThemeBtn = document.getElementById('toggle-theme')

let tasks = []
let activeFilter = 'all'
const challenges = [
  'Beba 300ml de água 💧',
  'Faça 5 minutos de alongamento 🧘',
  'Organize sua área de estudo por 10 minutos ✨',
  'Envie uma mensagem para alguém que você gosta 💬',
  'Faça uma tarefa pequena da lista (5-10 min) ✅',
  'Anote 3 coisas boas do dia 🌟',
  'Desconecte 10 minutos das redes e respire 🛰️'
]

function saveStore() {
  const data = { tasks }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadStore() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.tasks)) tasks = parsed.tasks
  } catch (e) {}
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

function loadTheme() {
  const t = localStorage.getItem(THEME_KEY)
  if (t === 'dark') {
    document.body.classList.add('dark')
    toggleThemeBtn.textContent = '☀️'
  } else {
    document.body.classList.remove('dark')
    toggleThemeBtn.textContent = '🌙'
  }
}

function saveChallenge(text) {
  localStorage.setItem(CHALLENGE_KEY, text)
}

function loadChallenge() {
  const c = localStorage.getItem(CHALLENGE_KEY)
  if (c) dailyChallengeEl.textContent = c
}

function renderCounts() {
  const totalCompleted = tasks.filter(t => t.completed).length
  const totalPending = tasks.length - totalCompleted
  pendingCountEl.textContent = totalPending
  completedCountEl.textContent = totalCompleted
}

function updateEmptyMessage() {
  emptyMessage.style.display = taskList.children.length === 0 ? 'block' : 'none'
}

function isDuplicate(text, category) {
  const key = text.trim().toLowerCase()
  return tasks.some(t => t.text.trim().toLowerCase() === key && t.category === category)
}

function createTaskElement(taskObj, animate = true) {
  const li = document.createElement('li')
  li.className = 'task'
  li.dataset.category = taskObj.category || 'geral'
  if (taskObj.completed) li.classList.add('completed')

  const left = document.createElement('div')
  left.className = 'task-left'

  const badge = document.createElement('div')
  badge.className = 'badge'
  badge.textContent = taskObj.category || 'geral'

  const span = document.createElement('span')
  span.textContent = taskObj.text

  left.appendChild(badge)
  left.appendChild(span)

  const actions = document.createElement('div')
  actions.className = 'task-actions'

  const completeBtn = document.createElement('button')
  completeBtn.className = 'btn-small complete-btn'
  completeBtn.textContent = taskObj.completed ? '⟲' : '✔'
  completeBtn.addEventListener('click', () => {
    taskObj.completed = !taskObj.completed
    li.classList.toggle('completed')
    completeBtn.textContent = taskObj.completed ? '⟲' : '✔'
    saveAndRerender()
  })

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn-small delete-btn'
  deleteBtn.textContent = '✖'
  deleteBtn.addEventListener('click', () => {
    li.classList.add('hide')
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== taskObj.id)
      saveAndRerender()
    }, 300)
  })

  actions.appendChild(completeBtn)
  actions.appendChild(deleteBtn)

  li.appendChild(left)
  li.appendChild(actions)

  taskList.appendChild(li)

  if (animate) {
    requestAnimationFrame(() => li.classList.add('show'))
  } else {
    li.classList.add('show')
  }

  return li
}

function renderTasks() {
  taskList.innerHTML = ''
  const filtered = tasks.filter(t => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'completed') return t.completed
    if (activeFilter === 'pending') return !t.completed
    return true
  })
  filtered.forEach(t => createTaskElement(t, true))
  updateEmptyMessage()
  renderCounts()
}

function saveAndRerender() {
  saveStore()
  renderTasks()
}

function addTask(text, category) {
  const trimmed = text.trim()
  if (!trimmed) return { ok: false, msg: 'Digite algo antes de adicionar' }
  if (isDuplicate(trimmed, category)) return { ok: false, msg: 'Tarefa duplicada' }
  const taskObj = { id: Date.now() + Math.random().toString(36).slice(2,8), text: trimmed, category: category || 'geral', completed: false }
  tasks.unshift(taskObj)
  saveAndRerender()
  return { ok: true }
}

addTaskBtn.addEventListener('click', () => {
  const res = addTask(newTaskInput.value, taskCategory.value)
  if (!res.ok) {
    alert(res.msg)
    return
  }
  newTaskInput.value = ''
  newTaskInput.focus()
})

newTaskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTaskBtn.click()
})

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    activeFilter = btn.dataset.filter
    renderTasks()
  })
})

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light'
  toggleThemeBtn.textContent = theme === 'dark' ? '☀️' : '🌙'
  saveTheme(theme)
})

generateChallengeBtn.addEventListener('click', () => {
  const idx = Math.floor(Math.random() * challenges.length)
  const txt = challenges[idx]
  dailyChallengeEl.textContent = txt
  saveChallenge(txt)
})

function init() {
  loadTheme()
  loadChallenge()
  loadStore()
  renderTasks()
}

init()