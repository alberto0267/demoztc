<script setup lang="ts">
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import type { DataTableFilterMeta } from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Modal from '../components/Modal.vue'
import { automatizacionesAsociadas, gruposTecnologicos } from '../mocks/gestionAutomatizaciones'
import type { AutomatizacionAsociada } from '../mocks/gestionAutomatizaciones'

const columnas = [
  { field: 'cambio', header: 'Cambio' },
  { field: 'descripcion', header: 'Descripción' },
  { field: 'hostnames', header: 'Hostnames' },
  { field: 'creador', header: 'Creador' },
  { field: 'grupoAsignado', header: 'Grupo Asignado' }
]

const todosLosGrupos = 'Todos los grupos'

function crearFiltros(): DataTableFilterMeta {
  const filtros: DataTableFilterMeta = {}
  columnas.forEach((c) => {
    filtros[c.field] = { operator: 'and', constraints: [{ value: null, matchMode: 'contains' }] }
  })
  return filtros
}

const filas = ref<AutomatizacionAsociada[]>(automatizacionesAsociadas.map((a) => ({ ...a })))
const filtros = ref<DataTableFilterMeta>(crearFiltros())
const grupo = ref(todosLosGrupos)
const expandidas = ref<Record<string, boolean>>({})
const modalVisible = ref(false)
const formulario = ref({ cambio: '', hostnames: '', grupoAsignado: null as string | null })

const filasFiltradas = computed(() => (grupo.value === todosLosGrupos ? filas.value : filas.value.filter((f) => f.grupoAsignado === grupo.value)))

function limpiarFiltros() {
  filtros.value = crearFiltros()
  grupo.value = todosLosGrupos
}

function abrirModal() {
  formulario.value = { cambio: '', hostnames: '', grupoAsignado: null }
  modalVisible.value = true
}

function guardar() {
  const id = Math.max(0, ...filas.value.map((f) => f.id)) + 1
  filas.value = [
    {
      id,
      cambio: formulario.value.cambio || `CH${1760000 + id}`,
      descripcion: `Automatización ${id}`,
      hostnames: formulario.value.hostnames,
      creador: 'U2DS1804',
      grupoAsignado: formulario.value.grupoAsignado ?? ''
    },
    ...filas.value
  ]
  modalVisible.value = false
}
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900">Gestión de Automatizaciones</h1>

    <div class="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div class="flex w-72 flex-col">
        <label class="text-xs text-gray-600">Grupos Tecnológicos</label>
        <Select v-model="grupo" :options="[todosLosGrupos, ...gruposTecnologicos]" />
      </div>
      <button type="button" class="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700" @click="limpiarFiltros">
        <i class="pi pi-filter-slash me-2"></i>Limpiar Filtros
      </button>
    </div>

    <button type="button" class="mb-8 rounded-md bg-green-500 px-3 py-2 text-gray-900 hover:opacity-90" @click="abrirModal">Asociar Automatización</button>

    <div class="overflow-x-auto rounded-lg border border-gray-100 bg-white shadow-sm">
      <DataTable v-model:filters="filtros" v-model:expandedRows="expandidas" :value="filasFiltradas" dataKey="id" paginator :rows="10" filterDisplay="menu" tableStyle="min-width: 60rem">
        <Column expander style="width: 4rem" />
        <Column
          v-for="c in columnas"
          :key="c.field"
          :field="c.field"
          :header="c.header"
          headerClass="uppercase text-sm"
          :showFilterMatchModes="false"
          :showFilterOperator="false"
          :showAddButton="false"
        >
          <template v-if="c.field === 'hostnames'" #body="{ data }">
            <span v-if="data.hostnames" class="inline-block w-60 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-600">{{ data.hostnames }}</span>
          </template>
          <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Buscar" />
          </template>
        </Column>
        <template #expansion="{ data }">
          <div class="p-3 text-sm text-gray-700">
            <span class="font-semibold">{{ data.descripcion }}</span> asociada al cambio {{ data.cambio }}.
          </div>
        </template>
      </DataTable>
    </div>

    <Modal v-if="modalVisible" titulo="Crear/Editar Automatización" @cerrar="modalVisible = false">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="auto-cambio" class="text-sm text-gray-900">Cambio</label>
          <InputText id="auto-cambio" v-model="formulario.cambio" placeholder="CH0000000" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="auto-hostnames" class="text-sm text-gray-900">Hostnames</label>
          <InputText id="auto-hostnames" v-model="formulario.hostnames" placeholder="servidor01.demo.local" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm text-gray-900">Grupo Asignado</label>
          <Select v-model="formulario.grupoAsignado" :options="gruposTecnologicos" placeholder="Selecciona un grupo" />
        </div>
      </div>
      <template #pie>
        <button type="button" class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-100" @click="modalVisible = false">Cancelar</button>
        <button type="button" class="rounded-md bg-green-500 px-3 py-2 text-sm text-white hover:opacity-90" @click="guardar">Guardar</button>
      </template>
    </Modal>
  </div>
</template>
