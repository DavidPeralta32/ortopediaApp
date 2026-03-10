<template>
    <v-container fluid class="px-md-10 py-10 bg-grey-lighten-5 mt-16">
        <v-row>

            <v-col cols="12" md="12" lg="12">
                <header class="mb-8">
                    <h2 class="text-h4 font-weight-bold mb-2">
                        {{ currentCategory === 'todos' ? 'EQUIPAMIENTO MÉDICO' : currentCategory.toString().toUpperCase() }}
                    </h2>
                    <p class="text-body-1 text-medium-emphasis">
                        Mostrando {{ filteredProducts.length }} productos disponibles
                    </p>
                    

                    <v-text-field v-model="searchQuery" prepend-inner-icon="mdi-magnify"
                        label="Buscar producto por nombre" variant="solo" flat bg-color="white"
                        class="rounded-xl mt-4 border shadow-sm" hide-details clearable></v-text-field>
                </header>

                <v-row v-if="filteredProducts.length > 0">
                    <v-col v-for="producto in paginatedProducts" :key="producto.id" cols="12" sm="6" lg="3">
                        <v-card variant="flat" class="product-card h-100 overflow-hidden rounded-xl">
                            <div class="image-wrapper">
                                <v-img :src="producto.image" height="240" cover class="bg-white">
                                    <div class="card-badges">
                                        <v-chip :color="producto.stock ? 'success' : 'error'" size="x-small"
                                            variant="flat" class="font-weight-bold">
                                            {{ producto.stock ? 'STOCK' : 'AGOTADO' }}
                                        </v-chip>
                                    </div>
                                </v-img>
                            </div>

                            <v-card-item class="pa-5">
                                <div class="text-overline text-primary font-weight-bold mb-1">{{ producto.category }}
                                </div>
                                <v-card-title class="text-h6 font-weight-bold text-wrap mb-2 line-height-1">
                                    {{ producto.name }}
                                </v-card-title>

                                <div class="d-flex align-center justify-space-between mt-4">
                                    <v-btn icon="mdi-cart-plus" style="background-color:#1C90A1; color: white;"
                                        elevation="2" size="small" :disabled="!producto.stock"
                                        @click="addCart(producto)"></v-btn>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-col>

                    <v-pagination v-if="pageCount > 1" v-model="currentPage" :length="pageCount" class="mt-8"
                        active-color="primary"></v-pagination>
                </v-row>

                <v-fade-transition>
                    <div v-if="filteredProducts.length === 0" class="text-center py-16 empty-container rounded-xl">
                        <v-icon size="64" color="grey-lighten-1">mdi-magnify-close</v-icon>
                        <h3 class="text-h5 mt-4 font-weight-medium">No hay coincidencias</h3>
                        <p class="text-grey">Intenta ajustar los filtros laterales</p>
                    </div>
                </v-fade-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import tobilleraCventa from "../../../public/img/Productos/tobilleraCVenta.png"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"

import { useRoute } from "vue-router"
const route = useRoute()

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
const searchQuery = ref("")
const itemsPerPage = 15
const currentPage = ref(1)


// Obtenemos la categoría desde la URL (ej: /productos?cat=neurocirugia)
const currentCategory = computed(() => route.query.cat || 'Todos')

// Filtramos basándonos en la categoría activa
const productsByCategory = computed(() => {
    // Si la categoría es 'todos' o está vacía, mostramos todo
    const cat = (currentCategory.value as string).toLowerCase();
    
    // Si es 'todos', devolvemos el arreglo original completo
    if (cat === 'todos' || !cat || cat === 'todas') return productos.value;
    
    return productos.value.filter(p => p.category.toLowerCase() === cat);
})


// Aplicamos el filtro de búsqueda sobre los productos de la categoría
const filteredProducts = computed(() => {
    const query = (searchQuery.value || "").toLowerCase()
    return productsByCategory.value.filter(p =>
        p.name.toLowerCase().includes(query)
    );
})

// Paginación: cortamos el arreglo filtrado
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))




watch(currentCategory, () => {
    currentPage.value = 1
});


watch(searchQuery, () => {
    currentPage.value = 1;
});

// Observa cambios en la página actual O en la categoría
watch([currentPage, currentCategory], () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el movimiento sea elegante
    });
});

const cartStore = useCartStore()

const addCart = (producto: Producto) => {
    cartStore.addToCart(producto)
}
</script>

<style scoped>
/* Estilos Globales del Componente */
.letter-spacing-1 {
    letter-spacing: 1px;
}

/* Sidebar Fijo al hacer scroll */
.sticky-sidebar {
    position: sticky;
    top: 110px;
    /* Ajustar según altura de tu Navbar */
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

/* Tarjeta de Producto */
.product-card {
    border: 1px solid #edf2f7 !important;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    border-color: transparent !important;
}

.image-wrapper {
    position: relative;
    overflow: hidden;
}



.card-badges {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
}

.empty-container {
    background: white;
    border: 2px dashed #e2e8f0;
}

.line-height-1 {
    line-height: 1.2 !important;
}
</style>
