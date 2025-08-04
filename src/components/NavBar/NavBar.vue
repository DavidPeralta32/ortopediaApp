<template>
  <v-app-bar color="primary" fixed elevate-on-scroll scroll-behavior="none" class="custom-navbar" flat app>
    <v-btn icon="mdi-domain" variant="text"></v-btn>

    <v-toolbar-title>Ortopedia app</v-toolbar-title>

      <!-- Si es pantalla mediana o más grande, muestra los botones normales -->
      <template v-if="$vuetify.display.mdAndUp" >
        <v-btn icon="mdi-cart-variant" variant="text" style="color:#344767"></v-btn>

        <v-btn icon variant="text" style="margin-right: 20px;color:#344767">
          <v-icon>mdi-account-circle</v-icon>
          <v-tooltip activator="parent" location="bottom">Cuenta</v-tooltip>
        </v-btn>
      </template>

      <!-- Si es pantalla pequeña, muestra un botón hamburguesa -->
      <template v-else>
        <v-btn icon="mdi-menu" variant="text" @click="drawerUserCarrito = !drawerUserCarrito"></v-btn>
      </template>

      

  </v-app-bar>



  <!-- Drawer lateral que aparece al dar clic en la hamburguesa -->
      <v-navigation-drawer v-model="drawerUserCarrito" temporary location="right" style="height: auto; max-height: fit-content; ">
        <v-list>
          <v-list-item prepend-icon="mdi-cart-variant" title="Carrito"></v-list-item>
          <v-list-item prepend-icon="mdi-account-circle" title="Cuenta"></v-list-item>
        </v-list>
      </v-navigation-drawer>

  <v-main>
  </v-main>
</template>

<script setup>
import { ref, watch } from 'vue'

const items = [
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
]

const drawer = ref(false)
const drawerUserCarrito = ref(false);
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>

<style scoped>
.custom-navbar {
  background: rgba(255, 255, 255, 0.8) !important; /* Fondo blanco translúcido */
  backdrop-filter: blur(10px); /* Difuminado */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra suave */
  margin: 10px auto;
  width: 95%;
  /*max-width: 1200px;*/
  color:#344767 !important;
}
</style>