<template>
    <header class="py-2">
        <div class="container-xl">
            <v-carousel show-arrows="hover" class="carrusel-header">
                <v-carousel-item src="../../public/img/img_ortopedia.png" cover></v-carousel-item>

                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
            </v-carousel>


        </div>
    </header>


    <div class="contenedor-info-cotizacion-tienda">
        <div class="card-envios">
            <div class="envios-card" >
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

        <div class="card-links-mayoreo-tienda">
            <div class="card-mayoreo">
                <v-card class="card-linksMayoTienda">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                        <v-card-title class="text-white">Mayoreo</v-card-title>

                        <v-card-actions>
                            <v-btn class="ms-2" size="small" text="START RADIO" variant="outlined"></v-btn>
                        </v-card-actions>
                    </v-img>
                </v-card>
            </div>

            <div class="card-tienda">

                <v-card class="card-linksMayoTienda">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
                        <v-card-title class="text-white">Tienda</v-card-title>

                        <v-card-actions>
                            <v-btn class="ms-2" size="small" text="START RADIO" variant="outlined"></v-btn>
                        </v-card-actions>
                    </v-img>
                </v-card>
            </div>

        </div>
    </div>

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <div class="col-md-6 col-lg-4 my-4 row align-items-center">
                <div class="col-4">
                    <img class="img-fluid" src="../../public/img/guitarra_01.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">Lukather</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem
                        nesciunt, amet deserunt</p>
                    <p class="fw-black text-primary fs-3">$299</p>
                    <button type="button" class="btn btn-dark w-100 ">Agregar al Carrito</button>
                </div>
            </div><!-- FIN GUITARRA -->

            <div class="col-md-6 col-lg-4 my-4 row align-items-center">
                <div class="col-4">
                    <img class="img-fluid" src="../../public/img/guitarra_02.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">SRV</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem
                        nesciunt, amet deserunt</p>
                    <p class="fw-black text-primary fs-3">$299</p>
                    <button type="button" class="btn btn-dark w-100 ">Agregar al Carrito</button>
                </div>
            </div><!-- FIN GUITARRA -->

            <div class="col-md-6 col-lg-4 my-4 row align-items-center">
                <div class="col-4">
                    <img class="img-fluid" src="../../public/img/guitarra_03.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">Borland</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem
                        nesciunt, amet deserunt</p>
                    <p class="fw-black text-primary fs-3">$299</p>
                    <button type="button" class="btn btn-dark w-100 ">Agregar al Carrito</button>
                </div>
            </div>


        </div>
    </main>


    <footer class="bg-dark mt-5 py-5">
        <div class="container-xl">
            <p class="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"

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

.card-mayoreo{
    width: 40%;
    padding-right: 8px;
}

.card-linksMayoTienda{
    border-radius: 25px !important;
}

.card-tienda {
    width: 40%;
    padding-left: 8px;
}
</style>
