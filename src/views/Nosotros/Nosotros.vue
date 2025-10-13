<template>
  <section class="about">
    <!-- HERO -->
    <header class="hero">
      <div class="overlay"></div>
      <div class="hero-inner">
        <svg viewBox="0 0 200 60" class="swoosh" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 45 C55 10, 120 0, 195 5"
            fill="none"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <h1 class="title">Comprometidos con tu bienestar</h1>
        <p class="subtitle">
          En <strong>INQUIMED</strong> somos aliados del sector salud.  
          Distribuimos y proveemos insumos médicos de alta calidad,  
          con compromiso, eficiencia y empatía.
        </p>

        <div class="cta-row">
          <v-btn color="blue-darken-2" variant="flat" rounded @click="goToContacto()">Contactanos</v-btn>
          <v-btn color="white" variant="outlined" rounded>Valores</v-btn>
        </div>
      </div>
    </header>

    <!-- MISIÓN -->
    <section class="content">
      <div class="container">
        <div class="mission">
          <h2>Nuestra misión</h2>
          <p>
            Distribuir y proveer una amplia gama de insumos y material médico de la más alta calidad,
            buscando satisfacer las necesidades del sector salud y convertirnos en un aliado indispensable
            para hospitales, clínicas, médicos y pacientes.
          </p>
        </div>

        <!-- VALORES -->
        <div class="cards">
          <div class="card" v-for="(valor, index) in valores" :key="index">
            <v-icon color="blue-darken-2" size="34">{{ valor.icon }}</v-icon>
            <h3>{{ valor.titulo }}</h3>
            <p>{{ valor.descripcion }}</p>
          </div>
        </div>

        <hr class="divider" />

        <!-- EQUIPO -->
        <div class="team">
          <h2>Detrás de INQUIMED</h2>
          <p class="muted">
            Un equipo comprometido con ofrecer soluciones médicas confiables, eficientes y humanas.
          </p>

          <div class="team-grid">
            <div class="profile-card" v-for="persona in equipo" :key="persona.nombre">
              <div class="card-header">
                <img :src="persona.imagen" :alt="persona.nombre" class="profile-avatar" />
              </div>
              <div class="card-body">
                <h3 class="profile-name">{{ persona.nombre }}</h3>
                <p class="profile-role">{{ persona.puesto }}</p>
                <div class="card-actions">
                  <p>{{ persona.descripcion }}</p>
                </div>
                <div class="stats">
                  <v-icon class="vIconProfile" color="#0A66C2">mdi-linkedin</v-icon>
                  <v-icon class="vIconProfile" color="#1877F2">mdi-facebook</v-icon>
                  <v-icon class="vIconProfile" color="#EA4335">mdi-gmail</v-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="divider" />

        <!-- CIERRE -->
        <div class="final-cta">
          <p>
            En INQUIMED creemos en la innovación, la confianza y el servicio médico como pilares del bienestar.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container small">© {{ year }} INQUIMED. Todos los derechos reservados.</div>
    </footer>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const year = new Date().getFullYear()

const valores = [
  {
    icon: 'mdi-handshake-outline',
    titulo: 'Compromiso',
    descripcion: 'Nos comprometemos con la salud y el bienestar de cada paciente y profesional médico.'
  },
  {
    icon: 'mdi-autorenew',
    titulo: 'Versatilidad',
    descripcion: 'Ofrecemos soluciones adaptables y flexibles según las necesidades de cada institución.'
  },
  {
    icon: 'mdi-rocket-launch-outline',
    titulo: 'Eficiencia',
    descripcion: 'Optimizamos procesos para garantizar entregas rápidas, seguras y confiables.'
  }
]

const equipo = [
  {
    nombre: 'Equipo Inquimed',
    puesto: 'Departamento de Distribución',
    descripcion:
      'Profesionales dedicados a asegurar que cada producto llegue con calidad certificada y en el menor tiempo posible.',
    imagen: 'https://i.pravatar.cc/150?img=12'
  },
  {
    nombre: 'Soporte y Asesoría',
    puesto: 'Atención 24/7',
    descripcion:
      'Nuestro equipo de soporte está siempre disponible para ofrecer asesoramiento médico y técnico personalizado.',
    imagen: 'https://i.pravatar.cc/150?img=20'
  },
  {
    nombre: 'Desarrollo y Logística',
    puesto: 'Innovación Médica',
    descripcion:
      'Trabajamos constantemente en programas de abastecimiento automático y plataformas digitales eficientes.',
    imagen: 'https://i.pravatar.cc/150?img=32'
  }
]

const goToContacto = () =>{
  router.push({ name: 'Contacto' })
}
</script>

<style scoped>
:root {
  --bg: #fdfdfd;
  --accent: #1e1e1e;
  --muted: #6c6c6c;
  --accent-2: #e8e8e8;
}

.about {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--accent);
}

/* HERO */
.hero {
  position: relative;
  min-height: 65vh;
  background: linear-gradient(135deg, #1565c0 0%, #1e88e5 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-inner {
  position: relative;
  z-index: 2;
  padding: 48px 20px;
  max-width: 900px;
}

.swoosh {
  width: 140px;
  color: white;
  margin-bottom: 16px;
}

.title {
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 700;
  margin-bottom: 10px;
  color: white !important;
}

.subtitle {
  font-size: 1.1rem;
  color: #f0f0f0;
  margin-bottom: 20px;
}

.cta-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* CONTENT */
.content {
  padding: 64px 16px;
  background: #fafafa;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.mission h2 {
  font-size: 26px;
  margin-bottom: 8px;
}

.mission p {
  color: var(--muted);
  font-size: 1rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  margin: 12px 0 8px;
  font-weight: 600;
}

.divider {
  margin: 56px 0;
  border: none;
  height: 1px;
  background: var(--accent-2);
}

.team h2 {
  font-size: 26px;
}

.muted {
  color: var(--muted);
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.profile-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: linear-gradient(135deg, #1565c0, #1e88e5);
  padding: 2rem 1rem 1rem;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem;
}

.profile-name {
  font-weight: 600;
  margin: 0.5rem 0;
}

.profile-role {
  color: #777;
  margin-bottom: 1rem;
}

.card-actions p {
  font-size: 0.9rem;
  color: var(--muted);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.vIconProfile {
  font-size: 26px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.vIconProfile:hover {
  transform: scale(1.2);
}

.site-footer {
  padding: 24px 0;
  background: white;
  border-top: 1px solid var(--accent-2);
}

.small {
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .cta-row {
    flex-direction: column;
  }
}
</style>
