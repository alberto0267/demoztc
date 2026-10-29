<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const sidebarAbierto = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <Navbar @toggle-sidebar="sidebarAbierto = !sidebarAbierto" />
    <Sidebar :abierto="sidebarAbierto" />
    <main :class="sidebarAbierto ? 'ml-64' : 'ml-0'" class="min-h-screen bg-white pt-16 transition-all">
      <router-view />
    </main>
  </div>
</template>
