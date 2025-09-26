<template>
    <div style="margin: 22px; margin-top: 90px;">
        <v-row>
            <!-- Sidebar de filtros -->
            <v-col cols="12" md="3">
                <v-card class="pa-4">
                    <h4 class="mb-4" style="font-size: 20px;">Filtros</h4>

                    <!-- Categorías -->
                    <v-select v-model="selectedCategory" :items="categories" label="Categoría" clearable></v-select>

                    <!-- Rango de precio -->
                    <v-range-slider v-model="priceRange" :max="maxPrice" :min="0" step="50" label="Precio"
                        thumb-label></v-range-slider>
                    <p>
                        Precio: {{ priceRange[0] }} - {{ priceRange[1] }}
                    </p>

                    <!-- Disponibilidad -->
                    <v-checkbox v-model="inStockOnly" label="Solo disponibles"></v-checkbox>
                </v-card>
            </v-col>

            <!-- Lista de productos -->
            <v-col cols="12" md="9">
                <v-row>
                    <v-col v-for="producto in filteredProducts" :key="producto.id" cols="12" sm="6" md="4">
                        <v-card class="pa-2">
                            <v-img :src="producto.image" height="200" class="rounded-lg"></v-img>
                            <v-card-title>{{ producto.name }}</v-card-title>
                            <v-chip :color="producto.stock ? 'green' : 'red'" text-color="white" size="small">
                                {{ producto.stock ? 'Disponible' : 'Agotado' }}
                            </v-chip>
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

<script setup>
import { ref, computed } from "vue"

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
        image: "https://via.placeholder.com/200x200?text=Playera",
    },
    {
        id: 3,
        name: "Shaver Artroscópico",
        category: "Artroscopia",
        price: 900,
        stock: false,
        image: "https://via.placeholder.com/200x200?text=Mochila",
    },
    {
        id: 4,
        name: "Sistema de Torre de Artroscopía",
        category: "Artroscopia",
        price: 2200,
        stock: true,
        image: "https://via.placeholder.com/200x200?text=Running+Pro",
    },
    {
        id: 5,
        name: "Microscopio quirúrgic",
        category: "Neurocirugia",
        price: 2200,
        stock: true,
        image: "https://via.placeholder.com/200x200?text=Running+Pro",
    },
])

// Filtros
const categories = ["Ortopedia", "Artroscopia", "Neurocirugia"]
const selectedCategory = ref(null)
const priceRange = ref([0, 2500])
const maxPrice = Math.max(...productos.value.map((p) => p.price))
const inStockOnly = ref(false)

// Computed para aplicar filtros
const filteredProducts = computed(() => {
    return productos.value.filter((p) => {
        const matchCategory =
            !selectedCategory.value || p.category === selectedCategory.value
        const matchPrice =
            p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
        const matchStock = !inStockOnly.value || p.stock
        return matchCategory && matchPrice && matchStock
    })
})
</script>

<style scoped>
h3 {
    font-weight: bold;
}

h4 {
    font-weight: bold;
}
</style>
