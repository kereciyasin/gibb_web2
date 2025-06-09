<template>
  <div class="container py-4">
    <h1 class="mb-3">Aufgabe {{ id }} bearbeiten</h1>
    <form @submit.prevent="speichern" class="row g-3">
      <div class="col-12 col-md-6">
        <label class="form-label">Titel</label>
        <input v-model="titel" class="form-control" required />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Status</label>
        <select v-model="status" class="form-select">
          <option value="todo">Zu erledigen</option>
          <option value="in-progress">In Arbeit</option>
          <option value="done">Erledigt</option>
        </select>
      </div>
      <div class="col-12">
        <label class="form-label">Beschreibung</label>
        <textarea v-model="beschreibung" class="form-control" rows="3"></textarea>
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Deadline</label>
        <input v-model="deadline" type="date" class="form-control" />
      </div>
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

    // ID parametresi ve ilgili görev
    const id = computed(() => Number(route.params.id))
    const task = computed(() =>
      taskStore.tasks.find(t => t.id === id.value)
    )

    // Editable alanlar
    const editable = reactive({
      titel: '',
      beschreibung: '',
      status: '',
      deadline: ''
    })

    // task yüklendiğinde editable'ı doldur
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

    // Store'dan görevleri getir
    onMounted(() => {
      taskStore.fetchTasks()
    })

    function speichern() {
      taskStore.updateTask({ id: id.value, ...editable })
      router.push({ name: 'Board' })
    }
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
/* Bootstrap stile bırakıldı */
</style>
