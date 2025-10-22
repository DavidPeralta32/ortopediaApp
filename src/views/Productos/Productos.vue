<template>
  <div style="margin: 22px; margin-top: 90px;">
    <v-row>
      <!-- Sidebar de filtros -->
      <v-col cols="12" md="3">
        <v-card class="pa-4">
          <h4 class="mb-4" style="font-size: 20px;">Filtros</h4>

          <!-- Lista de checkboxes de categorías -->
          <h5 class="mb-2">Categorías</h5>
          <v-checkbox
            v-model="selectAllCategories"
            label="Todos"
            @change="toggleAllCategories"
          ></v-checkbox>

          <v-checkbox
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
            v-model="selectedCategories"
          ></v-checkbox>
        </v-card>
      </v-col>

      <!-- Lista de productos -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="producto in filteredProducts"
            :key="producto.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="pa-2" elevation="5">
              <v-img
                :src="producto.image"
                height="200"
                class="rounded-lg"
              ></v-img>
              <v-card-title>{{ producto.name }}</v-card-title>
              <v-chip
                :color="producto.stock ? 'green' : 'red'"
                text-color="white"
                size="small"
              >
                {{ producto.stock ? 'Disponible' : 'Agotado' }}
              </v-chip>
              <v-btn
                prepend-icon="mdi-cart-plus"
                variant="tonal"
                block
                style="margin-top: 8px;"
                @click="addCart(producto)"
              >
                Agregar
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Si no hay resultados -->
        <div v-if="filteredProducts.length === 0" class="text-center py-8">
          <v-icon size="48">mdi-alert-circle-outline</v-icon>
          <p>No se encontraron productos.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import tobilleraCventa from "../../../public/img/Productos/tobilleraCVenta.png"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"

// Lista de productos simulada
const productos = ref([
  {
    id: 1,
    name: "Tobillera",
    category: "Ortopedia",
    price: 1500,
    stock: true,
    image: "https://dummyimage.com/200x200/000/fff.png&text=Rodillera",
  },
  {
    id: 2,
    name: "Rodillera",
    category: "Ortopedia",
    price: 600,
    stock: true,
    image: tobilleraCventa,
  },
  {
    id: 3,
    name: "Shaver Artroscópico",
    category: "Artroscopia",
    price: 900,
    stock: false,
    image: tobilleraCventa,
  },
  {
    id: 4,
    name: "Sistema de Torre de Artroscopía",
    category: "Artroscopia",
    price: 2200,
    stock: true,
    image: tobilleraCventa,
  },
  {
    id: 5,
    name: "Microscopio quirúrgico",
    category: "Neurocirugia",
    price: 2200,
    stock: true,
    image: tobilleraCventa,
  },
])

// Filtros
const categories = ref(["Ortopedia", "Artroscopia", "Neurocirugia"])
const selectedCategories = ref<string[]>([...categories.value])
const selectAllCategories = ref(true)

const priceRange = ref([0, 2500])
const maxPrice = Math.max(...productos.value.map((p) => p.price))
const inStockOnly = ref(false)

// Al hacer clic en "Todos"
function toggleAllCategories() {
  if (selectAllCategories.value) {
    selectedCategories.value = [...categories.value] // selecciona todas
  } else {
    selectedCategories.value = [] // deselecciona todas
  }
}

// Observa cambios en la selección individual
watch(selectedCategories, (newVal) => {
  selectAllCategories.value = newVal.length === categories.value.length
})

// Computed para aplicar filtros
const filteredProducts = computed(() => {
  return productos.value.filter((p) => {
    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(p.category)

    const matchPrice =
      p.price >= priceRange.value[0] && p.price <= priceRange.value[1]

    const matchStock = !inStockOnly.value || p.stock

    return matchCategory && matchPrice && matchStock
  })
})

const cartStore = useCartStore()

const addCart = (producto: Producto) => {
  cartStore.addToCart(producto)
}
</script>

<style scoped>
h3 {
  font-weight: bold;
}

h4 {
  font-weight: bold;
}
</style>
