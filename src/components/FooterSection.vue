<template>
  <footer class="footer py-5">

    <div class="container">

      <div class="row">

        <!-- LOGO / DESCRIPCIÓN -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5>Banco Universitario</h5>

          <p class="text-muted small">
            La plataforma financiera diseñada para la comunidad universitaria.
          </p>
        </div>

        <!-- NAVEGACIÓN -->
        <div class="col-lg-3 col-md-6 mb-4">

          <h5>NAVEGACIÓN</h5>

          <ul class="list-unstyled">

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Inicio
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Beneficios
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Nosotros
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Servicios
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Seguridad
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Contacto
              </a>
            </li>

          </ul>
        </div>

        <!-- LEGAL -->
        <div class="col-lg-3 col-md-6 mb-4">

          <h5>LEGAL</h5>

          <ul class="list-unstyled">

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Términos y Condiciones
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Política de Privacidad
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Aviso Legal
              </a>
            </li>

          </ul>
        </div>

        <!-- CONTACTO -->
        <div class="col-lg-3 col-md-6 mb-4">

          <h5>CONTACTO</h5>

          <ul class="list-unstyled">

            <li>
              <a href="#" class="text-muted text-decoration-none">
                info@bancouniversitario.com
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                +58 212 000 0000
              </a>
            </li>

            <li>
              <a href="#" class="text-muted text-decoration-none">
                Caracas, Venezuela
              </a>
            </li>

          </ul>
        </div>

      </div>

      <hr class="my-4">

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

/* ROW */

.footer .row {
  align-items: flex-start;
}

/* TITULOS */

.footer h5 {
  color: #11425a;
  font-weight: 700;
  margin-bottom: 1.3rem;
  font-size: 1rem;
}

/* LINKS */

.footer ul li {
  margin-bottom: 12px;
}

.footer a {
  transition: all .2s ease;
}

.footer a:hover {
  color: #17abf5 !important;
  padding-left: 4px;
}

/* TEXTO */

.footer p,
.footer a {
  font-size: 0.95rem;
  line-height: 1.8;
}

/* LINEA */

hr {
  opacity: 0.1;
}

</style>
