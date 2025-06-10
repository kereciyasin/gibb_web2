import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    todos: [],
    alert: {
      show: false,
      message: ''
    }
  }),
  actions: {
    addTodo(content) {
      // Yeni todo'ya tarih ekle!
      const now = new Date()
      const date = now.toLocaleDateString('de-CH') // 31.05.2025
      const time = now.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' }) // 13:28
      this.todos.push({
        id: Date.now(),
        content,
        created: `${date} - ${time}`
      })
      this.showAlert('Neues Todo hinzugefügt!')
    },
    updateTodo(id, content) {
      const todo = this.todos.find(t => t.id == id)
      if (todo) {
        todo.content = content
        this.showAlert('Todo erfolgreich aktualisiert!')
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id != id)
      this.showAlert('Todo erfolgreich gelöscht!')
    },
    showAlert(message) {
      this.alert.show = true
      this.alert.message = message
      setTimeout(() => {
        this.alert.show = false
        this.alert.message = ''
      }, 3000)
    }
  },
  getters: {
    getAlert(state) {
      return state.alert
    },
    getTodos(state) {
      return state.todos
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(t => t.id == id)
    },
    getCurrentDate() {
      const now = new Date()
      const date = now.toLocaleDateString('de-CH')
      const time = now.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })
      return `${date} - ${time}`
    }
  }
})