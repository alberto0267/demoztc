<script setup lang="ts">
defineProps<{ abierto: boolean }>()

const enlaces = [
  { texto: 'Crear cambio', ruta: '/crear-cambio', icono: 'pi pi-file' },
  { texto: 'Catálogo', ruta: '/catalogo', icono: 'pi pi-book' },
  { texto: 'Gestión de Automatizaciones', ruta: '/gestionAutomatizaciones', icono: 'pi pi-chart-pie' }
]
</script>

<template>
  <aside :class="abierto ? 'translate-x-0' : '-translate-x-full'" class="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-16 transition-transform">
    <ul class="space-y-2 px-5 py-5">
      <li v-for="e in enlaces" :key="e.ruta">
        <router-link :to="e.ruta" class="flex items-center gap-3 rounded-lg px-2 py-2.5 text-gray-900 hover:bg-gray-100" active-class="bg-gray-100">
          <i :class="e.icono" class="text-lg text-gray-600"></i>
          {{ e.texto }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
