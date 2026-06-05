<template>
  <div class="py-12" style="margin: 2rem;">
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-2 primary--text">Nuestra Colección</h2>
        <p class="text-subtitle-1 text-medium-emphasis">
          Equipamiento médico de alta precisión para ortopedia y cirugía.
        </p>
        <v-divider class="mx-auto mt-4" width="60" thickness="3" color="primary"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row v-if="filteredProducts.length > 0">
          <v-col v-for="producto in filteredProducts" :key="producto.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="product-card rounded-xl d-flex flex-column h-100" variant="flat">

              <!-- 📸 Contenedor de la Imagen + Capa Overlay (image_8a1600.png) -->
              <div class="image-wrapper bg-grey-lighten-5">
                <v-img :src="producto.image" height="230" cover class="product-img pa-4">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                
                <!-- Capa Aqua que se activa al hacer Hover -->
                <div class="product-overlay d-flex align-center justify-center text-center px-4">
                  <p class="text-body-1 font-weight-medium text-white line-clamp-3">
                    {{ producto.descripcion || 'Modelo estándar de alta resistencia anatómica.' }}
                  </p>
                </div>
              </div>

              <!-- 📝 Información del Producto -->
              <v-card-item class="pt-4 flex-grow-1">
                <div class="text-overline mb-1 font-weight-bold" style="color: #1C90A1; letter-spacing: 1px;">
                  {{ producto.category }}
                </div>
                <v-card-title class="text-h6 font-weight-bold px-0 pt-0 text-wrap text-grey-darken-4 lh-sm">
                  {{ producto.name }}
                </v-card-title>
              </v-card-item>

              <v-divider class="mx-4 opacity-60"></v-divider>
              
              <!-- 🛒 Acciones Limpias (Como en tu imagen de referencia) -->
              <v-card-actions class="px-4 py-3 bg-white rounded-b-xl d-flex align-center">
                <v-spacer></v-spacer>
                <v-btn icon="mdi-cart-plus" color="#1C90A1" variant="text" size="large" :disabled="!producto.stock"
                  @click="addCart(producto)"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <div v-else class="empty-state text-center py-16">
          <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-package-variant-closed</v-icon>
          <h3 class="text-h5 font-weight-medium text-grey-darken-1">No hay resultados</h3>
          <p class="text-grey">Intenta ajustando los filtros de búsqueda.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"
import { useFilterStore } from "@/stores/FilterProductosStore.ts";

const filterStore = useFilterStore();

const productos = ref([
  {
    "id": 1,
    "name": "Mentonera",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907879/mentonera_ag42kj.png",
    "descripcion": "Modelo: MN-012, Talla: Universal. Soporte post-operatorio mentoniano."
  },
  {
    "id": 2,
    "name": "Callarin Cervical Universal Blando",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907878/Callari%CC%81n_Cervical_Universal_Blando_bx2vzd.png",
    "descripcion": "Modelo: NK-005, Talla: Universal. Espuma de alta densidad cómoda."
  },
  {
    "id": 3,
    "name": "Collarin Semi-rigido Perfil Bajo",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907876/Collari%CC%81n_Semiri%CC%81gido_Perfil_Bajo_e7swke.png",
    "descripcion": "Modelo: NK-SR02, Talla: Ajustable. Restricción intermedia de flexión."
  },
  {
    "id": 4,
    "name": "Collarín Cervical Blando Infantil",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907875/collarin_cervical_blando_infantil_vymmoa.png",
    "descripcion": "Modelo: NK-PED, Talla: Infantil. Diseño anatómico acolchado suave."
  },
  {
    "id": 5,
    "name": "Collarín Cervical",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907874/Collari%CC%81n_Cervical_jlux1p.png",
    "descripcion": "Modelo: NK-STD, Talla: M / L. Soporte para cervicalgias agudas."
  },
  {
    "id": 6,
    "name": "Callarín Cervical Blando Azul Marino",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907873/Callari%CC%81n_Cervical_Blando_Azul_Marino_zqw7gf.png",
    "descripcion": "Modelo: NK-BLU, Talla: Universal. Acabado textil de larga duración."
  },
  {
    "id": 7,
    "name": "Collarin Philadelphia",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907872/collarin_philadelphia_txyeny.png",
    "descripcion": "Modelo: PH-502, Talla: Grande. Plastazote con panel traqueal abierto."
  },
  {
    "id": 8,
    "name": "Collarín Ortesís Tipo Miami",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907871/Collari%CC%81n_Ortesi%CC%81s_Tipo_Miami_tiv0no.png",
    "descripcion": "Modelo: MO-700, Talla: Ajustable. Inmovilización estricta de columna."
  },
])

const inStockOnly = ref(false)

const filteredProducts = computed(() => {
  const categoriaSeleccionada = filterStore.selectedCategory || 'Todos';
  return productos.value.filter((p) => {
    const matchCategory =
      categoriaSeleccionada === 'Todos' ||
      p.category.toLowerCase() === categoriaSeleccionada.toLowerCase();
    const matchStock = !inStockOnly.value || p.stock;
    return matchCategory && matchStock;
  })
})

const cartStore = useCartStore()

const addCart = (producto: Producto) => {
  cartStore.addToCart(producto)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e2e8f0 !important;
  background-color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(28, 144, 161, 0.12) !important;
  border-color: #1C90A1 !important;
}

/* 🖼️ Contenedor de Imagen adaptado */
.image-wrapper {
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid #f1f5f9;
  overflow: hidden;
}

.product-img {
  mix-blend-mode: multiply;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

/* 🧪 EL SECRETO: Capa Overlay oculta por defecto */
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Usamos el color corporativo #1C90A1 con un 82% de opacidad idéntico a image_8a1600.png */
  background-color: rgba(28, 144, 161, 0.82); 
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 2;
}

/* 🪄 Efectos combinados al pasar el mouse por la tarjeta */
.product-card:hover .product-overlay {
  opacity: 1;
  visibility: visible;
}

.product-card:hover .product-img {
  transform: scale(1.04);
}

/* Limita el texto a un máximo de 3 líneas para cuidar la estética */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  background: #f9f9f9;
  border-radius: 16px;
  border: 2px dashed #e0e0e0;
}
</style>