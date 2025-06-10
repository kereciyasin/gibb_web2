// Haupteinstiegspunkt der Anwendung
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Pinia für zentrales State Management importieren
import { createRouter, createWebHistory } from 'vue-router' // Vue Router importieren
import App from './App.vue'
import router from './router' // Router-Konfiguration importieren
// src/main.js
import './assets/main.css'

const app = createApp(App)

// Pinia-Store zu Vue-App hinzufügen
app.use(createPinia())

// Vue Router zur App hinzufügen
app.use(router)

// App im DOM mounten
app.mount('#app')