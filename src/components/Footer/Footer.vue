<template>
    <footer class="site-footer">
      <div class="container small">© {{ year }} INQUIMED. Todos los derechos reservados.</div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()


</script>