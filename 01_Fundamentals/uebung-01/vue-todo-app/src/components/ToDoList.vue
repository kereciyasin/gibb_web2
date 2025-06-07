<template>
  <div class="todo-container">
    <h2>Meine ToDo-Liste (API)</h2>

    <!-- Eingabefeld für neue Aufgaben -->
    <input
      v-model="neueAufgabe"
      @keyup.enter="aufgabeHinzufügen"
      placeholder="Neue Aufgabe eingeben..."
    />
    <button @click="aufgabeHinzufügen">Hinzufügen</button>

    <!-- Aufgabenliste -->
    <ul>
      <li v-for="aufgabe in aufgaben" :key="aufgabe.id">
        {{ aufgabe.text }}
        <button @click="aufgabeLöschen(aufgabe.id)">Entfernen</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Importiere benötigte Funktionen aus Vue
import { ref, onMounted } from 'vue'

// API-Endpunkt (Backend muss laufen!)
const API_URL = 'http://localhost:3000/api/todos'

// Reaktive Zustände
const aufgaben = ref([])
const neueAufgabe = ref('')

// Aufgaben vom Server laden
async function aufgabenLaden() {
  try {
    const res = await fetch(API_URL)
    const daten = await res.json()
    aufgaben.value = daten
  } catch (err) {
    console.error('Fehler beim Laden:', err)
  }
}

// Neue Aufgabe hinzufügen (POST)
async function aufgabeHinzufügen() {
  if (neueAufgabe.value.trim() === '') return

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: neueAufgabe.value.trim() }),
    })

    const neue = await res.json()
    aufgaben.value.push(neue)
    neueAufgabe.value = ''
  } catch (err) {
    console.error('Fehler beim Hinzufügen:', err)
  }
}

// Aufgabe löschen (DELETE)
async function aufgabeLöschen(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })

    aufgaben.value = aufgaben.value.filter((a) => a.id !== id)
  } catch (err) {
    console.error('Fehler beim Löschen:', err)
  }
}

// Daten beim Start laden
onMounted(() => {
  aufgabenLaden()
})
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
