<template>
    <div>
        <v-carousel show-arrows="hover" class="carrusel-header">
            <v-carousel-item :src="portada1" cover></v-carousel-item>

            <v-carousel-item :src="portada3" cover></v-carousel-item>

            <v-carousel-item :src="portada4" cover></v-carousel-item>

        </v-carousel>
    </div>

    <div class="card cardPrincipal mx-3 mx-md-6 mt-n6">
        <EnviosCotizacionesHome></EnviosCotizacionesHome>
        <CategoriasHome></CategoriasHome>
        <ProductosHome></ProductosHome>
        <!--<ProvedoresView></ProvedoresView>-->

    </div>

    <div class="boton-flotante">
        <v-btn :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-flotante" icon="mdi-whatsapp">
        </v-btn>
    </div>


    <div class="mt-5 my-1">
        <FooterHome></FooterHome>
    </div>

</template>

<script setup>
import { onMounted, shallowRef,ref, computed } from 'vue'
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProductosHome from '../components/Productos/ProductosHome.vue';
import EnviosCotizacionesHome from '../components/EnviosCotizacionesHome.vue';
import CategoriasHome from '../components/Categorias/CategoriasHome.vue';
import FooterHome from '../components/Footer/FooterHome.vue';
import ProvedoresView from '../components/Provedores/ProvedoresView.vue';

import portada1 from "@/assets/img/portada1.jpeg"
import portada3 from "@/assets/img/portada3.png"
import portada4 from "@/assets/img/portada4.jpg"




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



const phone = '522293686761';
const message = 'Hola Inquimed, me interesa solicitar una cotización. ¿Podrían darme información sobre disponibilidad y precios? Quedo atento/a a su respuesta.';

const whatsappUrl = computed(() => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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

/* Ajuste para móviles (opcional) */
@media (max-width: 600px) {
  .boton-flotante {
    bottom: 20px;
    right: 20px;
  }
}
</style>
