<template>
  <div class="task-form">
    <h2>Neue Aufgabe erstellen</h2>
    <form @submit.prevent="submitTask">
      <div class="form-group">
        <label for="title">Titel</label>
        <input v-model="form.title" type="text" id="title" required />
      </div>

      <div class="form-group">
        <label for="description">Beschreibung</label>
        <textarea v-model="form.description" id="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status">
          <option value="todo">Zu erledigen</option>
          <option value="in-progress">In Arbeit</option>
          <option value="done">Erledigt</option>
        </select>
      </div>

      <button type="submit">Aufgabe hinzufügen</button>
    </form>
  </div>
</template>

<script setup>
// 📦 Pinia-Store importieren
import { useTaskStore } from '@/stores/taskStore'
// 🛠️ Reaktive Werte definieren
import { reactive } from 'vue'

// 🏪 Zugriff auf den Task-Store
const taskStore = useTaskStore()

// 📝 Lokales Formularmodell
const form = reactive({
  title: '',
  description: '',
  status: 'todo',
})

// 📨 Neue Aufgabe zum Store hinzufügen
function submitTask() {
  const newTask = {
    id: Date.now(), // einfache eindeutige ID
    title: form.title,
    description: form.description,
    status: form.status,
  }

  taskStore.addTask(newTask)

  // 🧹 Formular zurücksetzen
  form.title = ''
  form.description = ''
  form.status = 'todo'
}
</script>

<style scoped>
.task-form {
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
