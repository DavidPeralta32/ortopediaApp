import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  // 1. Al iniciar, intentamos recuperar lo que haya en el navegador.
  // Si no hay nada, iniciamos vacío.
  const savedCategory = localStorage.getItem('inquimed_selected_cat') || ''
  const selectedCategory = ref(savedCategory)

  // 2. Usamos un watch para que CADA VEZ que cambie la categoría, 
  // se guarde automáticamente en el localStorage.
  watch(selectedCategory, (newCategory) => {
    if (newCategory) {
      localStorage.setItem('inquimed_selected_cat', newCategory)
    } else {
      localStorage.removeItem('inquimed_selected_cat')
    }
  }, { immediate: true }) // immediate ayuda a sincronizar al cargar

  // Función para resetear
  function clearFilter() {
    selectedCategory.value = ''
    localStorage.removeItem('inquimed_selected_cat')
  }

  return { selectedCategory, clearFilter }
})