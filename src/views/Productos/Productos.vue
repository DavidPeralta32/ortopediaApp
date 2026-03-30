<template>
    <v-container fluid class="px-md-10 py-10 bg-grey-lighten-5 mt-16">
        <v-row>
            <v-col cols="12">
                <header class="mb-8">
                    <h2 class="text-h4 font-weight-bold mb-2">
                        {{ currentCategory === 'Todos' ? 'EQUIPAMIENTO MÉDICO' : String(currentCategory).toUpperCase()
                        }}
                    </h2>
                    <p class="text-body-1 text-medium-emphasis">
                        Mostrando <b>{{ filteredProducts.length }}</b> productos
                    </p>

                    <v-text-field v-model="searchQuery" prepend-inner-icon="mdi-magnify" label="Buscar producto..."
                        variant="solo" flat bg-color="white" class="rounded-xl mt-4 border shadow-sm" hide-details
                        clearable></v-text-field>
                </header>

                <v-row v-if="isLoading">
                    <v-col v-for="n in 4" :key="n" cols="12" sm="6" lg="3">
                        <v-skeleton-loader type="card, article" class="rounded-xl"></v-skeleton-loader>
                    </v-col>
                </v-row>

                <v-row v-else-if="filteredProducts.length > 0">
                    <v-col v-for="producto in paginatedProducts" :key="producto.id" cols="12" sm="6" lg="3">
                        <v-card variant="flat" class="product-card  overflow-hidden rounded-xl border">
                            <div class="image-wrapper">
                                <v-img :src="producto.image" :aspect-ratio="1" cover class="bg-white" loading="lazy">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate
                                                color="grey-lighten-4"></v-progress-circular>
                                        </v-row>
                                    </template>
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

                                <v-card-subtitle class="text-caption text-medium-emphasis mb-1">
                                    {{ producto.sub_categoria }}
                                </v-card-subtitle>

                                <v-card-title class="text-subtitle-1 font-weight-bold text-wrap mb-2 line-height-1">
                                    {{ producto.name }}
                                </v-card-title>

                                <v-card-actions>
                                    <v-btn class="text-primary" text="Ver más"  @click="toggleDescription(producto.id)"></v-btn>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                        :icon="productoAbierto === producto.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="toggleDescription(producto.id)"></v-btn>
                                </v-card-actions>

                                <v-expand-transition>
                                    <div v-show="productoAbierto === producto.id">
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            {{ producto.descripcion }}
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>

                                <div class="d-flex align-center justify-space-between mt-auto">
                                    <v-btn icon="mdi-cart-plus" color="#1C90A1" class="text-white" elevation="2"
                                        size="small" :disabled="!producto.stock" @click="addCart(producto)"></v-btn>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>

                <v-fade-transition>
                    <div v-if="!isLoading && filteredProducts.length === 0"
                        class="text-center py-16 empty-container rounded-xl">
                        <v-icon size="64" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
                        <h3 class="text-h5 mt-4 font-weight-medium">No encontramos productos</h3>
                        <p class="text-grey">Intenta cambiar el nombre o la categoría</p>
                        <v-btn variant="text" color="primary" class="mt-4" @click="searchQuery = ''">Limpiar
                            búsqueda</v-btn>
                    </div>
                </v-fade-transition>

                <div class="d-flex justify-center mt-12">
                    <v-pagination v-if="pageCount > 1" v-model="currentPage" :length="pageCount" active-color="primary"
                        variant="flat" rounded="circle" :total-visible="5"></v-pagination>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"
import { getProductosLineaBlancaZonaSuperior } from "@/api/Productos.ts";
import { useRoute } from "vue-router"

const route = useRoute()

// Lista de productos
const productos = ref<Producto[]>([])
const searchQuery = ref("")
const itemsPerPage = 10
const currentPage = ref(1)
const isLoading = ref(true)

const productoAbierto = ref<number | null>(null);

const toggleDescription = (id: number) => {
    // Si el que toco ya está abierto, lo cierro (null), si no, guardo su ID
    if (productoAbierto.value === id) {
        productoAbierto.value = null;
    } else {
        productoAbierto.value = id;
    }
};

onMounted(async () => {
    try {
        productos.value = await getProductosLineaBlancaZonaSuperior();
    } catch (err) {
        productos.value = [];
        console.error("Error al obtener los productos: ", err);
    } finally {
        isLoading.value = false;
    }
});


// Obtenemos la categoría desde la URL (ej: /productos?cat=neurocirugia)
const currentCategory = computed(() => route.query.cat || 'Todos')

// OPTIMIZACIÓN 1: Un solo computed para todos los filtros
// Esto es más eficiente que tener 3 computeds anidados
const filteredProducts = computed(() => {
    const cat = String(currentCategory.value).toLowerCase();

    const query = (searchQuery.value || "").toLowerCase().trim();

    return productos.value.filter(p => {
        const matchesCategory = (cat === 'todos' || cat === 'todas' || p.category.toLowerCase() === cat);
        const matchesSearch = p.name.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
})

// Paginación: cortamos el arreglo filtrado
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))




// OPTIMIZACIÓN 2: Resetear página solo cuando cambian los filtros
watch([currentCategory, searchQuery], () => {
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
