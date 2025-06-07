<template>
  <div id="app">
    <h1>Meine Einkaufsliste Anwendung</h1>

    <!-- Einkaufsliste-Komponente wird eingebunden -->
    <Einkaufsliste />
  </div>
</template>

<script setup>
// Einkaufsliste-Komponente importieren
import Einkaufsliste from './components/Einkaufsliste.vue'
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 40px;
}
</style>
