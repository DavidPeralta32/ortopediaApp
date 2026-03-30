<template>
    <v-container fluid class="px-md-10 py-10 bg-grey-lighten-5 mt-16">
        <v-row>
            <v-col cols="12" md="3" lg="2">
                <div class="sticky-sidebar">
                    <h3 class="text-subtitle-1 font-weight-bold mb-4">FILTRAR POR ZONA</h3>

                    <v-checkbox v-for="cat in categoriasDisponibles" :key="cat" v-model="selectedCategories"
                        :label="cat" :value="cat" color="primary" hide-details density="compact"
                        class="mb-1"></v-checkbox>

                    <v-divider class="my-6"></v-divider>

                    <v-btn variant="text" color="error" size="small" prepend-icon="mdi-filter-off" @click="resetFilters"
                        v-if="selectedCategories.length > 0 || searchQuery">
                        Limpiar filtros
                    </v-btn>
                </div>
            </v-col>

            <v-col cols="12" md="9" lg="10">
                <header class="mb-8">
                    <h2 class="text-h4 font-weight-bold mb-2">
                        CATÁLOGO DE PRODUCTOS
                    </h2>
                    <p class="text-body-1 text-medium-emphasis">
                        Mostrando <b>{{ filteredProducts.length }}</b> productos
                    </p>

                    <v-text-field v-model="searchQuery" prepend-inner-icon="mdi-magnify" label="Buscar producto..."
                        variant="solo" flat bg-color="white" class="rounded-xl mt-4 border shadow-sm" hide-details
                        clearable></v-text-field>
                </header>

                <v-row v-if="isLoading">
                    <v-col v-for="n in 4" :key="n" cols="12" sm="6" lg="4">
                        <v-skeleton-loader type="card, article" class="rounded-xl"></v-skeleton-loader>
                    </v-col>
                </v-row>

                <v-row v-else-if="filteredProducts.length > 0" align="start">
                    <v-col v-for="producto in paginatedProducts" :key="producto.id" cols="12" sm="6" lg="4" xl="3">
                        <v-card variant="flat"
                            class="product-card overflow-hidden rounded-xl border d-flex flex-column h-100">
                            <div class="image-wrapper">
                                <v-img :src="producto.image" :aspect-ratio="1" cover class="bg-white">
                                    <div class="card-badges">
                                        <v-chip :color="producto.stock ? 'success' : 'error'" size="x-small"
                                            variant="flat" class="font-weight-bold">
                                            {{ producto.stock ? 'STOCK' : 'AGOTADO' }}
                                        </v-chip>
                                    </div>
                                </v-img>
                            </div>
                            <v-card-item class="pa-5 flex-grow-1">
                                <div class="text-overline text-primary font-weight-bold mb-1">{{ producto.category }}
                                </div>
                                <v-card-title class="text-subtitle-1 font-weight-bold text-wrap mb-2 line-height-1">
                                    {{ producto.name.toUpperCase() }}
                                </v-card-title>

                                <v-card-actions class="px-0">
                                    <v-btn class="text-primary text-none" variant="text"
                                        @click="toggleDescription(producto.id)">Ver más</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        :icon="productoAbierto === producto.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="toggleDescription(producto.id)"></v-btn>
                                </v-card-actions>

                                <v-expand-transition>
                                    <div v-show="productoAbierto === producto.id">
                                        <v-divider></v-divider>
                                        <v-card-text class="text-justify px-0">
                                            {{ producto.descripcion.toUpperCase() }}
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>

                                <div class="d-flex align-center justify-end mt-4">
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

                        <div v-if="selectedCategories.length === 0">
                            <v-icon size="64" color="primary" class="mb-4">mdi-filter-check-outline</v-icon>
                            <h3 class="text-h5 font-weight-medium">Selecciona una categoría</h3>
                            <p class="text-grey">
                                Para buscar o ver productos, primero selecciona al menos una
                                <b>Zona de Miembro</b> en el panel lateral.
                            </p>
                        </div>

                        <div v-else>
                            <v-icon size="64" color="grey-lighten-1">mdi-magnify-close</v-icon>
                            <h3 class="text-h5 mt-4 font-weight-medium">Sin resultados</h3>
                            <p class="text-grey">
                                No hay productos que coincidan con "{{ searchQuery }}" en las categorías seleccionadas.
                            </p>
                            <v-btn variant="text" color="primary" class="mt-4" @click="searchQuery = ''">
                                Limpiar búsqueda
                            </v-btn>
                        </div>

                    </div>
                </v-fade-transition>

                <div class="d-flex justify-center mt-12">
                    <v-pagination v-if="pageCount > 1" v-model="currentPage" :length="pageCount" active-color="primary"
                        rounded="circle" :total-visible="5"></v-pagination>
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

const categoriasDisponibles = [
    'MIEMBRO SUPERIOR',
    'MIEMBRO MEDIO',
    'MIEMBRO INFERIOR'
];

const selectedCategories = ref<string[]>([]); // Array para múltiples selecciones

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


    // NUEVA CONDICIÓN: Si no hay selección ni búsqueda, no mostrar nada
    if (selectedCategories.value.length === 0) {
        return [];
    }

    const query = (searchQuery.value || "").toLowerCase().trim();

    return productos.value.filter(p => {
        // 1. Filtro por Checkbox (aquí ya no necesitamos el "|| length === 0" 
        // porque ya validamos arriba que si llega aquí es porque hay algo seleccionado)
        const matchesCategory = selectedCategories.value.length === 0 ||
            selectedCategories.value.includes(p.sub_categoria.toUpperCase());

        // 2. Filtro por Buscador
        const matchesSearch = p.name.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });
});

// Resetear filtros
const resetFilters = () => {
    selectedCategories.value = [];
    searchQuery.value = "";
    currentPage.value = 1;
};

// Paginación: cortamos el arreglo filtrado
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))




// OPTIMIZACIÓN 2: Resetear página solo cuando cambian los filtros
watch([selectedCategories, searchQuery], () => {
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

.sticky-sidebar {
    position: sticky;
    top: 100px;
    /* Ajusta según la altura de tu navbar */
    padding: 20px;
    background: white;
    border-radius: 16px;
    border: 1px solid #edf2f7;
}
</style>
