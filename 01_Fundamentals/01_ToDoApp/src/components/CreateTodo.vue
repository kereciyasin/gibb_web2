<template>
  <!-- Bootstrap 5 Formular zum Hinzufügen eines neuen Todos -->
  <form class="row g-2 pb-5" @submit.prevent="addTodo">
    <div class="col-auto">
      <input
        v-model="newTodo"
        type="text"
        class="form-control"
        placeholder="Neues Todo eingeben"
      />
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">
        Hinzufügen
      </button>
    </div>
  </form>
</template>

<script setup>
// Importieren von ref und Store
import { ref } from 'vue'
import { useStore } from '../stores/store.js'

// Lokaler State für das neue Todo
const newTodo = ref('')

// Zugriff auf den Store
const store = useStore()

// Methode zum Hinzufügen eines neuen Todos
const addTodo = () => {
  // Prüfen, ob das Feld nicht leer ist
  if (newTodo.value.trim() !== '') {
    // Neues Todo an den Store übergeben
    store.addTodo(newTodo.value.trim())
    // Das Eingabefeld leeren
    newTodo.value = ''
    // Optional: Alert anzeigen (wird im Store gemacht)
  }
}
</script>