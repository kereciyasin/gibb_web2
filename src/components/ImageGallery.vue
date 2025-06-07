<template>
  <div class="gallery">
    <div class="main-image">
      <img :src="aktuellesBild" alt="Aktuelles Bild" @click="bildAusgewählt(aktuellerIndex)" />
    </div>
    <div class="thumbnails">
      <img
        v-for="(bild, index) in images"
        :key="index"
        :src="bild"
        :class="{ active: index === aktuellerIndex }"
        @click="aktuellesSetzen(index)"
      />
    </div>
  </div>
</template>

<script setup>
// Reaktive Werte importieren
import { ref, computed } from 'vue'

// Props definieren
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})

// Emits definieren
const emit = defineEmits(['bildKlick'])

// Aktueller Index und aktuelles Bild
const aktuellerIndex = ref(0)
const aktuellesBild = computed(() => props.images[aktuellerIndex.value])

// Funktion zum Wechseln des Bildes
function aktuellesSetzen(index) {
  aktuellerIndex.value = index
  emit('bildKlick', index)
}

// Funktion bei Klick auf Hauptbild
function bildAusgewählt(index) {
  emit('bildKlick', index)
}
</script>

<style scoped>
.gallery {
  max-width: 600px;
  margin: auto;
}

.main-image img {
  width: 100%;
  border: 2px solid #333;
  margin-bottom: 10px;
  cursor: pointer;
}

.thumbnails {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.thumbnails img {
  width: 80px;
  border: 2px solid transparent;
  cursor: pointer;
}

.thumbnails img.active {
  border-color: #007bff;
}
</style>
