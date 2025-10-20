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
                <v-card class="pa-4">
                    <v-row>
                        <v-col cols="6">Productos ({{ cartStore.totalItems }})</v-col>
                        <!--<v-col cols="6" class="text-right">${{ cartStore.totalPrice }}</v-col>-->
                        <v-col cols="6" class="text-right">$$$</v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col cols="6">Envíos</v-col>
                        <v-col cols="6" class="text-right">Gratis</v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row class="font-weight-bold">
                        <v-col cols="6">Total</v-col>
                        <!--<v-col cols="6" class="text-right">${{ cartStore.totalPrice }}</v-col>-->
                        <v-col cols="6" class="text-right">$$$</v-col>
                    </v-row>
                    <v-btn color="primary" block class="mt-3" @click="checkout">Cotizar</v-btn>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/CartStore'
import type { Producto } from '@/views/Productos/types/Producto'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

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

const updateQuantity = (item: Producto) => {
    if (item.quantity! < 1) item.quantity = 1
    cartStore.saveCart()
}

const checkout = () => {
    alert(`Total a pagar: $${cartStore.totalPrice}`)
    // Navegar a página de checkout
    // router.push({ name: 'Checkout' })
}
</script>

<style scoped>
.v-card {
    border-radius: 8px;
}
</style>
