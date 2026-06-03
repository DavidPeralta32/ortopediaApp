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

              <div class="image-wrapper bg-grey-lighten-5">
                <v-img :src="producto.image" height="200" cover class="product-img pa-4">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>

              <v-card-item class="pt-4">
                <div class="text-overline mb-1" style="color: #1C90A1;">{{ producto.category }}</div>
                <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                  {{ producto.name }}
                </v-card-title>

                <v-expand-transition>
                  <div v-show="productoAbierto === producto.id">
                    <v-divider class="my-2"></v-divider>
                    <p class="text-body-2 text-medium-emphasis text-justify lh-sm mb-2">
                      {{ producto.descripcion }}
                    </p>
                  </div>
                </v-expand-transition>

              </v-card-item>

              <v-divider class="mx-4 opacity-60"></v-divider>
              <v-card-actions class="px-4 py-3 bg-white rounded-b-xl d-flex align-center">
                <v-btn class="text-none font-weight-medium text-body-2 text-grey-darken-2" variant="text"
                  density="comfortable"
                  :append-icon="productoAbierto === producto.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="toggleDescription(producto.id)">
                  Detalles
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon="mdi-cart-plus" color="#1C90A1" elevation="0" size="small" :disabled="!producto.stock"
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
import { ref, computed, watch } from "vue"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"
import { useFilterStore } from "@/stores/FilterProductosStore.ts";

const filterStore = useFilterStore();
const productoAbierto = ref<number | null>(null);

// Lista de productos simulada
const productos = ref([
  {
    "id": 1,
    "name": "Mentonera",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907879/mentonera_ag42kj.png",
    "descripcion": ""
  },
  {
    "id": 2,
    "name": "Callarin Cervical Universal Blando",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907878/Callari%CC%81n_Cervical_Universal_Blando_bx2vzd.png",
    "descripcion": ""
  },
  {
    "id": 3,
    "name": "Collarin Semi-rigido Perfil Bajo",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907876/Collari%CC%81n_Semiri%CC%81gido_Perfil_Bajo_e7swke.png",
    "descripcion": ""
  },
  {
    "id": 4,
    "name": "Collarín Cervical Blando Infantil",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907875/collarin_cervical_blando_infantil_vymmoa.png",
    "descripcion": ""
  },
  {
    "id": 5,
    "name": "Collarín Cervical",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907874/Collari%CC%81n_Cervical_jlux1p.png",
    "descripcion": ""
  },
  {
    "id": 6,
    "name": "Callarín Cervical Blando Azul Marino",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907873/Callari%CC%81n_Cervical_Blando_Azul_Marino_zqw7gf.png",
    "descripcion": ""
  },
  {
    "id": 7,
    "name": "Collarin Philadelphia",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907872/collarin_philadelphia_txyeny.png",
    "descripcion": ""
  },
  {
    "id": 8,
    "name": "Collarín Ortesís Tipo Miami",
    "category": "ortopedia-blanda",
    "sub_categoria": "alta",
    "zona": "cuello",
    "stock": true,
    "image": "https://res.cloudinary.com/drkehdimc/image/upload/v1779907871/Collari%CC%81n_Ortesi%CC%81s_Tipo_Miami_tiv0no.png",
    "descripcion": ""
  },
])

// Filtros
const categories = ref(["Ortopedia", "Artroscopia", "Neurocirugia", "ortopedia-blanda"])
const selectedCategories = ref<string[]>([...categories.value])
const selectAllCategories = ref(true)

const inStockOnly = ref(false)


// Observa cambios en la selección individual
watch(selectedCategories, (newVal) => {
  selectAllCategories.value = newVal.length === categories.value.length
})

// Computed para aplicar filtros
const filteredProducts = computed(() => {
  // Si el store aún no tiene categoría (mientras carga la API), devolvemos vacío o todos
  filterStore.selectedCategory = "Todos"
  if (!filterStore.selectedCategory) return [];

  return productos.value.filter((p) => {
    // 1. Filtro por Categoría
    // Comparamos convirtiendo ambos a minúsculas para evitar errores de dedo
    const matchCategory =
      filterStore.selectedCategory === 'Todos' ||
      p.category.toLowerCase() === filterStore.selectedCategory.toLowerCase();

    // 2. Filtro por Stock
    const matchStock = !inStockOnly.value || p.stock;

    // Solo si cumple ambas condiciones se muestra el producto
    return matchCategory && matchStock;
  })
})

const cartStore = useCartStore()

const addCart = (producto: Producto) => {
  cartStore.addToCart(producto)
}

const toggleDescription = (id: number) => {
  productoAbierto.value = productoAbierto.value === id ? null : id;
};
</script>

<style scoped>
/* Estilos Profesionales Personalizados */

.product-card {
  border: 1px solid #e2e8f0 !important;
  background-color: #ffffff;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto al pasar el mouse sobre la tarjeta */
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
  border-color: transparent !important;
}

.image-wrapper {
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.product-img {
  mix-blend-mode: multiply;
}



/* Efecto de zoom en la imagen al hacer hover */
.product-card:hover .v-img {
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.stock-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.add-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
}

.empty-state {
  background: #f9f9f9;
  border-radius: 16px;
  border: 2px dashed #e0e0e0;
}
</style>