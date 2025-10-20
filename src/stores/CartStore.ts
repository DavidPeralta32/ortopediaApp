import { defineStore } from 'pinia'
import type { Producto } from '@/views/Productos/types/Producto'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cart = ref<Producto[]>([])
    const animateCart = ref(false)

    // 🔹 Cargar carrito guardado
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
        cart.value = JSON.parse(storedCart)
    }

    // 🔹 Calcular total de productos
    const totalItems = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity ?? 1), 0)
    )

    // 🔹 Guardar automáticamente en localStorage
    watch(
        cart,
        (newCart) => {
            localStorage.setItem('cart', JSON.stringify(newCart))
        },
        { deep: true }
    )

    // 🔹 Agregar al carrito con animación
    const addToCart = (product: Producto) => {
        const existing = cart.value.find((p) => p.id === product.id)
        if (existing) {
            existing.quantity = (existing.quantity ?? 1) + 1
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }

        // Animación rápida
        animateCart.value = true
        setTimeout(() => {
            animateCart.value = false
        }, 400)
    }

    // 🔹 Eliminar un producto del carrito
    const removeFromCart = (productId: number) => {
        cart.value = cart.value.filter((p) => p.id !== productId)
    }

    // 🔹 Vaciar carrito
    const clearCart = () => {
        cart.value = []
        localStorage.removeItem('cart')
    }

    // 🔹 Guardar carrito manualmente
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }

    // 🔹 Calcular total de precio
    const totalPrice = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity ?? 1) * item.price, 0)
    )

    return {
        cart,
        totalItems,
        totalPrice,
        animateCart,
        addToCart,
        removeFromCart,
        clearCart,
        saveCart,
    }
})
