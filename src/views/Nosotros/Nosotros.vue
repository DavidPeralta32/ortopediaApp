<template>
    <section class="about">
        <!-- Hero -->
        <header class="hero">
            <div class="overlay"></div>
            <div class="hero-inner">
                <div class="logo-mark" aria-hidden>
                    <!-- simple swoosh-like mark (original, abstract) -->
                    <svg viewBox="0 0 200 60" class="swoosh" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 45 C55 10, 120 0, 195 5" fill="none" stroke="currentColor" stroke-width="6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <h1 class="title">Muevete con propósito</h1>
                <p class="subtitle">Somos una marca enfocada en diseño, rendimiento y comunidad. Creemos que cada paso
                    cuenta.</p>

                <div class="cta-row">
                    <button class="btn btn-alt">Conócenos</button>
                    <button class="btn btn-alt">Nuestros valores</button>
                </div>
            </div>
        </header>

        <!-- Mission / Values -->
        <section class="content">
            <div class="container">
                <div class="mission">
                    <h2>Nuestra misión</h2>
                    <p>
                        Diseñar productos que empoderen movimiento y confianza. Innovamos en materiales, estilo y
                        sostenibilidad para que
                        puedas rendir al máximo, sin sacrificar identidad.
                    </p>
                </div>

                <div class="cards">
                    <div class="card">
                        <h3>Rendimiento</h3>
                        <p>Materiales pensados para durar y mejorar tu desempeño cada día.</p>
                    </div>

                    <div class="card">
                        <h3>Diseño</h3>
                        <p>Estética minimalista y atemporal que funciona dentro y fuera del entrenamiento.</p>
                    </div>

                    <div class="card">
                        <h3>Sostenibilidad</h3>
                        <p>Compromiso con procesos responsables y reducción de residuos.</p>
                    </div>
                </div>

                <hr class="divider" />

                <div class="team">
                    <h2>Detrás de la marca</h2>
                    <p class="muted">Un equipo pequeño con una gran obsesión por el detalle.</p>

                    <div class="team-grid">
                        <div class="profile-card">
                            <div class="card-header">
                                <img src="https://i.pravatar.cc/150?img=1" alt="Ana López" class="profile-avatar">
                            </div>
                            <div class="card-body">
                                <h3 class="profile-name">Miguel Lagarta</h3>
                                <p class="profile-role">CEO</p>
                               
                                <div class="card-actions">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quasi eos explicabo
                                        totam, officiis molestias necessitatibus </p>
                                </div>
                                <div class="stats">
                                    <div><v-icon class="vIconProdile" style="color: #0A66C2;">mdi-linkedin</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #1877F2;">mdi-facebook</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #EA4335;">mdi-gmail</v-icon></div>
                                </div>
                            </div>
                        </div>

                        <div class="profile-card">
                            <div class="card-header">
                                <img src="https://i.pravatar.cc/150?img=1" alt="Ana López" class="profile-avatar">
                            </div>
                            <div class="card-body">
                                <h3 class="profile-name">Ash Ketchum</h3>
                                <p class="profile-role">Maestro pokemon
                                </p>
                                
                                <div class="card-actions">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quasi eos explicabo
                                        totam, officiis molestias necessitatibus </p>
                                </div>
                                <div class="stats">
                                    <div><v-icon class="vIconProdile" style="color: #0A66C2;">mdi-linkedin</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #1877F2;">mdi-facebook</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #EA4335;">mdi-gmail</v-icon></div>
                                </div>
                            </div>
                        </div>

                        <div class="profile-card">
                            <div class="card-header">
                                <img src="https://i.pravatar.cc/150?img=1" alt="Ana López" class="profile-avatar">
                            </div>
                            <div class="card-body">
                                <h3 class="profile-name">Monkey D. Luffy</h3>
                                <p class="profile-role">Rey pirata</p>
                                <div class="card-actions">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic quasi eos explicabo
                                        totam, officiis molestias necessitatibus </p>
                                </div>
                                <div class="stats">
                                    <div><v-icon class="vIconProdile" style="color: #0A66C2;">mdi-linkedin</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #1877F2;">mdi-facebook</v-icon>
                                    </div>
                                    <div><v-icon class="vIconProdile" style="color: #EA4335;">mdi-gmail</v-icon></div>
                                </div>
                            </div>
                        </div>

                        <!-- Repite para Marcos y Sofía con imágenes distintas -->
                    </div>
                </div>



            </div>
        </section>

        <footer class="site-footer">
            <div class="container small">© {{ year }} INQUIMED. Todos los derechos reservados.</div>
        </footer>
    </section>
