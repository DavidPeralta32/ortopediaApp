<template>
    <div class="page-container">
        <v-container fluid class="py-12 px-6 content-wrap bg-grey-lighten-4 mt-16">
            <v-row justify="center">
                <v-col cols="12" lg="11">
                    <header class="mb-8">
                        <h2 class="text-h4 font-weight-bold mb-1 text-grey-darken-4 text-uppercase tracking-wide">
                            Catálogo de Productos
                        </h2>

                        <div class="mt-4 mb-2">
                            <span
                                class="text-caption font-weight-bold text-grey-darken-1 text-uppercase tracking-wider d-block mb-2">
                                Filtrar por área médica:
                            </span>
                            <v-chip-group v-model="selectedArea" selected-class="bg-teal text-white" mandatory>
                                <v-chip v-for="area in areas" :key="area.id" :value="area.id" filter
                                    :disabled="isLoading" variant="tonal" class="font-weight-medium px-4">
                                    {{ area.name }}
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
                            <v-btn v-if="searchQuery || selectedArea !== 'Todos'" variant="text" color="error"
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
                                    <v-img :src="producto.image" lazy-src="https://picsum.photos/id/11/10/6"
                                        height="200" contain class="product-img pa-4">
                                        <!-- Esto se muestra mientras carga (mantiene el esqueleto) -->
                                        <template v-slot:placeholder>
                                            <div
                                                class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                                                <v-progress-circular color="grey-lighten-1"
                                                    indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>

                                    <div v-if="producto.descripcion && producto.descripcion.trim() !== ''"
                                        class="description-overlay pa-4 d-flex align-center justify-center">
                                        <p class="text-body-2 text-white text-justify lh-sm mb-0 overflow-y-auto"
                                            style="max-height: 100%;">
                                            {{ producto.descripcion }}
                                        </p>
                                    </div>
                                </div>

                                <!-- CUERPO DE LA TARJETA -->
                                <v-card-item class="pa-3 flex-grow-1 d-flex flex-column justify-space-between">
                                    <div>
                                        <div class="d-flex justify-space-between align-center mb-1">
                                            <span
                                                class="text-caption font-weight-bold text-teal text-uppercase tracking-wider">
                                                {{ producto.area }}
                                            </span>
                                        </div>

                                        <h3 class="product-title font-weight-bold text-grey-darken-4 mb-2">
                                            {{ producto.name }}
                                        </h3>

                                        <!-- Mapeo visual de tallas + Selección Interactiva -->
                                        <div v-if="producto.tallas && producto.tallas.length > 0"
                                            class="d-flex flex-wrap gap-2 mt-3">
                                            <v-chip v-for="(talla, idx) in producto.tallas" :key="idx" size="small"
                                                :variant="tallasSeleccionadas[producto.id] === talla ? 'flat' : 'outlined'"
                                                :color="tallasSeleccionadas[producto.id] === talla ? '#1C90A1' : 'teal-darken-2'"
                                                :class="[
                                                    'font-weight-bold px-3 rounded-pill transition-all',
                                                    tallasSeleccionadas[producto.id] === talla ? 'text-white' : 'bg-teal-lighten-5 border-teal-lighten-3'
                                                ]" style="font-size: 0.72rem !important; cursor: pointer;"
                                                @click="seleccionarTalla(producto.id, talla)">
                                                <!-- Icono de check dinámico si está seleccionado -->
                                                <v-icon v-if="tallasSeleccionadas[producto.id] === talla" start
                                                    size="14">mdi-check</v-icon>
                                                {{ talla }}
                                            </v-chip>
                                        </div>
                                    </div>
                                </v-card-item>

                                <v-divider class="mx-4 opacity-60"></v-divider>

                                <v-card-actions class="px-4 py-3 bg-white rounded-b-xl d-flex align-center">
                                    <span class="text-caption text-grey-darken-1 font-weight-medium"></span>
                                    <v-spacer></v-spacer>
                                    <!-- El botón se deshabilita si requiere talla y no se ha seleccionado ninguna -->
                                    <v-btn icon="mdi-cart-plus" color="#1C90A1" elevation="0" size="small"
                                        :disabled="!producto.stock || (tieneMultiplesTallas(producto) && !tallasSeleccionadas[producto.id])"
                                        @click="addCart(producto)"></v-btn>
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
const selectedArea = ref("Todos")
const itemsPerPage = 12
const currentPage = ref(1)
const isLoading = ref(true)
const productoAbierto = ref<number | null>(null);
const year = new Date().getFullYear()

