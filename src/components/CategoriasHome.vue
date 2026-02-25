<template>

    <div class="contenedor-categorias">
        <h2>Categorias</h2>
        <v-sheet color="#1C90A1" elevation="3" rounded="lg">
            <v-tabs v-model="tabCategoria" :items="tabsCategorias" align-tabs="center" color="white" height="80"
                slider-color="#98C7C9">
                <template v-slot:tab="{ item }">
                    <v-tab :prepend-icon="item.icon" :text="item.text" :value="item.value" class="text-none"></v-tab>
                </template>
            </v-tabs>
        </v-sheet>
    </div>

</template>

<script setup>
import { onMounted, shallowRef } from 'vue'


const tabCategoria = shallowRef('tab-1')
const tabsCategorias = [
    {
        icon: 'mdi-book-open-page-variant',
        text: 'Ortopedia',
        value: 'tab-1',
    },
    {
        icon: 'mdi-handshake-outline',
        text: 'Artroscopia',
        value: 'tab-2',
    },
    {
        icon: 'mdi-license',
        text: 'Consumibles de hospital',
        value: 'tab-3',
    },
    {
        icon: 'mdi-shield-lock-outline',
        text: 'Reemplazo articular',
        value: 'tab-4',
    },
    {
        icon: 'mdi-shield-lock-outline',
        text: 'Neurocirugia',
        value: 'tab-5',
    },
    {
        icon: 'mdi-shield-lock-outline',
        text: 'Tunel de carpo',
        value: 'tab-6',
    },
];


</script>

<style scoped>
.contenedor-categorias {
    padding: 14px;
    text-align: center;
}

</style>