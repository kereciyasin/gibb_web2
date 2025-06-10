<template>
  <div class="detail-page">
    <div class="detail-card">
      <h1>Aufgabendetail</h1>
      <form @submit.prevent="save">
        <label for="title">Titel</label>
        <input
          id="title"
          v-model="task.title"
          type="text"
          required
          placeholder="Titel"
        />

        <label for="desc">Beschreibung</label>
        <textarea
          id="desc"
          v-model="task.description"
          rows="3"
          required
          placeholder="Beschreibung"
        ></textarea>

        <label for="status">Status</label>
        <select id="status" v-model="task.status">
          <option v-for="status in statuses" :key="status" :value="status">
            {{ statusLabels[status] }}
          </option>
        </select>

        <div class="actions">
          <button class="save-btn" type="submit">Speichern</button>
          <router-link class="back-link" :to="'/'">Zurück zum Board</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../store/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const statuses = ['todo', 'in-progress', 'done']
const statusLabels = {
  'todo': 'Zu erledigen',
  'in-progress': 'In Arbeit',
  'done': 'Erledigt'
}
const task = ref({ title: '', description: '', status: statuses[0] })

onMounted(() => {
  const id = parseInt(route.params.id)
  const found = taskStore.tasks.find(t => t.id === id)
  if (found) task.value = { ...found }
})

function save() {
  taskStore.deleteTask(task.value.id)
  taskStore.addTask({ ...task.value })
  router.push('/')
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f3f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(44,62,80,0.09);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  min-width: 420px;
  max-width: 95vw;
}
.detail-card h1 {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: -1px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
label {
  color: #1565c0;
  font-weight: 500;
  font-size: 1.07em;
  margin-bottom: 0.2em;
}
input,
textarea,
select {
  border: 1.2px solid #cfd8dc;
  border-radius: 7px;
  padding: 0.7em 1em;
  font-size: 1em;
  background: #f7fafc;
  transition: border 0.2s;
}
input:focus,
textarea:focus,
select:focus {
  border: 1.2px solid #1976d2;
  outline: none;
}
.actions {
  display: flex;
  gap: 1.1rem;
  margin-top: 1rem;
  align-items: center;
}
.save-btn {
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.7em 2em;
  font-size: 1.08em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.16s;
}
.save-btn:hover {
  background: #1976d2;
}
.back-link {
  color: #1976d2;
  font-size: 1.06em;
  text-decoration: none;
  margin-left: 0.5em;
  transition: color 0.15s;
}
.back-link:hover {
  text-decoration: underline;
  color: #0d47a1;
}
@media (max-width: 600px) {
  .detail-card {
    min-width: unset;
    padding: 1.5rem !important;
  }
  .detail-card h1 {
    font-size: 1.5rem;
  }
}
</style>