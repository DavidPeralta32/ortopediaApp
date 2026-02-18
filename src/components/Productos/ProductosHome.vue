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
                        <v-card class="product-card h-100 d-flex flex-column" variant="flat">
                            <div class="image-container">
                                <v-img :src="producto.image" height="220" cover class="bg-grey-lighten-4 rounded-t-lg">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate
                                                color="grey-lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>

                                    <v-chip :color="producto.stock ? 'success' : 'error'" size="x-small"
                                        class="ma-2 stock-badge" variant="flat">
                                        {{ producto.stock ? 'DISPONIBLE' : 'AGOTADO' }}
                                    </v-chip>
                                </v-img>
                            </div>

                            <v-card-item class="pt-4">
                                <div class="text-overline mb-1 text-primary">{{ producto.category }}</div>
                                <v-card-title class="text-h6 font-weight-bold px-0 pt-0">
                                    {{ producto.name }}
                                </v-card-title>
                            </v-card-item>

                            <!--<v-card-text class="flex-grow-1">
                                <div class="text-h5 font-weight-black text-secondary">
                                    ${{ producto.price.toLocaleString('es-MX') }}
                                </div>
                            </v-card-text>-->

                            <v-card-actions class="pa-4 pt-0">
                                <v-btn color="primary" variant="elevated" block rounded="lg"
                                    prepend-icon="mdi-cart-plus" :disabled="!producto.stock" @click="addCart(producto)"
                                    class="add-btn">
                                    Agregar al carrito
                                </v-btn>
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
const inStockOnly = ref(false)


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
/* Estilos Profesionales Personalizados */

.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e0e0e0 !important;
  overflow: hidden;
}

/* Efecto al pasar el mouse sobre la tarjeta */
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
  border-color: transparent !important;
}

.image-container {
  overflow: hidden;
  position: relative;
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