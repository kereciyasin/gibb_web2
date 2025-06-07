<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Meine Bildergalerie</h1>
    <ImageGallery :images="bilder" @bildKlick="bildGeklickt" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageGallery from './components/ImageGallery.vue'

const bilder = ref([
  'https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=600&h=400',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400',
  'https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=600&h=400',
  'https://images.unsplash.com/photo-1531177071257-e7f851fc6ebd?w=600&h=400',
])


function bildGeklickt(index) {
  console.log('Bild wurde angeklickt:', index)
}
</script>

<style scoped>
/* Opsiyonel ek stiller buraya */
</style>
