import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import TaskDetail from '@/components/TaskDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',               // 🏠 Home-Route
    component: Home,
  },
  {
    path: '/kanban',
    name: 'Kanban',             // 🗂 Kanban-Board
    component: KanbanBoard,
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',         // 🔍 Task-Detail
    component: TaskDetail,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',              // bilinmeyen tüm yollar Home’a döndürsün
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
