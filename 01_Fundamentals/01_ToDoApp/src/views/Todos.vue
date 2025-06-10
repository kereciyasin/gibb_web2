<template>
  <!-- Alert-Komponente anzeigen -->
  <Alert />
  <CreateTodo class="pt-5" />
  <ListTodos />
</template>

<script setup>
import Alert from '@/components/Alert.vue'
import CreateTodo from '@/components/CreateTodo.vue'
import ListTodos from '@/components/ListTodos.vue'
</script>