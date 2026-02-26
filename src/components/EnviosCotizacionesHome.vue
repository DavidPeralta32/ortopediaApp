<template>
    <div class="contenedor-info-cotizacion-tienda">
        <div class="card-envios">
            <div class="envios-card">
                <v-card class="mx-auto card-info" max-width="500" height="180" variant="default">
                    <v-btn class="icon-info" icon="mdi mdi-map-marker-radius" variant="text"></v-btn>

                    <v-card-title>ENVÍOS A TODO MÉXICO</v-card-title>

                    <v-card-text>
                        <p>Nuestra red logística nos permite surtir nuestros productos en todos los estados.</p>
                    </v-card-text>
                </v-card>
            </div>

            <div class="envios-card">
                <v-card class="mx-auto card-info" max-width="500" height="180" variant="default">
                    <v-btn class="icon-info" icon="mdi mdi-medical-bag" variant="text"></v-btn>

                    <v-card-title>TODOS LOS CONSUMIBLES EN UN MISMO LUGAR</v-card-title>

                    <v-card-text>
                        <p>Encuentra todos los consumibles que necesitas de una especialidad en un mismo lugar.</p>
                    </v-card-text>
                </v-card>
            </div>
        </div>

         <!--Card Mayoreo -->
        <div class="card-links-mayoreo-tienda">
            <div class="flip-card">
                <div class="flip-card-inner">
                    <!-- Cara frontal: Card Mayoreo -->
                    <div class="flip-card-front">
                        <v-card class="card-linksMayoTienda">
                            <v-img :src="cotizacion1" class="align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                                <v-card-title class="text-white">Mayoreo</v-card-title>
                            </v-img>
                        </v-card>
                    </div>

                    <!-- Cara trasera: Mayoreo-->
                    <div class="flip-card-back">
                        <v-card class="card-linksMayoTienda align-center justify-center" >
                            <v-img class="align-center text-white" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                                <v-card-text class="text-center text-white">
                                    <v-btn class="ms-2" size="small" text="Cotizacion" variant="outlined"
                                        color="white"></v-btn>
                                </v-card-text></v-img>

                        </v-card>
                    </div>
                </div>
            </div>

            <!-- Card Tienda -->
            <div class="flip-card">
                <div class="flip-card-inner">
                    <!-- Cara frontal: Card Mayoreo -->
                    <div class="flip-card-front">
                        <v-card class="card-linksMayoTienda">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" class="align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                                <v-card-title class="text-white">Tienda</v-card-title>
                            </v-img>
                        </v-card>
                    </div>

                    <!-- Cara trasera: Mayoreo-->
                    <div class="flip-card-back">
                        <v-card class="card-linksMayoTienda align-center justify-center" >
                            <v-img class="align-center text-white" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                                <v-card-text class="text-center text-white">
                                    <v-btn class="ms-2" size="small" text="Ver productos" variant="outlined"
                                        color="white"></v-btn>
                                </v-card-text></v-img>
                        </v-card>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { onMounted, shallowRef } from 'vue'

import cotizacion1 from "@/assets/img/cotizacion1.png"
</script>


<style scoped>
.contenedor-info-cotizacion-tienda {
    margin-top: 24px;
}

.card-envios {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.card-info {
    display: block;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
}

.icon-info {
    font-size: 35px !important;
    padding: 8px;
    color: rgb(var(--v-theme-primary)) !important;
}

.card-info .v-card-title {
    margin-top: 8px;
    white-space: normal;
    /* Permite que se divida en varias líneas */
    word-wrap: break-word;
    /* Rompe las palabras largas si es necesario */
    line-height: 1.2;
    /* Ajusta la altura de línea */
    font-size: 1.2rem;
    /* Ajustable según tu diseño */
}

.card-links-mayoreo-tienda {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 8px;
}

.card-mayoreo {
    width: 40%;
    padding-right: 8px;
}

.card-linksMayoTienda {
    border-radius: 25px !important;
}

.card-tienda {
    width: 40%;
    padding-left: 8px;
}


/**Animacion giro card */
.flip-card {
    width: 500px;
    height: 300px;
    perspective: 1000px;
    margin-top: 8px;
    /* profundidad */
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
    /* Giro al pasar el mouse */
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
}

.flip-card-front {
    transform: rotateY(0deg);
}

.flip-card-back {
    transform: rotateY(180deg);
}
</style>