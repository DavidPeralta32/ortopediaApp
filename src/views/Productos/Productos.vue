<template>
    <div class="page-container">
        <v-container fluid class="py-12 px-6 content-wrap bg-grey-lighten-4 mt-16">
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
                                <v-chip v-for="zona in zonas" :key="zona.id" :value="zona.id" filter
                                    :disabled="isLoading" variant="tonal" class="font-weight-medium px-4">
                                    {{ zona.name }}
                                </v-chip>
                            </v-chip-group>
                        </div>

                        <div class="d-flex align-center flex-wrap gap-4 mt-4">
                            <p class="text-body-2 text-medium-emphasis mb-0">
                                Mostrando <span class="font-weight-bold text-grey-darken-3">
                                    {{ displayedCount }}/{{ filteredProducts.length }}
                                </span> productos
                            </p>
                            <v-spacer></v-spacer>
                            <v-btn v-if="searchQuery || selectedZone !== 'Todos'" variant="text" color="error"
                                size="small" @click="resetFilters" class="text-none">
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

                    <v-row v-else-if="filteredProducts.length > 0" class="ma-0">
                        <v-col v-for="producto in paginatedProducts" :key="producto.id" cols="12" sm="6" md="4" lg="3">
                            <v-card variant="flat" class="product-card rounded-xl d-flex flex-column"
                                style="min-width: 25%;">

                                <!-- CONTENEDOR DE IMAGEN + HOVER OVERLAY -->
                                <div class="image-wrapper bg-grey-lighten-5">
                                    <v-img :src="producto.image" height="200" contain class="product-img pa-4">
                                        <template v-slot:placeholder>
                                            <div
                                                class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                                                <v-progress-circular color="grey-lighten-1"
                                                    indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>

                                    <!-- Esta es la capa que aparecerá en el HOVER -->
                                    <div v-if="producto.descripcion && producto.descripcion.trim() !== ''"
                                        class="description-overlay pa-4 d-flex align-center justify-center">
                                        <p class="text-body-2 text-white text-justify lh-sm mb-0 overflow-y-auto"
                                            style="max-height: 100%;">
                                            {{ producto.descripcion }}
                                        </p>
                                    </div>
                                </div>

                                <!-- CUERPO DE LA TARJETA (Ya sin el v-expand-transition antiguo) -->
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
                                </v-card-item>

                                <v-divider class="mx-4 opacity-60"></v-divider>

                                <!-- ACCIONES (Removido el botón Detalles porque ya no hace falta hacer click) -->
                                <v-card-actions class="px-4 py-3 bg-white rounded-b-xl d-flex align-center">
                                    <span class="text-caption text-grey-darken-1 font-weight-medium">

                                    </span>
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
                        <v-pagination v-if="pageCount > 1" v-model="currentPage" :length="pageCount"
                            active-color="#1C90A1" rounded="circle" :total-visible="5"></v-pagination>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <!-- FOOTER fuera del contenedor de contenido, abajo del todo -->
        <footer class="site-footer">
            <div class="container small">© {{ year }} INQUIMED. Todos los derechos reservados.</div>
        </footer>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useCartStore } from "../../stores/CartStore"
import type { Producto } from "@/views/Productos/types/Producto"
import { getProductosPorArchivo } from "@/api/Productos.ts";

const CATEGORIA_FIJA = "ortopedia-blanda";

const productos = ref<Producto[]>([])
const searchQuery = ref("")
const selectedZone = ref("Todos")
const itemsPerPage = 12
const currentPage = ref(1)
const isLoading = ref(true)
const productoAbierto = ref<number | null>(null);
const year = new Date().getFullYear()

const zonas = [
    { id: 'Todos', name: 'Ver Todos' },
    { id: 'miembro superior', name: 'Zona Alta' },
    { id: 'tronco', name: 'Zona Media' },
    { id: 'miembro inferior', name: 'Zona Baja' },
    { id: 'otros', name: 'Otros / Accesorios' }
]

const cartStore = useCartStore()


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
    fetchProductos(selectedZone.value);
});

watch(selectedZone, (newZone) => {
    currentPage.value = 1;
    productoAbierto.value = null;
    fetchProductos(newZone);
});

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return productos.value;

    return productos.value.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(query))
    );
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

const displayedCount = computed(() => {
    if (filteredProducts.value.length === 0) return 0;
    const count = currentPage.value * itemsPerPage;
    return Math.min(count, filteredProducts.value.length);
})

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

watch(searchQuery, () => {
    currentPage.value = 1;
    productoAbierto.value = null;
});

watch(currentPage, () => {
    productoAbierto.value = null;
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
    transform: translateY(-3px);
    box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.08) !important;
    border-color: #1C90A1 !important;
}

.image-wrapper {
    position: relative;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid #f1f5f9;
    overflow: hidden;
}

.product-img {
    mix-blend-mode: multiply;
}

/* Capa oscura que contiene la descripción, inicialmente oculta abajo */
.description-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(69, 151, 164, 0.95);
    /* Color de fondo teal con opacidad */
    opacity: 0;
    transform: translateY(100%);
    /* Lo manda hacia abajo, fuera de la vista */
    transition: all 0.3s ease-in-out;
    z-index: 2;
}

/* Cuando la TARJETA recibe hover, activamos el overlay de la imagen */
.product-card:hover .description-overlay {
    opacity: 1;
    transform: translateY(0);
    /* Sube suavemente a su posición original */
}

/* Opcional: Hacer el scrollbar del texto más estético si la descripción es muy larga */
.description-overlay p::-webkit-scrollbar {
    width: 4px;
}

.description-overlay p::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
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


/* --- Truco Flexbox para el Footer --- */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Fuerza a que ocupe todo el alto de la pantalla */
}

.content-wrap {
  flex: 1; /* Esto hace que el contenido se estire y empuje al footer al fondo */
}

.site-footer {
  text-align: center;
  padding: 20px 0;
  width: 100%;
  background-color: #fff; /* Opcional: añade un fondo para distinguirlo */
}
</style>