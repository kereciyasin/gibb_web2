<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">Mein Kanban-Brett</h1>
      <div class="d-flex align-items-center">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control me-2"
          placeholder="Aufgaben suchen..."
        />
        <router-link to="/add" class="btn btn-success">Neue Aufgabe</router-link>
      </div>
    </div>

    <div class="row gy-3">
      <div
        v-for="column in columns"
        :key="column.status"
        class="col-12 col-md-4"
        @dragover.prevent
        @drop="onDrop($event, column.status)"
      >
        <div class="card h-100 shadow-sm hover-card">
          <div class="card-header text-center bg-light">{{ column.name }}</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="task in filteredTasks(column.status)"
              :key="task.id"
              class="list-group-item d-flex justify-content-between align-items-start hover-item"
              draggable="true"
              @dragstart="onDragStart($event, task.id)"
            >
              <div>
                <strong>{{ task.titel }}</strong>
                <p class="mb-1 text-muted">{{ task.beschreibung }}</p>
                <p
                  class="mb-1"
                  :class="{
                    'text-danger': isPast(task.deadline),
                    'text-warning': isSoon(task.deadline),
                    'text-success': !isPast(task.deadline) && !isSoon(task.deadline)
                  }"
                >
                  Deadline: {{ formatDate(task.deadline) }}
                </p>
              </div>
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-sm btn-outline-secondary me-1 hover-btn"
                  v-if="column.status !== 'todo'"
                  @click="statusAendern(task.id, vorherigerStatus(column.status))"
                >&larr;</button>
                <button
                  class="btn btn-sm btn-outline-secondary me-1 hover-btn"
                  v-if="column.status !== 'done'"
                  @click="statusAendern(task.id, naechsterStatus(column.status))"
                >&rarr;</button>
                <button
                  class="btn btn-sm btn-outline-danger me-2 hover-btn"
                  @click="askDelete(task.id)"
                >Löschen</button>
                <router-link
                  :to="{ name: 'Detail', params: { id: task.id } }"
                  class="btn btn-sm btn-outline-primary hover-btn"
                >Details</router-link>
              </div>
            </li>
            <li
              v-if="filteredTasks(column.status).length === 0"
              class="list-group-item text-center text-muted"
            >
              Keine Aufgaben
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="modal-backdrop d-flex justify-content-center align-items-center"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Aufgabe löschen?</h5>
            <button type="button" class="btn-close" @click="cancelDelete"></button>
          </div>
          <div class="modal-body">
            Bist du sicher, dass du diese Aufgabe löschen möchtest?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="cancelDelete">Abbrechen</button>
            <button class="btn btn-danger" @click="confirmDelete">Löschen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../store/taskStore'

function formatDate(dateStr) {
  if (!dateStr) return '–'
  const d = new Date(dateStr)
  return d.toLocaleDateString()
}
function isPast(dateStr) {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}
function isSoon(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  const target = new Date(dateStr)
  const diff = (target - today) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= 3
}

export default {
  name: 'KanbanBoard',
  setup() {
    const taskStore = useTaskStore()
    onMounted(() => taskStore.fetchTasks())

    const searchTerm = ref('')

    const columns = [
      { name: 'Zu erledigen', status: 'todo' },
      { name: 'In Arbeit',      status: 'in-progress' },
      { name: 'Erledigt',       status: 'done' }
    ]

    function filteredTasks(status) {
      return taskStore.tasks
        .filter(t => t.status === status)
        .filter(t =>
          t.titel.toLowerCase().includes(searchTerm.value.trim().toLowerCase())
        )
    }

    function onDragStart(e, id) {
      e.dataTransfer.setData('text/plain', id)
    }
    function onDrop(e, status) {
      const id = Number(e.dataTransfer.getData('text/plain'))
      taskStore.changeTaskStatus(id, status)
    }

    const order = ['todo','in-progress','done']
    function vorherigerStatus(c) {
      const i = order.indexOf(c); return i>0?order[i-1]:c
    }
    function naechsterStatus(c) {
      const i = order.indexOf(c); return i<order.length-1?order[i+1]:c
    }
    function statusAendern(id, s) {
      taskStore.changeTaskStatus(id, s)
    }

    const showModal = ref(false)
    const pendingDeleteId = ref(null)
    function askDelete(id) {
      pendingDeleteId.value = id
      showModal.value = true
    }
    function cancelDelete() {
      pendingDeleteId.value = null
      showModal.value = false
    }
    function confirmDelete() {
      taskStore.deleteTask(pendingDeleteId.value)
      cancelDelete()
    }

    return {
      searchTerm, columns, filteredTasks,
      onDragStart, onDrop,
      vorherigerStatus, naechsterStatus, statusAendern,
      showModal, askDelete, cancelDelete, confirmDelete,
      formatDate, isPast, isSoon
    }
  }
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
.hover-item {
  transition: background-color 0.2s ease;
}
.hover-item:hover {
  background-color: #f8f9fa;
}
.hover-btn {
  transition: background-color 0.2s ease, color 0.2s ease;
}
.hover-btn:hover {
  background-color: #dc3545;
  color: #fff;
}
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1050;
}
.modal-dialog {
  max-width: 400px;
}
</style>
