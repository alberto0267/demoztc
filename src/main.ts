import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Material from '@primevue/themes/material'
import 'primeicons/primeicons.css'
import './style.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: { darkModeSelector: false }
  }
})

app.mount('#app')
