<template>
  <div id="app">
    <!-- Navigation (kann bei Bedarf erweitert werden) -->
    <nav style="margin-bottom:1rem">
      <router-link to="/">Kanban-Board</router-link>
    </nav>
    <!-- Hier werden die jeweiligen Views je nach Route angezeigt -->
    <router-view />
  </div>
</template>

<script setup>
// Keine spezielle Logik notwendig – Vue Router steuert die Ansicht
</script>

<style>
/* Grundlegendes Styling für die App */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #eef2f3;
  min-height: 100vh;
  padding: 2rem;
}
nav {
  margin-bottom: 1rem;
}
nav a {
  text-decoration: none;
  color: #42b983;
  margin-right: 1rem;
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: #35495e;
}
</style>