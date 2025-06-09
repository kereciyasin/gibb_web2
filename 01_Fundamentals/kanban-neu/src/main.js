import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'

// Views lazy-loaded
const KanbanBoard = () => import('./views/KanbanBoard.vue')
const AddTask     = () => import('./views/AddTask.vue')
const TaskDetail  = () => import('./views/TaskDetail.vue')

// Routen definieren
const routes = [
  { path: '/',           name: 'Board',  component: KanbanBoard },
  { path: '/add',        name: 'Add',    component: AddTask },
  { path: '/task/:id',   name: 'Detail', component: TaskDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
