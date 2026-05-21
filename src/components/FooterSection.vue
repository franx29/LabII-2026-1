<script setup lang="ts">
// Ruta del logo (ajusta si es necesario)
const logoBanco = new URL('../assets/logo-no-background.png', import.meta.url).href;
</script>

<template>
  <footer class="footer py-5">
    <div class="container">
      <div class="row">
        <!-- COLUMNA DEL LOGO + DESCRIPCIÓN -->
        <div class="col-lg-3 col-md-6 mb-4 text-center text-lg-start">
          <div class="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3">
            <img :src="logoBanco" alt="Banco Universitario" class="footer-logo" />
          </div>
          <p class="text-muted footer-description">
            La plataforma financiera diseñada para la comunidad universitaria.
          </p>
        </div>

        <!-- NAVEGACIÓN -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5>NAVEGACIÓN</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-muted text-decoration-none">Inicio</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Beneficios</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Nosotros</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Servicios</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Seguridad</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Contacto</a></li>
          </ul>
        </div>

        <!-- LEGAL -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5>LEGAL</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-muted text-decoration-none">Términos y Condiciones</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Política de Privacidad</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Aviso Legal</a></li>
          </ul>
        </div>

        <!-- CONTACTO -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5>CONTACTO</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-muted text-decoration-none">info@bancouniversitario.com</a></li>
            <li><a href="#" class="text-muted text-decoration-none">+58 212 000 0000</a></li>
            <li><a href="#" class="text-muted text-decoration-none">Caracas, Venezuela</a></li>
          </ul>
        </div>
      </div>

      <hr class="my-4" />
      <p class="text-center text-muted small mb-0">
        © 2026 Banco Universitario. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f4f7f7;
  color: #085f63;
}

.footer .row {
  align-items: flex-start;
}

/* TÍTULOS */
.footer h5 {
  color: #11425a;
  font-weight: 700;
  margin-bottom: 1.3rem;
  font-size: 1rem;
}

/* LOGO */
.footer-logo {
  height: 30px;      /* Ajusta este valor según el tamaño deseado */
  width: auto;
  display: block;
}

/* DESCRIPCIÓN */
.footer-description {
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

/* En pantallas grandes la descripción se alinea a la izquierda sin centrar */
@media (min-width: 992px) {
  .footer-description {
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
}

/* LINKS */
.footer ul li {
  margin-bottom: 12px;
}

.footer a {
  transition: all 0.2s ease;
}

.footer a:hover {
  color: #17abf5 !important;
  padding-left: 4px;
}

/* TEXTO GENERAL */
.footer p,
.footer a {
  font-size: 0.95rem;
  line-height: 1.8;
}

/* LÍNEA SEPARADORA */
hr {
  opacity: 0.1;
}
</style>