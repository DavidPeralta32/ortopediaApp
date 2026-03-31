<template>
  <v-row style="text-align: center;">
    <v-col cols="12" md="4">
      <img src="@/assets/img/img_inquimed.png" alt="Logo Inquimed" style="width: 275px; height: 100px;" />
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
