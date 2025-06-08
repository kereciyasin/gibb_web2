<template>
  <div class="container">
    <h1>Blog</h1>
    <input v-model="searchTerm" placeholder="Suche Blog-Posts..." class="form-control mb-3" />

    <ul>
      <li v-for="post in paginiertePosts" :key="post.id">
        <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>

    <div class="mt-3">
      <button class="btn btn-secondary me-2" @click="vorherigeSeite" :disabled="seite === 1">
        Zurück
      </button>
      <button class="btn btn-secondary" @click="naechsteSeite" :disabled="seite === maxSeite">
        Weiter
      </button>
    </div>

    <p class="mt-2">Seite {{ seite }} von {{ maxSeite }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import posts from '../data/posts.js'

const searchTerm = ref('')
const seite = ref(1)
const postsProSeite = 3

// Gefilterte Posts nach Suchbegriff
const gefiltertePosts = computed(() => {
  if (!searchTerm.value) return posts
  return posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Maximale Seitenanzahl berechnen
const maxSeite = computed(() =>
  Math.ceil(gefiltertePosts.value.length / postsProSeite)
)

// Pagination: Posts der aktuellen Seite
const paginiertePosts = computed(() => {
  const start = (seite.value - 1) * postsProSeite
  return gefiltertePosts.value.slice(start, start + postsProSeite)
})

// Seiten wechseln
function naechsteSeite() {
  if (seite.value < maxSeite.value) {
    seite.value++
  }
}

function vorherigeSeite() {
  if (seite.value > 1) {
    seite.value--
  }
}
</script>
