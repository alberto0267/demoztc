<script setup lang="ts">
import { useRouter } from 'vue-router'
import { catalogos, descripcionCatalogo } from '../mocks/catalogo'

const router = useRouter()
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold text-gray-900">Catálogo</h1>
    <p class="mb-4 text-gray-900">{{ descripcionCatalogo }}</p>
    <div class="flex flex-wrap gap-14">
      <div v-for="c in catalogos" :key="c.id" class="flex w-72 flex-col rounded-lg border border-gray-300 bg-white p-3">
        <h2 class="mb-2 text-xl font-bold text-gray-900">{{ c.titulo }}</h2>
        <p class="mb-3 text-gray-900">{{ c.descripcion }}</p>
        <div class="mt-auto">
          <div v-if="c.etiquetas.length" class="mb-2 flex flex-wrap gap-2">
            <span v-for="e in c.etiquetas" :key="e" class="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700">{{ e }}</span>
          </div>
          <button type="button" class="rounded-md bg-green-500 px-3 py-2 text-white hover:opacity-90" @click="router.push(`/catalogo/${c.id}`)">Acceder al catálogo</button>
        </div>
      </div>
    </div>
  </div>
</template>
