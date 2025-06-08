// src/store/index.js
import { defineStore } from 'pinia'
import postsData from '@/data/posts.js' // Importiere Beispiel-Posts

export const usePostStore = defineStore('postStore', {
  state: () => ({
    // Zustand: Liste der Blogposts
    posts: [],
  }),
  actions: {
    // Methode zum Laden der Posts
    fetchPosts() {
      this.posts = postsData
    },
    // Methode zum Hinzufügen eines neuen Posts
    addNewPost(newPost) {
      this.posts.push(newPost)
    },
  },
})
