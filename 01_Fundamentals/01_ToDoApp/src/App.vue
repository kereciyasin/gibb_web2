<template>

  <div class="d-flex flex-column min-vh-100">

    <Header />

    <main class="container">
      <RouterView />
    </main>

  </div>

</template>

<script setup>
import Header from "@/components/layouts/Header.vue";
</script>
