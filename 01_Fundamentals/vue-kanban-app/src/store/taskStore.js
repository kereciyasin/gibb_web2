// store/taskStore.js

import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    // Liste aller Aufgaben
    tasks: [],
  }),
  actions: {
    // Aufgaben initial laden (z. B. von einer API oder simuliert)
    async fetchTasks() {
      this.tasks = [
        { id: 1, title: 'Aufgabe 1', description: 'Beschreibung 1', status: 'todo' },
        { id: 2, title: 'Aufgabe 2', description: 'Beschreibung 2', status: 'in-progress' },
        { id: 3, title: 'Aufgabe 3', description: 'Beschreibung 3', status: 'done' },
      ]
    },

    // Neue Aufgabe hinzufügen
    addTask(newTask) {
      this.tasks.push(newTask)
    },

    // Bestehende Aufgabe aktualisieren
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },

    // Aufgabe löschen
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    },

    // Aufgabenstatus ändern
    changeTaskStatus(taskId, newStatus) {
      const task = this.tasks.find(task => task.id === taskId)
      if (task) {
        task.status = newStatus
      }
    },
  },
})
