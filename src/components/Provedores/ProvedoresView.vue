<template>
  <div class="proveedores-container"> 
     <h2 class="text-h3 font-weight-bold mb-2 primary--text">Nuestros Proveedores</h2>
    <p class="section-subtitle">Trabajamos con las mejores marcas del sector médico</p>

    <v-sheet class="mx-auto bg-transparent" elevation="0" max-width="95%">
      <v-slide-group 
        v-model="model" 
        class="custom-slide-group" 
        mandatory 
        show-arrows="always"
      >
        <v-slide-group-item 
          v-for="proveedor in proveedores" 
          :key="proveedor.id" 
          v-slot="{ isSelected, toggle }"
        >
          <v-card 
            :class="['proveedor-card', { 'is-selected': isSelected }]" 
            height="145" 
            width="220"
            variant="flat"
            @click="toggle"
          >
           

            <div class="logo-wrapper">
              <v-img
                :src="proveedor.logo"
                contain
                max-height="105"
                max-width="170"
                class="mx-auto proveedor-img"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                    <v-progress-circular indeterminate color="grey-lighten-2" size="20"></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const model = ref(null)

const proveedores = ref([
  { id: 6, nombre: 'Medway', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/medway_nl1vj8.png' },
  { id: 1, nombre: 'Atramat 1', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421434/atramat_ntiz6w.jpg' },
  { id: 2, nombre: 'Respifix', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421434/respifix_hi4umj.png' },
  { id: 3, nombre: 'Ambiderm', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421434/ambiderm_djwgjl.jpg' },
  { id: 4, nombre: 'Alfa_medical', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/alfa_medical_rpbjav.jpg' },
  { id: 5, nombre: 'Westmed', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421434/westmend_mmkg2k.jpg' },
  { id: 7, nombre: 'Hergom', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/hergom_gshrtx.jpg' },
  { id: 8, nombre: 'Pisa', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/pisa_q72ohe.png' },
  { id: 9, nombre: 'Medika', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/medika_hsml08.jpg' },
  { id: 10, nombre: 'super_confort', logo: 'https://res.cloudinary.com/drkehdimc/image/upload/v1782421433/super_confort_orpjsn.png' },
])
</script>

<style scoped>
/* Contenedor Principal */
.proveedores-container {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #008294; /* Color turquesa de Inquimed según tu captura */
  letter-spacing: -0.5px;
  margin-bottom: 6px;
}

.section-subtitle {
  font-size: 0.95rem;
  color: #718096;
  margin-bottom: 32px;
}

/* Espaciado del contenedor del slider */
.custom-slide-group {
  padding-top: 12px;
  padding-bottom: 12px;
}

/* Tarjetas de Proveedores */
.proveedor-card {
  position: relative;
  background-color: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 14px !important;
  
  /* CLAVE: Margen lateral para separarlas bien y darles aire */
  margin-left: 14px !important;
  margin-right: 14px !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important; /* Importante para que el badge respire */
}

/* Efecto Hover moderno */
.proveedor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.06) !important;
  border-color: #cbd5e1 !important;
}

/* Estado Seleccionado adaptado a la paleta de Inquimed */
.proveedor-card.is-selected {
  border-color: #008294 !important; /* Borde Turquesa */
  box-shadow: 0 8px 16px rgba(0, 130, 148, 0.12) !important;
  background-color: #f4fafb !important; /* Fondo sutilmente frío/turquesa */
}

/* Contenedor del logo */
.logo-wrapper {
  width: 100%;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.proveedor-img {
  filter: grayscale(15%);
  transition: filter 0.2s ease;
}

.proveedor-card:hover .proveedor-img,
.proveedor-card.is-selected .proveedor-img {
  filter: grayscale(0%);
}

/* Indicador de Check superior derecho alineado al color de Inquimed */
.selected-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #008294; /* Fondo Turquesa */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 130, 148, 0.3);
}

/* Estilo limpio para las flechas de Vuetify */
:deep(.v-slide-group__next), 
:deep(.v-slide-group__prev) {
  color: #718096;
}
</style>