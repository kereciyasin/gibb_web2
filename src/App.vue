<template>
  <div>
    <h1>Bildergalerie</h1>
    <ImageGallery :images="bilder" @bildKlick="bildGeklickt" />
  </div>
</template>

<script setup>
// Bild-URLs definieren
import { ref } from 'vue'
import ImageGallery from './components/ImageGallery.vue'

// Beispiel-Bilder
const bilder = ref([
  'https://images.unsplash.com/photo-1584395630827-860eee694d7b',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1494173853739-c21f58b16055',
  'https://images.unsplash.com/photo-1531177071257-e7f851fc6ebd',
])

// Event-Handler für Bildklick
function bildGeklickt(index) {
  console.log('Bild wurde angeklickt:', index)
}
</script>
