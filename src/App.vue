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

<style scoped>

</style>
