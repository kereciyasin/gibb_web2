// src/store.js

import { defineStore } from 'pinia'
import posts from './data/posts.js'

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
  }),
  actions: {
    fetchPosts() {
      this.posts = posts
    },
    addNewPost(post) {
      this.posts.push(post)
    },
  },
})
