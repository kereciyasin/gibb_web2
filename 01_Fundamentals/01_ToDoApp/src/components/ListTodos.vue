<template>
  <div class="row">
    <router-link
      v-for="todo in todos"
      :key="todo.id"
      :to="`/${todo.id}`"
      class="col-12 mb-3 text-decoration-none text-dark"
    >
      <div class="card shadow-sm rounded-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <span class="fw-bold fs-5">{{ todo.content }}</span>
          <span class="text-end">
            <span class="me-3">{{ todo.created }}</span>
            <span style="font-size: 1.5em;">&rarr;</span>
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/store.js'

const store = useStore()
const todos = computed(() => store.getTodos)
</script>