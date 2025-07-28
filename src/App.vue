<template>
  <v-app>
    <NavBar></NavBar>

    <!--<nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>-->
   
      <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { VApp } from 'vuetify/components'
import NavBar from './components/NavBar/NavBar.vue';

</script>

<style scoped>

</style>
