import { defineStore } from 'pinia'

// Pinia Store für Aufgabenverwaltung
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: []
  }),
  persist: true, // State wird in localStorage gespeichert
  actions: {
    // Initiale Aufgaben laden (simuliert)
    async fetchTasks() {
      if (!this.tasks.length) {
        this.tasks = [
          { id: 1, titel: 'Aufgabe 1', beschreibung: 'Beschreibung 1', status: 'todo', deadline: '' },
          { id: 2, titel: 'Aufgabe 2', beschreibung: 'Beschreibung 2', status: 'in-progress', deadline: '' },
          { id: 3, titel: 'Aufgabe 3', beschreibung: 'Beschreibung 3', status: 'done', deadline: '' }
        ]
      }
    },
    // Neue Aufgabe hinzufügen
    addTask(neueAufgabe) {
      const neueId = this.tasks.length
        ? Math.max(...this.tasks.map(a => a.id)) + 1
        : 1
      this.tasks.push({ id: neueId, ...neueAufgabe })
    },
    // Aufgabe aktualisieren
    updateTask(aktualisierteAufgabe) {
      const idx = this.tasks.findIndex(a => a.id === aktualisierteAufgabe.id)
      if (idx !== -1) this.tasks[idx] = { ...this.tasks[idx], ...aktualisierteAufgabe }
    },
    // Aufgabe löschen
    deleteTask(id) {
      this.tasks = this.tasks.filter(a => a.id !== id)
    },
    // Status ändern
    changeTaskStatus(id, neuerStatus) {
      const aufgabe = this.tasks.find(a => a.id === id)
      if (aufgabe) aufgabe.status = neuerStatus
    }
  }
})
