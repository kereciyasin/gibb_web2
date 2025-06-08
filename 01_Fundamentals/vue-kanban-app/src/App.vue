<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 🗺️ Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" href="#">KanbanApp</a>
        <!-- Toggler für mobile Ansicht -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menüler -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <!-- Aktive Route automatisch vurgulansın -->
              <RouterLink
                to="/kanban"
                class="nav-link"
                :class="{ active: $route.name === 'Kanban' }"
              >
                Kanban
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                to="/"
                class="nav-link"
                :class="{ active: $route.name === 'Home' }"
              >
                Home
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 📌 Router View -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// Keine zusätzliche Logik notwendig
</script>

<style>

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
