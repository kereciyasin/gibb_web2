<template>
  <div>
    <button @click="goHome">Home</button>
    <button @click="goBlog">Blog</button>

    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  // Navigiere zur Home-Seite
  router.push({ name: 'Home' })
}

function goBlog() {
  // Navigiere zur Blog-Seite
  router.push({ name: 'Blog' })
}
</script>
