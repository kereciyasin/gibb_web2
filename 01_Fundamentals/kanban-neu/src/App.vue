<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark px-3">
      <router-link to="/" class="navbar-brand">Kanban</router-link>
      <router-link to="/add" class="btn btn-success ms-auto">+ Aufgabe</router-link>
    </nav>
    <main class="container py-4">
      <!-- İşte burada route içerikleri geliyor -->
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100%;
}
</style>
