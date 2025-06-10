// Konfiguration des Vue Routers für das Kanban-Board-Projekt
import { createRouter, createWebHistory } from 'vue-router'

// Views importieren (werden später erstellt)
import KanbanBoard from '../views/KanbanBoard.vue'
import TaskDetail from '../views/TaskDetail.vue'

const routes = [
  {
    path: '/',
    name: 'KanbanBoard',
    component: KanbanBoard
  },
  {
    // Dynamische Route für die Detailansicht einer Aufgabe
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    props: true // Übergibt die ID als Prop an die Komponente
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router