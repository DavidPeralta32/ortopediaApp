<template>
  <v-container class="py-12 px-6" fluid style="margin-top: 30px;">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12" md="8">
        <h2 class="text-h4 text-md-h3 font-weight-bold text-blue-darken-3 mb-2">
          Contáctanos
        </h2>
        <p class="text-subtitle-1 text-grey-darken-1">
          En <strong>Inquimed</strong> estamos listos para ayudarte con tus necesidades ortopédicas.
        </p>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center" align="stretch" justify="center" dense>
      <!-- Información de contacto -->
      <v-col cols="12" md="5" class="mb-8 mb-md-0">
        <v-card class="pa-6 rounded-xl elevation-3">
          <v-list density="comfortable">
            <v-list-item prepend-avatar="" title="Teléfono" subtitle="+52 55 1234 5678">
              <template #prepend>
                <v-icon color="blue-darken-2" size="28">mdi-phone</v-icon>
              </template>
            </v-list-item>

            <v-list-item title="Correo electrónico" subtitle="contacto@inquimed.com">
              <template #prepend>
                <v-icon color="blue-darken-2" size="28">mdi-email</v-icon>
              </template>
            </v-list-item>

            <v-list-item title="Dirección" subtitle="Av. Salud #45, Col. Bienestar, Veracruz">
              <template #prepend>
                <v-icon color="blue-darken-2" size="28">mdi-map-marker</v-icon>
              </template>
            </v-list-item>
          </v-list>

          <div class="d-flex justify-center mt-6 ga-4">
            <v-btn icon color="blue-darken-2" variant="text">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon color="blue-darken-2" variant="text">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon color="blue-darken-2" variant="text">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- Formulario -->
      <v-col cols="12" md="6">
        <v-card class="pa-6 rounded-xl elevation-3">
          <v-form>
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              density="comfortable"
              color="blue-darken-2"
              class="mb-4"
            />

            <v-text-field
              v-model="correo"
              label="Correo electrónico"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              density="comfortable"
              color="blue-darken-2"
              class="mb-4"
            />

            <v-textarea
              v-model="mensaje"
              label="Mensaje"
              variant="outlined"
              prepend-inner-icon="mdi-message-text-outline"
              rows="4"
              density="comfortable"
              color="blue-darken-2"
              class="mb-6"
            />

            <v-btn
              block
              color="blue-darken-2"
              size="large"
              class="text-white"
              @click="enviarMensaje"
            >
              <v-icon start>mdi-send</v-icon>
              Enviar mensaje
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue"

const nombre = ref("")
const correo = ref("")
const mensaje = ref("")

const enviarMensaje = () => {
  if (!nombre.value || !correo.value || !mensaje.value) {
    alert("Por favor, completa todos los campos antes de enviar.")
    return
  }
  alert(`Mensaje enviado por ${nombre.value}. Gracias por contactar a Inquimed.`)
}
</script>

<style scoped>
.text-blue-darken-3 {
  color: #0d47a1 !important;
}
</style>
