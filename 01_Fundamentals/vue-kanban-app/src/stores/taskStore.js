// src/stores/taskStore.js

// 📦 Pinia Funktion importieren
import { defineStore } from 'pinia'

// 🗂️ Store für Aufgaben definieren
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    // 📝 Aufgabenliste mit Status (todo, in-progress, done)
    tasks: [],
  }),

  actions: {
    // 📥 Beispielhafte Aufgaben laden
    async fetchTasks() {
      this.tasks = [
        { id: 1, title: 'Aufgabe 1', description: 'Beschreibung 1', status: 'todo' },
        { id: 2, title: 'Aufgabe 2', description: 'Beschreibung 2', status: 'in-progress' },
        { id: 3, title: 'Aufgabe 3', description: 'Beschreibung 3', status: 'done' },
      ]
    },

    // ➕ Neue Aufgabe hinzufügen
    addTask(newTask) {
      newTask.id = Date.now()
      this.tasks.push(newTask)
    },

    // 📝 Aufgabe bearbeiten
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },

    // ❌ Aufgabe löschen
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
    },

    // 🔁 Status einer Aufgabe ändern
    changeTaskStatus(taskId, newStatus) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = newStatus
      }
    },
  },
})
