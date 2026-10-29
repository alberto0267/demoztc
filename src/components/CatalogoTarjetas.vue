<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Modal from './Modal.vue'
import type { Tarjeta } from '../mocks/tarjetas'

const props = defineProps<{
  titulo: string
  subtitulo: string
  textoCrear: string
  nombreBase: string
  tarjetasIniciales: Tarjeta[]
}>()

const porPagina = 6

const tarjetas = ref<Tarjeta[]>(props.tarjetasIniciales.map((t) => ({ ...t })))
const busqueda = ref('')
const estado = ref('todos')
const favoritos = ref('todas')
const orden = ref('asc')
const pagina = ref(1)
const seleccionada = ref<Tarjeta | null>(null)

const filtradas = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()
  return tarjetas.value
    .filter((t) => !texto || t.nombre.toLowerCase().includes(texto))
    .filter((t) => estado.value === 'todos' || (estado.value === 'activas') === t.activa)
    .filter((t) => favoritos.value === 'todas' || t.favorita)
    .sort((a, b) => (orden.value === 'asc' ? 1 : -1) * a.nombre.localeCompare(b.nombre, 'es', { numeric: true }))
})

const totalPaginas = computed(() => Math.max(1, Math.ceil(filtradas.value.length / porPagina)))
const visibles = computed(() => filtradas.value.slice((pagina.value - 1) * porPagina, pagina.value * porPagina))

watch([busqueda, estado, favoritos, orden], () => {
  pagina.value = 1
})

function crear() {
  const id = Math.max(0, ...tarjetas.value.map((t) => t.id)) + 1
  tarjetas.value.push({ id, nombre: `${props.nombreBase} ${id}`, icono: 'pi pi-cog', jt: 0, favorita: false, activa: true })
}

function editar() {}

function alternarActiva(t: Tarjeta) {
  t.activa = !t.activa
}

const botones = [
  { type: 'Button', class: 'pi pi-pencil', title: 'Editar', action: editar },
  { type: 'Button', class: 'pi pi-ban', title: 'Deshabilitar', action: alternarActiva }
]
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900">{{ titulo }}</h1>
    <p class="mb-8 text-gray-900">{{ subtitulo }}</p>

    <div class="mb-6 flex flex-wrap items-end gap-3">
      <InputText v-model="busqueda" placeholder="Buscar por nombre" class="w-96" />
      <div class="flex flex-col">
        <label class="mb-1 text-xs text-gray-600">Estado</label>
        <select v-model="estado" class="rounded-md border border-gray-300 bg-white py-2 pe-8 ps-3 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500">
          <option value="todos">Todos</option>
          <option value="activas">Activas</option>
          <option value="deshabilitadas">Deshabilitadas</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="mb-1 text-xs text-gray-600">Favoritos</label>
        <select v-model="favoritos" class="rounded-md border border-gray-300 bg-white py-2 pe-8 ps-3 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500">
          <option value="todas">Todas las ofertas</option>
          <option value="favoritas">Solo favoritas</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="mb-1 text-xs text-gray-600">Orden alfabético</label>
        <select v-model="orden" class="rounded-md border border-gray-300 bg-white py-2 pe-8 ps-3 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500">
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
      <button type="button" class="ms-auto rounded-md bg-green-500 px-3 py-2 text-white hover:opacity-90" @click="crear">{{ textoCrear }}</button>
    </div>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="t in visibles" :key="t.id" :class="{ 'opacity-50': !t.activa }" class="relative flex flex-col rounded-md border border-gray-300 bg-white p-4">
        <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-600" :title="t.favorita ? 'Quitar de favoritos' : 'Añadir a favoritos'" @click="t.favorita = !t.favorita">
          <i :class="t.favorita ? 'pi pi-star-fill' : 'pi pi-star'"></i>
        </button>
        <div class="mb-6 flex items-center gap-4 pe-6">
          <i :class="t.icono" class="text-xl text-gray-900"></i>
          <h2 class="text-lg font-bold text-gray-900">{{ t.nombre }}</h2>
        </div>
        <span class="mb-2 w-fit rounded bg-green-50 px-2 py-0.5 text-xs text-green-700">{{ t.jt }} JT relacionados</span>
        <button type="button" class="w-fit text-sm font-bold text-green-700 hover:underline" @click="seleccionada = t">Ver JT relacionados</button>
        <div class="mt-4 flex justify-end gap-3 text-gray-600">
          <button v-for="b in botones" :key="b.title" type="button" :class="b.class" :title="b.title" class="text-lg hover:text-gray-900" @click="b.action(t)"></button>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p class="text-sm text-gray-600">Mostrando {{ visibles.length }} de {{ filtradas.length }} catálogos</p>
      <div class="flex gap-2">
        <button type="button" :class="{ disabled: pagina === 1 }" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-gray-900 hover:bg-gray-100" @click="pagina--">Anterior</button>
        <button
          v-for="n in totalPaginas"
          :key="n"
          type="button"
          :class="n === pagina ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'"
          class="rounded border px-3 py-1.5 text-sm"
          @click="pagina = n"
        >
          {{ n }}
        </button>
        <button type="button" :class="{ disabled: pagina === totalPaginas }" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-gray-900 hover:bg-gray-100" @click="pagina++">Siguiente</button>
      </div>
    </div>

    <Modal v-if="seleccionada" :titulo="`JT relacionados con &quot;${seleccionada.nombre}&quot;`" @cerrar="seleccionada = null">
      <div class="mb-4 flex justify-end">
        <button type="button" class="rounded-md bg-green-500 px-3 py-2 text-sm text-white hover:opacity-90">Crear JobPlan</button>
      </div>
      <ul v-if="seleccionada.jt" class="divide-y divide-gray-200 text-sm text-gray-900">
        <li v-for="n in seleccionada.jt" :key="n" class="py-2">JT {{ n }}</li>
      </ul>
      <p v-else class="text-sm text-gray-600">No hay JT relacionados.</p>
    </Modal>
  </div>
</template>
