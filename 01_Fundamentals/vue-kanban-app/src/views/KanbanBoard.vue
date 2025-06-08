<!-- src/views/KanbanBoard.vue -->

<template>
  <div class="container">
    <h1>Kanban-Board</h1>
    <!-- Spalten für Aufgabenstatus -->
    <div class="row">
      <div class="col">
        <h3>Zu erledigen</h3>
        <!-- Aufgaben mit Status "todo" hier anzeigen -->
      </div>
      <div class="col">
        <h3>In Arbeit</h3>
        <!-- Aufgaben mit Status "in-progress" hier anzeigen -->
      </div>
      <div class="col">
        <h3>Erledigt</h3>
        <!-- Aufgaben mit Status "done" hier anzeigen -->
      </div>
    </div>
  </div>
</template>

<script setup>
// Noch keine Logik – folgt später
</script>
