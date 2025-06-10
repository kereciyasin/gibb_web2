<template>
  <div class="kanban-board">
    <h1>Kanban-Board</h1>
    <button class="add-btn" @click="showAddTask = !showAddTask">
      Neue Aufgabe hinzufügen
    </button>
    <div v-if="showAddTask" class="add-task-form">
      <input v-model="newTask.title" placeholder="Titel" />
      <input v-model="newTask.description" placeholder="Beschreibung" />
      <select v-model="newTask.status">
        <option v-for="status in statuses" :key="status" :value="status">
          {{ statusLabels[status] }}
        </option>
      </select>
      <button @click="addTask">Speichern</button>
    </div>
    <div class="columns">
      <div
        class="column"
        v-for="status in statuses"
        :key="status"
        @dragover.prevent
        @drop="onDrop($event, status)"
      >
        <h2>{{ statusLabels[status] }}</h2>
        <TaskCard
          v-for="task in filteredTasks(status)"
          :key="task.id"
          :task="task"
          :statuses="statuses"
          :status-labels="statusLabels"
          @changestatus="changeStatus"
          @delete="deleteTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../store/taskStore'
import TaskCard from '../components/TaskCard.vue'

const showAddTask = ref(false)
const statuses = ['todo', 'in-progress', 'done']
const statusLabels = {
  'todo': 'Zu erledigen',
  'in-progress': 'In Arbeit',
  'done': 'Erledigt'
}
const newTask = ref({ title: '', description: '', status: statuses[0] })
const taskStore = useTaskStore()
onMounted(() => {
  taskStore.fetchTasks()
})
function filteredTasks(status) {
  return taskStore.tasks.filter(t => t.status === status)
}
function addTask() {
  if (!newTask.value.title) return
  taskStore.addTask({ ...newTask.value })
  newTask.value.title = ''
  newTask.value.description = ''
  newTask.value.status = statuses[0]
  showAddTask.value = false
}
function changeStatus(id, status) {
  taskStore.changeTaskStatus(id, status)
}
function deleteTask(id) {
  taskStore.deleteTask(id)
}
function onDrop(evt, status) {
  const id = parseInt(evt.dataTransfer.getData('text/plain'))
  if (!isNaN(id)) {
    changeStatus(id, status)
  }
}
</script>

<style scoped>
.kanban-board {
  max-width: 1200px;
  margin: 0 auto;
}
.add-btn {
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 1rem;
}
.add-btn:hover {
  background: #1976d2;
}
.add-task-form {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5em;
  align-items: center;
}
.add-task-form input, .add-task-form select {
  padding: 0.45em 0.8em;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
}
.columns {
  display: flex;
  gap: 1.5rem;
}
.column {
  background: #f4f7fa;
  padding: 1.1rem;
  border-radius: 10px;
  flex: 1;
  min-width: 280px;
  min-height: 400px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  transition: box-shadow 0.2s;
}
.column h2 {
  color: #1565c0;
  font-size: 1.25em;
  margin-bottom: 1.2rem;
}
</style>