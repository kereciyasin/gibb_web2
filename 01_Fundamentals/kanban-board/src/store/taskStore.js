import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  // --- localStorage'dan oku ---
  function loadTasks() {
    const raw = localStorage.getItem('tasks')
    tasks.value = raw ? JSON.parse(raw) : []
  }

  // --- localStorage'a yaz ---
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  // --- Görevleri ekle/güncelle/sil ---
  function fetchTasks() {
    loadTasks()
  }

  function addTask(task) {
    // id ataması (benzersiz olması için)
    const id = Date.now()
    tasks.value.push({ ...task, id })
    saveTasks()
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function changeTaskStatus(id, newStatus) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = newStatus
      saveTasks()
    }
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    changeTaskStatus
  }
})