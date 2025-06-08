<template>
  <div class="home container text-center mt-5">
    <!-- Haupttitel -->
    <h1 class="display-4 mb-3">Willkommen zur Kanban-App</h1>
    <!-- Untertitel -->
    <p class="lead mb-4">
      Organisiere deine Aufgaben bequem in Spalten und behalte immer den Überblick.
    </p>
    <!-- Call-to-Action Button -->
    <button @click="goKanban" class="btn btn-primary btn-lg">
      Zum Kanban-Board
    </button>
  </div>
</template>

<script setup>
// 📦 Vue Router Hook importieren
import { useRouter } from 'vue-router'

// 🔗 Router-Instanz holen
const router = useRouter()

// 🔀 Navigations-Funktion
function goKanban() {
  // Navigiere zur Kanban-Ansicht
  router.push({ name: 'Kanban' })
}
</script>

<style scoped>
.home {
  /* Hintergrundfarbe und abgerundete Ecken */
  background: #f8f9fa;
  padding: 60px 20px;
  border-radius: 8px;
}
</style>
