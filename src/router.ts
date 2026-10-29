import { createRouter, createWebHistory } from 'vue-router'
import CrearCambio from './pages/CrearCambio.vue'
import Catalogo from './pages/Catalogo.vue'
import GestionAutomatizaciones from './pages/GestionAutomatizaciones.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/crear-cambio' },
    { path: '/crear-cambio', component: CrearCambio },
    { path: '/catalogo', component: Catalogo },
    { path: '/gestionAutomatizaciones', component: GestionAutomatizaciones }
  ]
})

export default router
