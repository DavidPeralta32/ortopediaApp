<template>
    <div style="margin: 24px; margin-top: 100px;">
        <v-row dense>

            <!-- 🔹 Lista de productos: ocupa 8 columnas -->
            <v-col cols="12" md="8">
                <v-row v-if="cartStore.cart.length > 0" dense>
                    <v-col cols="12" v-for="item in cartStore.cart" :key="item.id">
                        <v-card class="pa-3 mb-3">
                            <v-row align="center">
                                <v-col cols="2">
                                    <v-img :src="item.image" height="80" contain></v-img>
                                </v-col>
                                <v-col cols="4">
                                    <div>{{ item.name }}</div>
                                    <div>Cantidad: <strong> {{ item.quantity }} </strong></div>
                                </v-col>

                                <v-col cols="6" style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
                                    <div>
                                        <v-btn icon @click="decreaseQuantity(item)">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                    </div>

                                    <div>
                                        <v-btn icon @click="increaseQuantity(item)">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>

                                    <div>
                                        <v-btn color="red" icon @click="removeItem(item.id)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </div>

                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row v-else>
                    <v-col cols="12" class="text-center py-6">
                        <v-icon size="48">mdi-cart-off</v-icon>
                        <p>Tu carrito está vacío</p>
                    </v-col>
                </v-row>
            </v-col>

            <!-- 🔹 Resumen de compra: ocupa 4 columnas -->
            <v-col cols="12" md="4">
                <!-- Envolvemos el contenedor en un v-form para manejar la validación nativa de Vuetify -->
                <v-form ref="formRef" lazy-validation>
                    <v-card class="pa-4">
                        <v-row>
                            <v-col cols="6">Productos ({{ cartStore.totalItems }})</v-col>
                            <v-col cols="6" class="text-right"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12"><strong>Envíos:</strong> Por calcular con el asesor.</v-col>
                        </v-row>

                        <v-divider class="my-3"></v-divider>

                        <!-- 📨 Nuevo Campo de Correo Electrónico -->
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field v-model="email" label="Correo electrónico donde recibirás la cotización"
                                    placeholder="ejemplo@correo.com" variant="outlined" density="compact"
                                    :rules="emailRules" required prepend-inner-icon="mdi-email-outline"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row dense>
                            <v-col cols="12">
                                <p style="text-align: justify; font-size: 0.9rem; color: #555;">
                                    Al dar clic en Solicitar Cotización, enviaremos la lista de tus productos a nuestro
                                    equipo. Recibirás un correo electrónico con los precios detallados y las opciones de
                                    envío a la brevedad.
                                </p>
                            </v-col>
                        </v-row>

                        <!-- Botón: Se desactiva automáticamente si el carrito está vacío -->
                        <v-btn color="#1C90A1" block class="mt-3" :disabled="cartStore.cart.length === 0"
                            @click="checkout" :loading="isSending">
                            SOLICITAR COTIZACIÓN
                        </v-btn>
                    </v-card>
                </v-form>
            </v-col>

        </v-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../../stores/CartStore'
import type { Producto } from '@/views/Productos/types/Producto'
import {useEnviarCotizacion} from '@/composables/useEnviarCotizacion'

const cartStore = useCartStore()

// 📄 Referencia al formulario de Vuetify para detonar la validación visual
const formRef = ref<any>(null);

// ✉️ Estado para almacenar el correo del usuario
const email = ref('')

const isSending = ref(false)

// 🛡️ Reglas de Validación de Vuetify
const emailRules = [
    (v: string) => !!v || 'El correo electrónico es obligatorio',
    (v: string) => /.+@.+\..+/.test(v) || 'Por favor, ingresa un correo válido (ejemplo@correo.com)',
]

const increaseQuantity = (item: Producto) => {
    item.quantity = (item.quantity ?? 1) + 1
    cartStore.saveCart()
}

const decreaseQuantity = (item: Producto) => {
    if ((item.quantity ?? 1) > 1) {
        item.quantity!--
    } else {
        removeItem(item.id)
    }
    cartStore.saveCart()
}

const removeItem = (id: number) => {
    cartStore.removeFromCart(id)
}


// Función de Checkout para envio de cotizacion
const checkout = async () => {
    if (cartStore.cart.length === 0) {
        alert('Tu carrito está vacío.')
        return;
    }

    if (!formRef.value) return
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
        isSending.value = true
        
        const { ejecutar } = await useEnviarCotizacion()
        // Ejecutamos el caso de uso
        const resultado = await ejecutar({
            email: email.value,
            productos: cartStore.cart
        })

        // Evaluamos cómo se envió la información
        if (resultado.enviadoAutomatico) {
            alert(`¡Solicitud enviada con éxito! Nuestro equipo procesará tu cotización y te responderá a: ${email.value}`)
            cartStore.clearCart() // Opcional: Limpiar carrito
        } else {
            // Entra aquí si se usó el Fallback (Plan B)
            alert('¡Atención! Hemos abierto tu aplicación de correo predeterminada con tu lista de productos. Por favor, haz clic en "Enviar" en tu aplicación para hacernos llegar la solicitud.')
        }

    } catch (error) {
        alert('Hubo un error inesperado al procesar la solicitud.')
    } finally {
        isSending.value = false
    }
}

</script>

<style scoped>
.v-card {
    border-radius: 8px;
}
</style>
