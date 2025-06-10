import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views/Todos.vue'
import Todo from '../views/Todo.vue'

const routes = [
  {
    path: '/',
    component: Todos,
    name: 'home',
  },
  {
    path: '/:id',
    component: Todo,
    name: 'todo',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router