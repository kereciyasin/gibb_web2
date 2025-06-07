<template>
  <div id="app">
    <h1>Meine Demo-Single-Page-Anwendung</h1>

    <!-- ToDoList-Komponente wird eingebunden -->
    <ToDoList />
  </div>
</template>

<script setup>
// ToDoList-Komponente importieren
import ToDoList from './components/ToDoList.vue'
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 40px;
}
</style>
