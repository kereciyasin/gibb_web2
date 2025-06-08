<template>
  <nav class="navbar navbar-expand bg-light p-3 mb-4">
    <div class="container">
      <button @click="goHome" class="btn btn-primary me-2">Home</button>
      <button @click="goBlog" class="btn btn-secondary">Blog</button>
    </div>
  </nav>

  <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}

function goBlog() {
  router.push('/blog')
}
</script>
