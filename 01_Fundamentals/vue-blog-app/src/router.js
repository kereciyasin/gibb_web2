// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Blog from './components/Blog.vue'
import Post from './components/Post.vue'
import NotFound from './components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/blog/:id',
    name: 'Post',
    component: Post,
    props: true,
  },
  {
    path: '/:catchAll(.*)', // 404 Route
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
