<template>
  <div class="kanban-board container mt-5">
    <h1 class="mb-4">Kanban Aufgabenboard</h1>

    <!-- Formular zum Hinzufügen neuer Aufgaben -->
    <TaskForm />

    <div class="row">
      <!-- Spalte: Zu erledigen -->
      <div class="col-md-4 mb-4">
        <h2 class="h5">Zu erledigen</h2>
        <div
          v-for="task in tasksByStatus('todo')"
          :key="task.id"
          class="card mb-3 shadow-sm"
        >
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <div class="d-flex justify-content-between">
              <!-- Details-Button -->
              <router-link
                :to="`/task/${task.id}`"
                class="btn btn-outline-primary btn-sm"
              >
                Details
              </router-link>
              <div>
                <!-- Statuswechsel-Buttons -->
                <button
                  @click="changeStatus(task.id, 'in-progress')"
                  class="btn btn-success btn-sm me-1"
                >
                  → In Arbeit
                </button>
                <button
                  @click="deleteTask(task.id)"
                  class="btn btn-danger btn-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spalte: In Arbeit -->
      <div class="col-md-4 mb-4">
        <h2 class="h5">In Arbeit</h2>
        <div
          v-for="task in tasksByStatus('in-progress')"
          :key="task.id"
          class="card mb-3 shadow-sm"
        >
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <div class="d-flex justify-content-between">
              <router-link
                :to="`/task/${task.id}`"
                class="btn btn-outline-primary btn-sm"
              >
                Details
              </router-link>
              <div>
                <button
                  @click="changeStatus(task.id, 'done')"
                  class="btn btn-warning btn-sm me-1"
                >
                  → Erledigt
                </button>
                <button
                  @click="changeStatus(task.id, 'todo')"
                  class="btn btn-secondary btn-sm me-1"
                >
                  ← Zurück
                </button>
                <button
                  @click="deleteTask(task.id)"
                  class="btn btn-danger btn-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spalte: Erledigt -->
      <div class="col-md-4 mb-4">
        <h2 class="h5">Erledigt</h2>
        <div
          v-for="task in tasksByStatus('done')"
          :key="task.id"
          class="card mb-3 shadow-sm"
        >
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <div class="d-flex justify-content-between">
              <router-link
                :to="`/task/${task.id}`"
                class="btn btn-outline-primary btn-sm"
              >
                Details
              </router-link>
              <div>
                <button
                  @click="changeStatus(task.id, 'in-progress')"
                  class="btn btn-secondary btn-sm me-1"
                >
                  ← Zurück
                </button>
                <button
                  @click="deleteTask(task.id)"
                  class="btn btn-danger btn-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 📦 Store importieren
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'
// 🧩 TaskForm importieren
import TaskForm from './TaskForm.vue'

// 🏪 Store-Instanz erstellen
const taskStore = useTaskStore()

// 🔃 Aufgaben initial laden
onMounted(() => {
  taskStore.fetchTasks()
})

// 🔍 Aufgaben nach Status filtern
function tasksByStatus(status) {
  return taskStore.tasks.filter(task => task.status === status)
}

// 🔁 Aufgabe in neuen Status verschieben
function changeStatus(id, newStatus) {
  taskStore.changeTaskStatus(id, newStatus)
}

// ❌ Aufgabe löschen
function deleteTask(id) {
  taskStore.deleteTask(id)
}
</script>

<style scoped>
.kanban-board {
  max-width: 1200px;
}
</style>
