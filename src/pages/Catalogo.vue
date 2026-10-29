<script setup lang="ts">
import CatalogoTarjetas from '../components/CatalogoTarjetas.vue'
import { tarjetasCatalogo } from '../mocks/catalogo'
</script>

<template>
  <CatalogoTarjetas titulo="Catálogo" subtitulo="Catálogos" textoCrear="Crear catálogo" nombreBase="Catálogo" :tarjetasIniciales="tarjetasCatalogo" />
</template>
