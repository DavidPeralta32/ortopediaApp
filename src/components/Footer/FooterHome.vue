<template>
  <v-row style="text-align: center;">
    <v-col cols="12" md="4">
      <img src="https://res.cloudinary.com/drkehdimc/image/upload/v1774989086/img_inquimed_ydlzlo.png"
        alt="Logo Inquimed" style="width: 275px; height: 100px;" />
      <p>Politicas de devolucion y aviso de privacidad</p>
    </v-col>
    <v-col cols="12" md="4">
      <div class="d-flex flex-column align-center gap-y-4">
        <div class="d-flex align-center mb-3">
          <v-avatar color="success-lighten-4" size="32" class="mr-3">
            <v-icon color="success" size="20">mdi-phone</v-icon>
          </v-avatar>
          <span class="text-body-2">+52 229 368 6761</span>
        </div>

        <div class="d-flex align-center mb-3">
          <v-avatar color="error-lighten-4" size="32" class="mr-3">
            <v-icon color="error" size="20">mdi-email-outline</v-icon>
          </v-avatar>
          <span class="text-body-2">inquimedcomercializadora@gmail.com</span>
        </div>

        <div class="d-flex align-start">
          <v-avatar color="primary-lighten-4" size="32" class="mr-3">
            <v-icon color="primary" size="20">mdi-map-marker</v-icon>
          </v-avatar>
          <span class="text-body-2">
            Avenida Americas número 1465, # interior "A", <br>
            C.P. 91919, Fracc. Reforma, <br>
            Boca del Río, Veracruz
          </span>
        </div>

        <div class="d-flex align-center social-container mb-1 mt-2">
          <!-- Instagram -->
          <a href="https://www.instagram.com/inquimed.mx?vrfl=a3oxa292NnRibmxi&utm_source=qr" target="_blank"
            rel="noopener noreferrer" class="social-link">
            <v-avatar size="32" class="social-avatar instagram-btn elevation-2">
              <v-icon size="22" color="white">mdi-instagram</v-icon>
            </v-avatar>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/people/Inquimed/61590100153816/" target="_blank" rel="noopener noreferrer"
            class="social-link">
            <v-avatar size="32" class="social-avatar facebook-btn elevation-2">
              <v-icon size="22" color="white">mdi-facebook</v-icon>
            </v-avatar>
          </a>
        </div>

      </div>
    </v-col>
    <v-col cols="12" md="4">
      <h4>Metodos de pago</h4>
    </v-col>
    <v-col cols="12" md="12">
      <div class="text-center">
        <p class="text-dark my-4 text-sm font-weight-normal">
          Todos los derechos reservados. Copyright ©
          {{ new Date().getFullYear() }}
          INQUIMED S.A DE C.V.
        </p>
      </div>
    </v-col>
  </v-row>
</template>


<script setup>

</script>


<style scoped>
/* Separación forzada en el contenedor */
.social-container {
  gap: 20px !important;
  /* Ajusta este valor (ej. 16px, 24px, 32px) para más o menos espacio */
}

.social-link {
  text-decoration: none;
  display: inline-block;
}

/* Efecto Hover Moderno */
.social-avatar {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  cursor: pointer;
}

.social-avatar:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15) !important;
}

/* Colores de marca oficiales */
.instagram-btn {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) !important;
}

.facebook-btn {
  background: #1877f2 !important;
}
</style>