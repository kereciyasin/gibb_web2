<template>
  <div class="todo-container">
    <h2>Meine ToDo-Liste</h2>

    <!-- Eingabefeld für neue Aufgaben -->
    <input v-model="neueAufgabe" @keyup.enter="aufgabeHinzufügen" placeholder="Neue Aufgabe eingeben..." />

    <!-- Button zum Hinzufügen -->
    <button @click="aufgabeHinzufügen">Hinzufügen</button>

    <!-- Aufgabenliste -->
    <ul>
      <li v-for="(aufgabe, index) in aufgaben" :key="index">
        {{ aufgabe }}
        <button @click="aufgabeEntfernen(index)">Entfernen</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Reaktive Werte mit Composition API importieren
import { ref } from 'vue'

// Eine neue Aufgabe als Eingabewert
const neueAufgabe = ref('')

// Liste aller Aufgaben
const aufgaben = ref([])

// Funktion zum Hinzufügen einer neuen Aufgabe
function aufgabeHinzufügen() {
  if (neueAufgabe.value.trim() !== '') {
    aufgaben.value.push(neueAufgabe.value.trim())
    neueAufgabe.value = ''
  }
}

// Funktion zum Entfernen einer Aufgabe (nach Index)
function aufgabeEntfernen(index) {
  aufgaben.value.splice(index, 1)
}
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

input {
  padding: 8px;
  width: 70%;
  margin-right: 8px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
