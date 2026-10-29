<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import { catalogos, categorias, etiquetasTecnicas } from '../mocks/catalogo'

const route = useRoute()

const catalogo = catalogos.find((c) => String(c.id) === String(route.params.id))
const categoria = ref<string | null>(null)
const etiqueta = ref<string | null>(null)
const busqueda = ref('')
</script>

<template>
  <div class="flex flex-col gap-6 p-6 lg:flex-row">
    <aside class="w-full shrink-0 lg:w-96 lg:border-r lg:border-gray-200 lg:pe-3">
      <h2 class="mb-6 text-xl font-bold text-gray-900">Filtros</h2>
      <div class="flex flex-col gap-6">
        <Select v-model="categoria" :options="categorias" placeholder="Categoría" class="w-full" />
        <Select v-model="etiqueta" :options="etiquetasTecnicas" placeholder="Etiqueta técnica" class="w-full" />
        <InputText v-model="busqueda" placeholder="Búsqueda" class="w-full" />
        <button type="button" class="w-full rounded-md bg-green-500 px-5 py-2.5 text-white hover:opacity-90">Aplicar filtros</button>
      </div>
    </aside>

    <section class="flex-1">
      <h1 class="mb-4 text-2xl font-bold text-gray-900">Catálogo de Acciones</h1>
      <p class="mb-6 font-bold text-gray-900">{{ catalogo?.titulo }}</p>
      <p class="mb-6 text-gray-900">{{ catalogo?.descripcion }}</p>
      <p class="w-64 text-sm text-gray-600">No se encontraron resultados para el filtro seleccionado.</p>
    </section>
  </div>
</template>