</template>

<script setup>
import { ref } from 'vue'
const year = new Date().getFullYear()
</script>

<style scoped>
:root {
    --bg: #fdfdfd;
    --accent: #111;
    --muted: #605f5f;
    --accent-2: #f2f2f2;
    --primary: #111;
    --gradient: linear-gradient(135deg, #111 0%, #444 100%);
}

.about {
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: var(--accent);
    background: var(--bg)
}

/* HERO */
.hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    background: var(--gradient);
    color: #fff;
}

.hero .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
}

.hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    text-align: left;
    padding: 56px 24px
}

.swoosh {
    width: 160px;
    color: #fff;
    opacity: 0.95
}

.title {
    font-size: clamp(28px, 5vw, 54px);
    margin: 12px 0 8px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff
}

.subtitle {
    font-size: 1rem;
    color: #e6e6e6;
    max-width: 700px
}

.cta-row {
    margin-top: 20px;
    display: flex;
    gap: 12px
}

.btn {
    padding: 12px 20px;
    border-radius: 999px;
    font-weight: 600;
    border: 0;
    cursor: pointer;
    transition: transform .2s ease, background .2s ease
}

.btn:hover {
    transform: scale(1.05)
}

.btn-primary {
    background: #fff;
    color: var(--primary)
}

.btn-alt {
    background: transparent;
    border: 1px solid #fff;
    color: #fff
}

/* CONTENT */
.content {
    padding: 64px 16px;
    background: #fafafa
}

.container {
    max-width: 1100px;
    margin: 0 auto
}

.mission h2 {
    font-size: 24px;
    margin-bottom: 8px
}

.mission p {
    color: var(--muted)
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 32px
}

.card {
    background: #fff;
    padding: 28px;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(15, 15, 15, 0.06);
    border: 1px solid var(--accent-2);
    transition: transform .2s ease
}

.card:hover {
    transform: translateY(-6px)
}

.card h3 {
    margin-bottom: 8px;
    font-size: 18px
}

.card p {
    color: var(--muted);
    font-size: 0.95rem
}

.divider {
    margin: 48px 0;
    border: none;
    height: 1px;
    background: var(--accent-2)
}

.team h2 {
    font-size: 24px
}

.muted {
    color: var(--muted)
}


/**Card profile */
.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-top: 24px
}

.team-card {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 16px;
    border-radius: 14px;
    background: linear-gradient(180deg, #fff, #f5f5f5);
    border: 1px solid var(--accent-2);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    transition: transform .2s ease
}

.team-card:hover {
    transform: translateY(-4px)
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    background: var(--primary);
    color: #fff;
    font-size: 1.2rem
}

.role {
    font-size: 0.9rem;
    color: var(--muted)
}

.final-cta {
    margin: 56px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start
}

.final-cta p {
    font-size: 1.1rem;
    font-weight: 500
}

.subscribe {
    display: flex;
    gap: 8px;
    flex-wrap: wrap
}

.subscribe input {
    padding: 12px 14px;
    border-radius: 999px;
    border: 1px solid var(--accent-2);
    min-width: 220px;
    font-size: 0.95rem
}

.site-footer {
    padding: 24px 0;
    border-top: 1px solid var(--accent-2);
    margin-top: 20px;
    background: #fff
}

.small {
    font-size: 0.85rem;
    color: var(--muted);
    text-align: center
}


.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
}

.profile-card {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    transition: transform 0.2s ease;
}

.profile-card:hover {
    transform: translateY(-5px);
}

.card-header {
    background: linear-gradient(135deg, #2b5ad2, #444);
    padding: 2rem 1rem 1rem;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
}

.card-body {
    padding: 1.5rem;
}

.profile-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin: .5rem 0;
}

.profile-role {
    color: #777;
    margin-bottom: 1rem;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.social-icons a {
    color: #555;
    font-size: 1.2rem;
}

.card-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.btn {
    padding: .5rem 1rem;
    border: none;
    border-radius: 20px;
    background: #000;
    color: #fff;
    cursor: pointer;
}

.btn.secondary {
    background: #f1f1f1;
    color: #333;
}

.stats {
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
    color: #555;
}

.stats div {
    text-align: center;
}

.stats strong {
    display: block;
    font-size: 1rem;
    color: #000;
}

.vIconProdile {
    font-size: 28px;
    cursor: pointer;
}

/* Responsive */
@media (max-width:900px) {
    .hero-inner {
        text-align: center
    }

    .cta-row {
        justify-content: center
    }
}
</style>
