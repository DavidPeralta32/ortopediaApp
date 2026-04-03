<template>
  <v-app-bar color="primary" fixed elevate-on-scroll scroll-behavior="none" class="custom-navbar" flat app>

    <!-- Botón Home -->
    <v-btn class="btnHome" icon="mdi-home" variant="text" :to="{ name: 'Home' }"></v-btn>

    <v-toolbar-title>INQUIMED</v-toolbar-title>

    <!-- Botones para escritorio -->
    <template v-if="$vuetify.display.mdAndUp">
      <v-btn text @click="abrirDialogNosotros()">Nosotros</v-btn>
      <v-menu open-on-hover location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" append-icon="mdi-chevron-down">
            Productos
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in categorias" :key="index" @click="goToProductos(item.value)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text @click="goToContacto()">Contacto</v-btn>

      <v-spacer></v-spacer>

      <v-menu v-model="menuCarrito" open-on-click :close-on-content-click="false" location="bottom end" transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon variant="text" style="color:#344767" class="relative" v-bind="props">
            <v-badge :content="cartStore.totalItems" color="red" overlap v-if="cartStore.totalItems > 0">
              <v-icon :class="{ 'animate-bounce': cartStore.animateCart }">
                mdi-cart-variant
              </v-icon>
            </v-badge>
            <v-icon v-else>mdi-cart-variant</v-icon>
          </v-btn>
        </template>

        <v-card width="350" class="pa-2 shadow-lg">
          <v-list lines="two">
            <v-list-subheader class="font-weight-bold text-uppercase">
              Mi Carrito ({{ cartStore.totalItems }})
            </v-list-subheader>

            <v-divider></v-divider>

            <div style="max-height: 300px; overflow-y: auto;" class="custom-scroll">
        
        <v-list-item v-if="cartStore.cart.length === 0" class="text-center py-4">
          <v-list-item-title class="text-grey-darken-1">No hay productos aún</v-list-item-title>
        </v-list-item>

        <v-list-item v-for="item in cartStore.cart" :key="item.id" class="mb-2">
          <template v-slot:prepend>
            <v-avatar rounded="lg" size="50" border>
              <v-img :src="item.image" cover></v-img>
            </v-avatar>
          </template>

          <v-list-item-title class="text-subtitle-2 font-weight-bold">
            {{ item.name }}
          </v-list-item-title>

          <v-list-item-subtitle>
            Cantidad: {{ item.quantity }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-btn icon="mdi-close-circle-outline" variant="text" size="small" color="red-lighten-1"
              @click="cartStore.removeFromCart(item.id)"></v-btn>
          </template>
        </v-list-item>
        
      </div>
      </v-list>

          <v-divider class="mb-2"></v-divider>

          <div class="pa-2">
            <v-btn block color="#1C90A1" variant="elevated" prepend-icon="mdi-eye" :to="{ name: 'Carrito' }" @click="menuCarrito = false">
              Ver completo
            </v-btn>
          </div>
        </v-card>
      </v-menu>


      <v-btn icon variant="text" style="margin-right: 20px;color:#344767">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <!-- Botón hamburguesa para móvil -->
    <template v-else>
      <v-app-bar-nav-icon variant="text" @click.stop="drawerUserCarrito = !drawerUserCarrito"></v-app-bar-nav-icon>
    </template>

  </v-app-bar>

  <!-- Drawer lateral -->
  <v-navigation-drawer v-model="drawerUserCarrito" temporary left app>
    <v-list>
      <v-list-item prepend-icon="mdi-information" @click="abrirDialogNosotros()">Nosotros</v-list-item>
      <v-list-item prepend-icon="mdi-store" @click="goToProductos('todos')">Productos</v-list-item>
      <v-list-item prepend-icon="mdi-account-box" @click="goToContacto()">Contacto</v-list-item>
      <!-- Carrito con badge -->
      <v-list-item :to="{ name: 'Carrito' }">
        <template #prepend>
          <!-- Badge sobre el icono del carrito -->
          <v-badge :content="cartStore.totalItems" color="red" overlap v-if="cartStore.totalItems > 0">
            <v-icon large>mdi-cart-variant</v-icon>
          </v-badge>

          <!-- Icono normal si no hay productos -->
          <v-icon large v-else>mdi-cart-variant</v-icon>
        </template>

        <v-list-item-title>Carrito</v-list-item-title>
      </v-list-item>

      <v-list-item prepend-icon="mdi-account-circle">Cuenta</v-list-item>
    </v-list>
  </v-navigation-drawer>




  <!-- Dialog Conpartir Link de Dispositivo-->
  <v-dialog v-model="dialogNosotros" width="auto" max-width="850" persistent transition="dialog-bottom-transition">
    <v-card prepend-icon="mdi-information" title="Nosotros">
      <v-divider></v-divider>
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" bg-color="blue-darken-1" stacked>
          <v-tab value="tab-1">
            <v-icon icon="mdi-information-variant"></v-icon>

            Proposito
          </v-tab>

          <v-tab value="tab-2">
            <v-icon icon="mdi-heart"></v-icon>

            Personalidad
          </v-tab>

          <v-tab value="tab-3">
            <v-icon icon="mdi-toolbox-outline"></v-icon>

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
                  Somos un aliado medico, una persona confiable y organizada, resolutiva, cercana pero profesional,
                  flexible e
                  imparcial, claro y directo, transparentes y comprometidos.
                </p>
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
                <h4 style="font-size: 18px;">¿Que ofrecemos?</h4>
                <br>
                <p>
                  ORTOPEDIA BLANDA , MATERIAL DE OSTEOSINTISESIS, MEDICINA DEPORTIVA, REEMPLAZO ARTICULAR, CONSUMIBLES
                  HOSPITALARIOS, MATERIA PARA LAPAROSCOPIA, EQUIPOS ELECTRONICOS, MATERIAL DE CURACION, INSTRUMENTALES
                  MEDICOS Y MOBILIARIO MEDICO.
                </p>
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

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/CartStore'



const menuCarrito = ref(false);

const router = useRouter()
const cartStore = useCartStore()


const dialogNosotros = ref(false);
const tab = ref(null)

const text = 'DISTRIBUIR Y PROVEER DE ALTA VARIEDAD DE INSUMOS MEDICOS Y MATERIAL MEDICO DE ALTA CALIDAD, CON EL OBJETIVO DE SATISFACER CUALQUIER NECESIDAD Y VOLVERSE INDISPENSABLE PARA LAS INSTITUCIONES DE SALUD, PROFESIONALES DEL SECTOR Y PACIENTES.'

const categorias = [
  { title: 'Artroscopia', value: 'artroscopia' },
  { title: 'Bultos de ropa', value: 'bultos-ropa' },
  { title: 'Consumibles', value: 'consumibles' },
  { title: 'Neurocirugía', value: 'neurocirugia' },
  { title: 'Ortopedia Blanda', value: 'ortopedia-blanda' },
  { title: 'Reemplazo Articular', value: 'reemplazo-articular' },
  { title: 'Túnel del Carpo', value: 'tunel-carpo' },
  { title: 'Cirugía de columna', value: 'cirugia-columna' },
  { title: 'Todos', value: 'Todos' }
]

const drawer = ref(false)
const drawerUserCarrito = ref(false);
const group = ref(null)

watch(group, () => {
  drawer.value = false
  drawerUserCarrito.value = false;
})


const abrirDialogNosotros = () => {
  router.push({ name: 'Nosotros' })
}

const goToProductos = (categoria: string) => {
  if (!categoria || categoria === 'Todos') {
    router.push({ name: 'Productos', query: { cat: "Todos" } })
  } else {
    router.push({ name: 'Productos', query: { cat: categoria } })
  }
}

const goToContacto = () => {
  router.push({ name: 'Contacto' })
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
  margin: 5px 0;
  width: 95%;
  /*max-width: 1200px;*/
  color: #344767 !important;
}

v-toolbar-subtitle {
  cursor: pointer;
}

.btnHome:hover {
  color: black;
}

.v-navigation-drawer {
  z-index: 2000;
}

.v-toolbar-subtitle {
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce {
  animation: bounce 0.4s;
}
</style>