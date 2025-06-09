<template>
  <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-success text-white text-center">
        <h2 class="mb-0">Neue Aufgabe hinzufügen</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="hinzufuegen" class="row g-3">
          <!-- Titel -->
          <div class="col-12 col-md-6">
            <label class="form-label">Titel</label>
            <input
              v-model="neueAufgabe.titel"
              class="form-control"
              placeholder="Titel der Aufgabe"
              @input="validateTitel"
              :class="{ 'is-invalid': titelError }"
              required
            />
            <div class="invalid-feedback">{{ titelError }}</div>
          </div>
          <!-- Beschreibung -->
          <div class="col-12 col-md-6">
            <label class="form-label">Beschreibung</label>
            <input
              v-model="neueAufgabe.beschreibung"
              class="form-control"
              placeholder="Beschreibung"
            />
          </div>
          <!-- Status -->
          <div class="col-12 col-md-4">
            <label class="form-label">Status</label>
            <select v-model="neueAufgabe.status" class="form-select">
              <option value="todo">Zu erledigen</option>
              <option value="in-progress">In Arbeit</option>
              <option value="done">Erledigt</option>
            </select>
          </div>
          <!-- Deadline -->
          <div class="col-12 col-md-4">
            <label class="form-label">Deadline</label>
            <input
              v-model="neueAufgabe.deadline"
              type="date"
              class="form-control"
            />
          </div>
          <!-- Buttons -->
          <div class="col-12 col-md-4 d-flex justify-content-end gap-2">
            <router-link to="/" class="btn btn-outline-secondary">
              Abbrechen
            </router-link>
            <button
              type="submit"
              class="btn btn-success"
              :disabled="!!titelError"
            >
              Hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useTaskStore } from '../store/taskStore'
import { useRouter } from 'vue-router'

export default {
  name: 'AddTask',
  setup() {
    const taskStore = useTaskStore()
    const router = useRouter()

    const neueAufgabe = reactive({
      titel: '',
      beschreibung: '',
      status: 'todo',
      deadline: ''
    })
    const titelError = ref('')

    function validateTitel() {
      titelError.value =
        neueAufgabe.titel.trim().length < 3
          ? 'Mindestens 3 Zeichen erforderlich.'
          : ''
    }

    function hinzufuegen() {
      validateTitel()
      if (titelError.value) return
      taskStore.addTask({ ...neueAufgabe })
      router.push({ name: 'Board' })
    }

    return { neueAufgabe, titelError, validateTitel, hinzufuegen }
  }
}
</script>

<style scoped>
.card:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease;
}
</style>
