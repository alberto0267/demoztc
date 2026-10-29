<script setup lang="ts">
const emit = defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <nav class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
    <div class="flex h-16 items-center justify-between px-3 lg:px-5">
      <div class="flex items-center gap-3">
        <button type="button" class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" @click="emit('toggleSidebar')">
          <span class="sr-only">Mostrar u ocultar barra lateral</span>
          <i class="pi pi-bars text-xl"></i>
        </button>
        <span class="text-xl font-semibold text-gray-900">Demo</span>
      </div>
      <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-white">
        <i class="pi pi-user"></i>
      </span>
    </div>
  </nav>
</template>
