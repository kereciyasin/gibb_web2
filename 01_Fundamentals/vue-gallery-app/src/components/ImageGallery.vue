<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-12 mb-3">
        <h2 class="text-center">Bildergalerie</h2>
      </div>
      <div class="col-md-8 offset-md-2">
        <div class="main-image mb-3">
          <img
            :src="aktuellesBild"
            alt="Aktuelles Bild"
            @click="bildAngeklickt(aktuellerIndex)"
            class="img-fluid rounded border"
            style="cursor: pointer;"
          />
        </div>
        <div class="d-flex justify-content-center gap-2">
          <img
            v-for="(bild, index) in images"
            :key="index"
            :src="bild"
            :class="['img-thumbnail', { 'border-primary': index === aktuellerIndex }]"
            style="width: 80px; cursor: pointer;"
            @click="aktuellesBildSetzen(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['bildKlick'])

const aktuellerIndex = ref(0)

const aktuellesBild = computed(() => props.images[aktuellerIndex.value])

function aktuellesBildSetzen(index) {
  aktuellerIndex.value = index
  emit('bildKlick', index)
}

function bildAngeklickt(index) {
  emit('bildKlick', index)
}
</script>

<style scoped>
/* Artık çok az özel stil yeterli */
</style>
