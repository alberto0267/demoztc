<script setup lang="ts">
defineProps<{ titulo: string }>()

const emit = defineEmits<{ cerrar: [] }>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4" @click.self="emit('cerrar')">
    <div class="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow">
      <div class="flex items-center justify-between bg-green-500 px-5 py-5">
        <h3 class="text-lg text-gray-900">{{ titulo }}</h3>
        <button type="button" class="text-gray-900 hover:opacity-70" @click="emit('cerrar')">
          <span class="sr-only">Cerrar modal</span>
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
      <div class="p-5">
        <slot />
      </div>
      <div v-if="$slots.pie" class="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
        <slot name="pie" />
      </div>
    </div>
  </div>
</template>
