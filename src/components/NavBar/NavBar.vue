<template>
  <v-app-bar color="primary" fixed elevate-on-scroll scroll-behavior="none" class="custom-navbar" flat app>
    <v-btn icon="mdi-domain" variant="text"></v-btn>

    <v-toolbar-title>INQUIMED</v-toolbar-title>

    <template v-if="$vuetify.display.mdAndUp">
      <div style="display: flex; gap: 30px; justify-content: center; align-items: center;">
        <v-toolbar-subtitle @click="abrirDialogNosotros()">Nosotros</v-toolbar-subtitle>
        <v-toolbar-subtitle>Productos</v-toolbar-subtitle>
        <v-toolbar-subtitle>Contacto</v-toolbar-subtitle>
      </div>
    </template>

    <!-- Si es pantalla mediana o más grande, muestra los botones normales -->
    <template v-if="$vuetify.display.mdAndUp">
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
  <v-navigation-drawer v-model="drawerUserCarrito" temporary location="right"
    style="height: auto; max-height: fit-content; ">
    <v-list>
      <v-list-item prepend-icon="mdi-information" title="Nosotros" @click="abrirDialogNosotros()"></v-list-item>
      <v-list-item prepend-icon="mdi-store" title="Productos"></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Contacto"></v-list-item>

      <v-list-item prepend-icon="mdi-cart-variant" title="Carrito"></v-list-item>
      <v-list-item prepend-icon="mdi-account-circle" title="Cuenta"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
  </v-main>


  <!-- Dialog Conpartir Link de Dispositivo-->
  <v-dialog v-model="dialogNosotros" width="auto" max-width="850" persistent transition="dialog-bottom-transition">
    <v-card  prepend-icon="mdi-share-variant-outline" title="Nosotros">
      <v-divider></v-divider>
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" bg-color="blue-darken-1" stacked>
          <v-tab value="tab-1">
            <v-icon icon="mdi-phone"></v-icon>

            Proposito
          </v-tab>

          <v-tab value="tab-2">
            <v-icon icon="mdi-heart"></v-icon>

            Personalidad
          </v-tab>

          <v-tab value="tab-3">
            <v-icon icon="mdi-account-box"></v-icon>

            Servicio
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="tab-1">
            <v-card>
              <v-card-text style="margin: 16px;">
                <h4 style="margin-bottom: 15px;">COMPROMETIDO, VERSATIL Y EFICIENTE.</h4>
                <br>
                <v-row>
                  <v-col cols="12" md="4">
                    <img src="" alt="img proposito">
                  </v-col>

                  <v-col cols="12" md="8">
                    <p>{{ text }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="tab-2">
            <v-card>
              <v-card-text style="margin: 16px;">
                <p style="font-size: 16px; font-weight: bold;">
                  Somos un aliado medico, una persona confiable y organizada, resolutiva, cercana pero profesional, flexible e
                  imparcial, claro y directo, transparentes y comprometidos.
                </p >
                <br>
                <v-row>
                  <v-col cols="12" md="4">
                    <img src="" alt="img personalidad">
                  </v-col>

                  <v-col cols="12" md="8">
                    <ol>
                  <li>OFRECEMOS UN CATALOGO ABIERTO Y FLEXIBLE POR DEMANDA</li>
                  <li>PLATAFORMA DIGITAL CON COTIZACION INMEDIATA Y COMUNICACION</li>
                  <li>SERVICIO DE ASESORIA PERSONALIZADA</li>
                  <li>ENTREGA EXPRESS</li>
                  <li>PROGRAMAS DE ABASTECIMIENTO AUTOMATICO</li>
                </ol>
                  </v-col>
                </v-row>
                
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="tab-3">
            <v-card>
              <v-card-text style="margin: 16px;">

              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>

      <v-divider></v-divider>
      <v-spacer></v-spacer>
      <div style="display: flex;flex-wrap: wrap;justify-content: space-between;margin: 8px;">
        <div>
          <v-btn text="Cerrar" color="deep-orange-accent-4" variant="tonal" @click="dialogNosotros = false"></v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { ref, watch } from 'vue'

const dialogNosotros = ref(false);

const tab = ref(null)

const text = 'DISTRIBUIR Y PROVEER DE ALTA VARIEDAD DE INSUMOS MEDICOS Y MATERIAL MEDICO DE ALTA CALIDAD, CON EL OBJETIVO DE SATISFACER CUALQUIER NECESIDAD Y VOLVERSE INDISPENSABLE PARA LAS INSTITUCIONES DE SALUD, PROFESIONALES DEL SECTOR Y PACIENTES.'

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


const abrirDialogNosotros = () => {
  dialogNosotros.value = true;
}
</script>

<style scoped>
.custom-navbar {
  background: rgba(255, 255, 255, 0.8) !important;
  /* Fondo blanco translúcido */
  backdrop-filter: blur(10px);
  /* Difuminado */
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  /* Bordes redondeados */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* Sombra suave */
  margin: 10px auto;
  width: 95%;
  /*max-width: 1200px;*/
  color: #344767 !important;
}

v-toolbar-subtitle {
  cursor: pointer;
}
</style>