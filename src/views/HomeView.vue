<template>
    <div>
        <v-carousel show-arrows="hover" class="carrusel-header">
            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>

            <v-carousel-item src="../../public/img/img_ortopedia.png" cover></v-carousel-item>

            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

        </v-carousel>
    </div>

    <div class="card cardPrincipal mx-3 mx-md-6 mt-n6">
        <EnviosCotizacionesHome></EnviosCotizacionesHome>
        <CategoriasHome></CategoriasHome>
        <ProductosHome></ProductosHome>
        
    </div>

    <div class="boton-flotante">
        <v-btn class="btn-flotante" icon="mdi-whatsapp">
        </v-btn>
    </div>


    <div class="bg-dark mt-5 my-1">
        <div>
            <p class="text-white text-center fs-4 mt-4 m-md-0">Ortopedia App - Todos los derechos Reservados</p>
        </div>
    </div>

</template>

<script setup>
import { onMounted, shallowRef } from 'vue'
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProductosHome from '../components/Productos/ProductosHome.vue';
import EnviosCotizacionesHome from '../components/EnviosCotizacionesHome.vue';
import CategoriasHome from '../components/CategoriasHome.vue';


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

const cards = [
    { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
    { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
    { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
]

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".envios-card", {
        x: 5,
        duration: 3,
        scrollTrigger: {
            trigger: ".envios-card", // Configuración completa de scrollTrigger
            start: "top 80%",         // Empieza cuando el top del elemento está en 80% del viewport
            toggleActions: "restart none none none"
        }
    })
});





</script>


<style scoped>
.cardPrincipal {
    z-index: 100;
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 10px auto;
}



/**Boton flotante */
.boton-flotante {
    position: fixed;
    /* Se queda fijo aunque haya scroll */
    bottom: 20px;
    /* Distancia desde abajo */
    right: 20px;
    /* Distancia desde la derecha */
    z-index: 9999;
    /* Para que quede encima de todo */
}

.btn-flotante {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #25D366;
    color: white;
    font-size: 25px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.3s;
    margin: 5px;

}

.btn-flotante:hover {
    background: #21b859;
}



footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: #222;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
</style>
