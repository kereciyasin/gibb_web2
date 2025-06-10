<template>
  <div v-if="todo" class="container pt-5">
    <button class="btn btn-primary mb-4" @click="goBack">
      &larr;
    </button>
    <div class="card shadow-sm rounded-3">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span></span>
          <span class="fs-5">
            Todo erstellt am: <b>{{ todo.created }}</b>
          </span>
        </div>
        <input
          v-model="todoContent"
          class="form-control mb-3"
          type="text"
        />
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger me-3" @click="removeTodo">
            <span style="font-size: 1.5em;">&#10006;</span>
          </button>
          <button class="btn btn-success" @click="updateTodo">
            <span style="font-size: 1.5em;">&#10004;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Todo nicht gefunden.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from '../stores/store.js'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const todo = computed(() => store.getTodoById(route.params.id))
const todoContent = ref(todo.value ? todo.value.content : '')
watch(todo, (val) => {
  if (val) todoContent.value = val.content
})

const updateTodo = () => {
  if (todo.value) {
    store.updateTodo(todo.value.id, todoContent.value)
    router.push({ name: 'home' })
  }
}
const removeTodo = () => {
  if (todo.value) {
    store.deleteTodo(todo.value.id)
    router.push({ name: 'home' })
  }
}
const goBack = () => router.push({ name: 'home' })
</script>