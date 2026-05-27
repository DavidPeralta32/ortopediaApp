<template>
    <v-container fluid class="px-md-10 py-10 bg-grey-lighten-4 mt-16">
        <v-row justify="center">
            <v-col cols="12" lg="11">
                <header class="mb-8">
                    <h2 class="text-h4 font-weight-bold mb-1 text-grey-darken-4 text-uppercase tracking-wide">
                        Ortopedia Blanda
                    </h2>

                    <!-- Sección de Filtros por Zona -->
                    <div class="mt-4 mb-2">
                        <span
                            class="text-caption font-weight-bold text-grey-darken-1 text-uppercase tracking-wider d-block mb-2">
                            Filtrar por zona del cuerpo:
                        </span>
                        <v-chip-group v-model="selectedZone" selected-class="bg-teal text-white" mandatory>
                            <v-chip v-for="zona in zonas" :key="zona.id" :value="zona.id" filter :disabled="isLoading"
                                variant="tonal" class="font-weight-medium px-4">
                                {{ zona.name }}
                            </v-chip>
                        </v-chip-group>
                    </div>

                    <div class="d-flex align-center flex-wrap gap-4 mt-4">
                        <p class="text-body-2 text-medium-emphasis mb-0">
                            Mostrando <span class="font-weight-bold text-grey-darken-3">{{ filteredProducts.length
                                }}</span> productos
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn v-if="searchQuery || selectedZone !== 'Todos'" variant="text" color="error" size="small"
                            @click="resetFilters" class="text-none">
                            Limpiar filtros
                        </v-btn>
                    </div>

                    <v-text-field v-model="searchQuery" prepend-inner-icon="mdi-magnify"
                        label="Buscar producto por nombre o descripción..." variant="solo" flat bg-color="white"
                        class="rounded-xl mt-4 border shadow-sm" hide-details clearable></v-text-field>
                </header>

                <v-row v-if="isLoading">
                    <v-col v-for="n in 4" :key="n" cols="12" sm="6" md="4" lg="3">
                        <v-skeleton-loader type="card, article" class="rounded-xl"></v-skeleton-loader>
                    </v-col>
                </v-row>

                <v-row v-else-if="filteredProducts.length > 0" align="stretch">
                    <v-col v-for="producto in paginatedProducts" :key="producto.id" cols="12" sm="6" md="4" lg="3">
                        <v-card variant="flat" class="product-card rounded-xl d-flex flex-column h-100">

                            <div class="image-wrapper bg-grey-lighten-5">
                                <v-img :src="producto.image" height="200" contain class="product-img pa-4">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                                            <v-progress-circular color="grey-lighten-1"
                                                indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                    <div class="card-badges">
                                        <v-chip :color="producto.stock ? 'teal-darken-1' : 'red-darken-1'"
                                            size="x-small" variant="flat" class="font-weight-bold text-white px-2">
                                            {{ producto.stock ? 'STOCK' : 'AGOTADO' }}
                                        </v-chip>
                                    </div>
                                </v-img>
                            </div>

                            <v-card-item class="pa-4 flex-grow-1 d-flex flex-column justify-space-between">
                                <div>
                                    <span
                                        class="text-caption font-weight-bold text-teal text-uppercase tracking-wider d-block mb-1">
                                        {{ producto.category }}
                                    </span>
                                    <h3 class="product-title font-weight-bold text-grey-darken-4 mb-2">
                                        {{ producto.name }}
                                    </h3>
                                </div>

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
                                <v-btn class="text-none font-weight-medium text-body-2 text-grey-darken-2"
                                    variant="text" density="comfortable"
                                    :append-icon="productoAbierto === producto.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="toggleDescription(producto.id)">
                                    Detalles
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn icon="mdi-cart-plus" color="#1C90A1" elevation="0" size="small"
                                    :disabled="!producto.stock" @click="addCart(producto)"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>

                <v-fade-transition>
                    <div v-if="!isLoading && filteredProducts.length === 0"
                        class="text-center py-16 empty-container rounded-xl bg-white">
                        <v-icon size="64" color="grey-lighten-1">mdi-magnify-close</v-icon>
                        <h3 class="text-h5 mt-4 font-weight-medium text-grey-darken-3">Sin resultados</h3>
                        <p class="text-grey-darken-1">
                            No encontramos productos en esta sección.
                        </p>
                    </div>
                </v-fade-transition>

                <div class="d-flex justify-center mt-12">
                    <v-pagination v-if="pageCount > 1" v-model="currentPage" :length="pageCount" active-color="#1C90A1"
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
import { getProductosPorArchivo } from "@/api/Productos.ts";

const CATEGORIA_FIJA = "ortopedia-blanda";

const productos = ref<Producto[]>([])
const searchQuery = ref("")
const selectedZone = ref("Todos") // Seleccionado por defecto desde el inicio
const itemsPerPage = 12
const currentPage = ref(1)
const isLoading = ref(true)
const productoAbierto = ref<number | null>(null);

/**
 * CONFIGURACIÓN DE TUS FILTROS:
 * El 'id' debe coincidir con cómo se llaman o quieres que se llamen tus archivos .json
 * Tu función de la API los transformará automáticamente (ej: 'miembro superior' -> 'MiembroSuperior.json')
 */
const zonas = [
    { id: 'Todos', name: 'Ver Todos' },
    { id: 'miembro superior', name: 'Zona Alta' },
    { id: 'tronco', name: 'Zona Media' },
    { id: 'miembro inferior', name: 'Zona Baja' },
    { id: 'otros', name: 'Otros / Accesorios' }
]

const cartStore = useCartStore()

const toggleDescription = (id: number) => {
    productoAbierto.value = productoAbierto.value === id ? null : id;
};

// Función encargada de pedir los datos a la API según la zona
const fetchProductos = async (zona: string) => {
    isLoading.value = true;
    try {
        productos.value = await getProductosPorArchivo(CATEGORIA_FIJA, zona);
    } catch (err) {
        console.error("Error cargando productos por zona:", err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    // Carga inicial usando el valor por defecto: "Todos" -> buscará 'Todos.json'
    fetchProductos(selectedZone.value);
});

// Watcher que reacciona de inmediato cuando el usuario hace clic en una zona diferente
watch(selectedZone, (newZone) => {
    currentPage.value = 1;
    fetchProductos(newZone);
});

// Filtro por texto en el cliente sobre los productos ya cargados de la zona actual
const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return productos.value;

    return productos.value.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
    );
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

watch(searchQuery, () => {
    currentPage.value = 1;
});

watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const resetFilters = () => {
    searchQuery.value = "";
    selectedZone.value = "Todos";
};

const addCart = (producto: Producto) => {
    cartStore.addToCart(producto)
}
</script>

<style scoped>
.product-card {
    border: 1px solid #e2e8f0 !important;
    background-color: #ffffff;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.08) !important;
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

.card-badges {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
}

.product-title {
    font-size: 0.95rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.6em;
}

.empty-container {
    border: 2px dashed #cbd5e1;
}

.tracking-wide {
    letter-spacing: 0.05em;
}

.tracking-wider {
    letter-spacing: 0.07em;
}

.lh-sm {
    line-height: 1.4;
}
</style>