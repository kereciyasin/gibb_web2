<template>
  <div class="container" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
  <div v-else class="container">
    <p>Beitrag nicht gefunden.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import posts from '../data/posts.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = computed(() =>
  posts.find(p => p.id === route.params.id)
)
</script>
