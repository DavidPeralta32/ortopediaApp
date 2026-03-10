<template>
    <footer class="site-footer">
      <div class="container small">© {{ year }} INQUIMED S.A DE C.V. Todos los derechos reservados.</div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()


</script>