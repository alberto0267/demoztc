<script setup lang="ts">
import CatalogoTarjetas from '../components/CatalogoTarjetas.vue'
import { tarjetasCrearCambio } from '../mocks/crearCambio'
</script>

<template>
  <CatalogoTarjetas titulo="Catálogo de cambios" subtitulo="Ofertas" textoCrear="Crear oferta" nombreBase="Automatización" :tarjetasIniciales="tarjetasCrearCambio" />
</template>
