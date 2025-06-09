<template>
  <div class="container py-4">
    <h1 class="mb-3">Aufgabe {{ id }} bearbeiten</h1>
    <form @submit.prevent="speichern" class="row g-3">
      <!-- Titel-Feld -->
      <div class="col-12 col-md-6">
        <label class="form-label">Titel</label>
        <input v-model="titel" class="form-control" required />
      </div>
      <!-- Status-Auswahl -->
      <div class="col-12 col-md-6">
        <label class="form-label">Status</label>
        <select v-model="status" class="form-select">
          <option value="todo">Zu erledigen</option>
          <option value="in-progress">In Arbeit</option>
          <option value="done">Erledigt</option>
        </select>
      </div>
      <!-- Beschreibungstext -->
      <div class="col-12">
        <label class="form-label">Beschreibung</label>
        <textarea
          v-model="beschreibung"
          class="form-control"
          rows="3"
        ></textarea>
      </div>
      <!-- Deadline-Datum -->
      <div class="col-12 col-md-6">
        <label class="form-label">Deadline</label>
        <input
          v-model="deadline"
          type="date"
          class="form-control"
        />
      </div>
      <!-- Aktions-Buttons -->
      <div class="col-12 d-flex gap-2">
        <button type="submit" class="btn btn-success">Speichern</button>
        <button type="button" class="btn btn-danger" @click="loeschen">
          Löschen
        </button>
        <router-link to="/" class="btn btn-secondary">Abbrechen</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../store/taskStore'

export default {
  name: 'TaskDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const taskStore = useTaskStore()

    // ID aus den Routen-Parametern extrahieren
    const id = computed(() => Number(route.params.id))

    // Aufgabe mit passender ID aus dem Store holen
    const task = computed(() =>
      taskStore.tasks.find(t => t.id === id.value)
    )

    // Reaktive Felder für Bearbeitung
    const editable = reactive({
      titel: '',
      beschreibung: '',
      status: '',
      deadline: ''
    })

    // Wenn die Aufgabe geladen ist, Felder füllen
    watch(
      task,
      (newTask) => {
        if (newTask) {
          editable.titel = newTask.titel
          editable.beschreibung = newTask.beschreibung
          editable.status = newTask.status
          editable.deadline = newTask.deadline || ''
        }
      },
      { immediate: true }
    )

    // Initial Tasks laden
    onMounted(() => {
      taskStore.fetchTasks()
    })

    // Änderungen speichern und zurück zum Board
    function speichern() {
      taskStore.updateTask({ id: id.value, ...editable })
      router.push({ name: 'Board' })
    }
    // Aufgabe löschen und zurück zum Board
    function loeschen() {
      taskStore.deleteTask(id.value)
      router.push({ name: 'Board' })
    }

    return {
      id,
      ...toRefs(editable),
      speichern,
      loeschen
    }
  }
}
</script>

<style scoped>
/* Keine zusätzlichen Stile nötig; Bootstrap übernimmt das Styling */
</style>
