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
    
    // 🔹 Agrega validando la combinación ID + Talla seleccionada
    const addToCart = (product: Producto, talla: string) => {
        const existing = cart.value.find((p) => p.id === product.id && p.tallaSeleccionada === talla)

        if (existing) {
            existing.quantity = (existing.quantity ?? 1) + 1
        } else {
            // Guardamos la copia del producto asegurando su talla en este registro
            cart.value.push({ ...product, quantity: 1, tallaSeleccionada: talla })
        }

        animateCart.value = true
        setTimeout(() => {
            animateCart.value = false
        }, 400)
    }

    // 🔹 Remueve discriminando por ID y Talla exacta
    const removeFromCart = (productId: number, talla: string) => {
        cart.value = cart.value.filter((p) => !(p.id === productId && p.tallaSeleccionada === talla))
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
        cart.value.reduce((total, item) => total + (item.quantity ?? 1) * item.price!!, 0)
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
