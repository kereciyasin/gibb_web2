<template>
  <div class="einkaufsliste-container">
    <h2>Meine Einkaufsliste</h2>

    <!-- Eingabefeld für neue Produkte -->
    <input
      v-model="neuesProdukt"
      @keyup.enter="produktHinzufügen"
      placeholder="Neues Produkt eingeben..."
    />

    <button @click="produktHinzufügen">Hinzufügen</button>

    <!-- Produktliste -->
    <ul>
      <li v-for="(produkt, index) in produkte" :key="index">
        {{ produkt }}
        <button @click="produktEntfernen(index)">Entfernen</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Importiere die reaktiven Funktionen aus Vue
import { ref } from 'vue'

// Der Eingabewert für das neue Produkt
const neuesProdukt = ref('')

// Die Liste aller Produkte
const produkte = ref([])

// Fügt ein neues Produkt zur Liste hinzu
function produktHinzufügen() {
  if (neuesProdukt.value.trim() !== '') {
    produkte.value.push(neuesProdukt.value.trim())
    neuesProdukt.value = ''
  }
}

// Entfernt ein Produkt aus der Liste (nach Index)
function produktEntfernen(index) {
  produkte.value.splice(index, 1)
}
</script>

<style scoped>
.einkaufsliste-container {
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
