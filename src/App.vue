<template>
  <v-app>
    <NavBar></NavBar>
      <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { VApp } from 'vuetify/components'
import NavBar from './components/NavBar/NavBar.vue';

</script>

<style>
:root {
  --color-primary: #1C90A1;
  --color-secondary: #98C7C9;
}

/* Ejemplo de uso en cualquier componente */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 10px 20px;
}
</style>