// Diccionario reactivo para guardar qué talla seleccionó el usuario para cada ID de producto
const tallasSeleccionadas = ref<Record<number, string>>({})



const areas = [
    { id: 'Todos', name: 'Ver Todos' },
    { id: 'material-hospitalario', name: 'Material Hospitalario' },
    { id: 'aparatos-ortopedicos', name: 'Aparatos Ortopédicos' },
    { id: 'instrumental-quirurgico', name: 'Instrumental Quirúrgico' },
    { id: 'equipos-medicos', name: 'Equipos Médicos' },
    { id: 'anestesiologia', name: 'Anestesiología' },
    { id: 'material-dental', name: 'Material Dental' },
    { id: 'materiales-esterilizacion', name: 'Materiales de Esterilización' }
]

const cartStore = useCartStore()

// Función utilitaria para evaluar si el producto necesita obligatoriamente que el usuario elija talla
const tieneMultiplesTallas = (producto: Producto): boolean => {
    if (!producto.tallas || producto.tallas.length <= 1) return false

    // Ignoramos si la única o primeras opciones son descriptores genéricos de "Talla Única"
    const palabrasClaveUnica = ['universal', 'única', 'unica', 'ambidiestra']
    return !producto.tallas.some(t => palabrasClaveUnica.includes(t.toLowerCase()))
}

// Trae TODOS los productos de una sola vez
const fetchTodosLosProductos = async () => {
    isLoading.value = true;
    try {
        // Pasamos 'Todos' para que tu función API traiga el listado completo
        productos.value = await getProductosPorArchivo(CATEGORIA_FIJA, "Todos");
    } catch (err) {
        console.error("Error cargando el catálogo completo:", err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchTodosLosProductos();
});

// El filtrado ahora se hace en caliente desde el cliente mediante computed
const filteredProducts = computed(() => {
    let resultado = productos.value;

    // 1. Filtrar por Área Médica (si no está en 'Todos')
    if (selectedArea.value !== 'Todos') {
        resultado = resultado.filter(p => {
            // Convierte el área del producto a minúsculas y quita acentos para comparar de forma segura con el ID
            const areaProductoFormateada = p.area
                ?.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Remueve acentos
                .replace(/\s+/g, "-");           // Reemplaza espacios por guiones

            return areaProductoFormateada === selectedArea.value;
        });
    }

    // 2. Filtrar por la barra de búsqueda (texto)
    const query = searchQuery.value.toLowerCase().trim();
    if (query) {
        resultado = resultado.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(query))
        );
    }

    return resultado;
});

// Reinicia la paginación si cambias de filtro
watch(selectedArea, () => {
    currentPage.value = 1;
    productoAbierto.value = null;
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
    selectedArea.value = "Todos";
};

const addCart = (producto: Producto) => {
    let tallaFinal = 'Universal'

    if (tieneMultiplesTallas(producto)) {
        tallaFinal = tallasSeleccionadas.value[producto.id]
    } else if (producto.tallas && producto.tallas.length > 0) {
        // Si tiene solo un elemento (ej: ["Universal"] o ["Ambidiestra"]), se asigna ese
        tallaFinal = producto.tallas[0]
    }

    // Enviamos el producto junto con su respectiva talla al store
    cartStore.addToCart(producto, tallaFinal)

    // Opcional: Limpiar el selector de la tarjeta tras agregarlo
    if (tallasSeleccionadas.value[producto.id]) {
        tallasSeleccionadas.value[producto.id] = ''
    }
}

// Agrega esta función junto a las demás que ya tienes
const seleccionarTalla = (productoId: number, talla: string) => {
    // Si vuelve a hacer clic en la misma, la deseleccionamos
    if (tallasSeleccionadas.value[productoId] === talla) {
        tallasSeleccionadas.value[productoId] = ''
    } else {
        tallasSeleccionadas.value[productoId] = talla
    }
}
</script>

<style scoped>
/* Tu CSS original se mantiene exactamente igual */
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

.description-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(69, 151, 164, 0.95);
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease-in-out;
    z-index: 2;
}

.product-card:hover .description-overlay {
    opacity: 1;
    transform: translateY(0);
}

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

.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-wrap {
    flex: 1;
}

.site-footer {
    text-align: center;
    padding: 20px 0;
    width: 100%;
    background-color: #fff;
}

.gap-1 {
    gap: 4px;
}

.gap-2 {
    gap: 8px;
}

.custom-pill-chip:hover {
    background-color: #f5f5f5 !important;
    border-color: #757575 !important;
    cursor: pointer;
    transition: all 0.2s ease;
}
</style>