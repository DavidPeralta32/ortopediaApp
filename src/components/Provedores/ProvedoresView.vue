<template>
<div style="text-align: center; margin-top: 24px; margin-bottom: 24px;"> 
            <h2>Proveedores</h2>
            <v-sheet class="mx-auto" elevation="0" max-width="95%">
                <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" mandatory show-arrows>
                    <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
                        <v-card :class="['ma-4', selectedClass]" color="grey-lighten-1" height="100" width="200"
                            @click="toggle">
                            <div class="d-flex fill-height align-center justify-center">
                                <v-scale-transition>
                                    <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                        size="48"></v-icon>
                                </v-scale-transition>
                            </div>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </div>
</template>

<script setup>
import { onMounted, shallowRef,ref } from 'vue'
const model = ref(null)
</script>