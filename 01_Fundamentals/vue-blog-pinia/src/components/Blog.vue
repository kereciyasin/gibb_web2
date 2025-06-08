<template>
  <div class="container">
    <h1>Blog</h1>

    <!-- Eingabefeld für Suchbegriff -->
    <input v-model="suchBegriff" placeholder="Suche Blog-Posts..." class="form-control mb-3" />

    <!-- Liste der gefilterten Posts -->
    <ul>
      <li v-for="post in gefiltertePosts" :key="post.id">
        <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>

    <!-- Formular zum Hinzufügen eines neuen Posts -->
    <form @submit.prevent="postHinzufuegen" class="mt-4">
      <h3>Neuen Post hinzufügen</h3>
      <input v-model="neuerTitel" placeholder="Titel" class="form-control mb-2" required />
      <textarea v-model="neuerInhalt" placeholder="Inhalt" class="form-control mb-2" rows="3" required></textarea>
      <button type="submit" class="btn btn-primary">Hinzufügen</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostStore } from '@/store.js'

// Pinia Store initialisieren
const postStore = usePostStore()

// Reaktive Variablen
const suchBegriff = ref('')
const neuerTitel = ref('')
const neuerInhalt = ref('')

// Posts beim Laden der Komponente holen
onMounted(() => {
  postStore.fetchPosts()
})

// Gefilterte Posts basierend auf Suchbegriff
const gefiltertePosts = computed(() => {
  if (!suchBegriff.value) return postStore.posts
  return postStore.posts.filter(post =>
    post.title.toLowerCase().includes(suchBegriff.value.toLowerCase())
  )
})

// Funktion zum Hinzufügen eines neuen Posts
function postHinzufuegen() {
  if (neuerTitel.value.trim() && neuerInhalt.value.trim()) {
    const neuerPost = {
      id: String(postStore.posts.length + 1),
      title: neuerTitel.value,
      content: neuerInhalt.value,
    }
    postStore.addNewPost(neuerPost)
    neuerTitel.value = ''
    neuerInhalt.value = ''
  }
}
</script>
