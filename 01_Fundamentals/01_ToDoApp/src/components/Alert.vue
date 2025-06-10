<template>
  <!-- Bootstrap Success-Alert für 3 Sekunden anzeigen -->
  <div v-if="state.show" class="alert alert-success mt-4" role="alert">
    {{ state.message }}
  </div>
</template>

<script setup>
// Importieren von reactive und store
import { computed } from 'vue'
import { useStore } from '../stores/store.js'

// Zugriff auf den Store
const store = useStore()

// Computed Property für Alert State
const state = computed(() => store.getAlert)
</script>