<template>
  <div class="task-detail container mt-4">
    <h2>Aufgabendetails</h2>

    <div v-if="task">
      <!-- 📌 Bearbeiten Formular -->
      <form @submit.prevent="speichereÄnderungen">
        <div class="form-group mb-2">
          <label for="title"><strong>Titel</strong></label>
          <input
            v-model="editableTask.title"
            type="text"
            id="title"
            class="form-control"
            required
          />
        </div>

        <div class="form-group mb-2">
          <label for="description"><strong>Beschreibung</strong></label>
          <textarea
            v-model="editableTask.description"
            id="description"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-group mb-3">
          <label for="status"><strong>Status</strong></label>
          <select
            v-model="editableTask.status"
            id="status"
            class="form-control"
          >
            <option value="todo">Zu erledigen</option>
            <option value="in-progress">In Arbeit</option>
            <option value="done">Erledigt</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary me-2">
          Speichern
        </button>
        <button @click.prevent="löscheAufgabe" class="btn btn-danger">
          Löschen
        </button>
      </form>
    </div>

    <div v-else>
      <p>Aufgabe nicht gefunden.</p>
    </div>
  </div>
</template>

<script setup>
// 📦 Import von Vue Router und Pinia Store
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { computed, reactive, toRefs, onMounted } from 'vue'

// 🔍 Route-Parameter auslesen
const route = useRoute()
// 🔗 Router-Instanz für Navigation
const router = useRouter()
// 🏪 Store-Instanz initialisieren
const taskStore = useTaskStore()

// 🗃️ Reaktive Kopie der Aufgabe für Editierbarkeit
const editableTask = reactive({
  id: null,
  title: '',
  description: '',
  status: '',
})

// 🔎 Ursprungs-Aufgabe als computed
const task = computed(() =>
  taskStore.tasks.find(t => t.id === parseInt(route.params.id))
)

// 🔄 Beim Laden Werte in editableTask kopieren
onMounted(() => {
  if (task.value) {
    Object.assign(editableTask, task.value)
  }
})

// 💾 Änderungen speichern (Store updaten und zurück navigieren)
function speichereÄnderungen() {
  taskStore.updateTask({ ...editableTask })
  router.push('/kanban')
}

// 🗑️ Aufgabe löschen (Store action ve Kanban’a geri dön)
function löscheAufgabe() {
  taskStore.deleteTask(editableTask.id)
  router.push('/kanban')
}
</script>

<style scoped>
.task-detail {
  max-width: 600px;
  margin: 0 auto;
}
</style>
