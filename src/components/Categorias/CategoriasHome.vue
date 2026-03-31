<template>
    <div class="contenedor-categorias">
        <h2>Categorías</h2>
        <v-sheet color="#1C90A1" elevation="3" rounded="lg">
            <v-tabs v-model="filterStore.selectedCategory" align-tabs="center" color="white" height="80"
                slider-color="#98C7C9">
                <v-tab v-for="cat in tabsCategorias" :key="cat.id" :value="cat.category" :prepend-icon="cat.icon"
                    :text="cat.name" class="text-none"></v-tab>
            </v-tabs>
        </v-sheet>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCategorias } from "@/api/CategoriasService.ts";
import { useFilterStore } from "@/stores/FilterProductosStore.ts";



const filterStore = useFilterStore();
const tabsCategorias = ref([]);


onMounted(async () => {
    try {
        const data = await getCategorias();
        tabsCategorias.value = data;

        // Lógica para iniciar con la primera categoría automáticamente o si tenemos algo en el storage
        if (data && data.length > 0 && !filterStore.selectedCategory) {
            // Asignamos el nombre de la primera categoría (ej: "Artroscopia")
            filterStore.selectedCategory = data[0].category;
        }
    } catch (err) {
        tabsCategorias.value = [];
        console.error("Error al obtener las categorias: ", err);
    }
});

</script>

<style scoped>
.contenedor-categorias {
    padding: 14px;
    text-align: center;
}
</style>