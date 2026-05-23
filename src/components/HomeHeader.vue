<template>
  <header class="home-header sticky-top">
    <nav class="navbar navbar-expand-lg home-navbar">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img
            :src="logoBanco"
            alt="Banco Universitario"
            class="brand-logo"
          />
        </a>

        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span class="custom-toggler">☰</span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav mx-auto mb-3 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#inicio">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#beneficios">Beneficios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#nosotros">Nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#servicios">Servicios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#seguridad">Seguridad</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contacto">Contacto</a>
            </li>
          </ul>

          <div class="d-flex justify-content-lg-end">
            <a href="#" class="btn btn-access">Acceder</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import logoBanco from '@/assets/logo-no-background.png'
</script>

<style scoped>
.home-header {
  background: #ffffff;
  border-bottom: 1px solid #dde6e6;
  z-index: 1050;
}

.home-navbar {
  min-height: 74px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.brand-logo {
  height: 42px;
  width: auto;
  max-width: 230px;
  object-fit: contain;
  display: block;
}

.navbar-brand {
  margin-right: 1.2rem;
  padding: 0;
}

.nav-link {
  color: #65727b;
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  margin: 0 0.45rem;
  transition: color 0.25s ease;
}

.nav-link:hover {
  color: #0b6b70;
}

.btn-access {
  background: #0b6b70;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 0.8rem 1.55rem;
  font-weight: 500;
  min-width: 108px;
  transition: all 0.25s ease;
}

.btn-access:hover {
  background: #09585c;
  color: #ffffff;
  transform: translateY(-1px);
}

.custom-toggler {
  font-size: 1.55rem;
  color: #0b6b70;
  line-height: 1;
  display: inline-block;
}

.navbar-toggler:focus {
  box-shadow: none;
}

@media (max-width: 991.98px) {
  .home-navbar {
    min-height: 68px;
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
  }

  .brand-logo {
    height: 34px;
    max-width: 210px;
  }

  .navbar-collapse {
    background: #ffffff;
    margin-top: 0.65rem;
    border: 1px solid #e2ebeb;
    border-radius: 0 0 22px 22px;
    padding: 0.8rem 1rem 1rem;
  }

  .nav-link {
    margin: 0;
    padding: 0.85rem 0;
    font-size: var(--bs-body-font-size);
  }

  .btn-access {
    width: 100%;
    margin-top: 0.55rem;
    text-align: center;
  }
}

@media (max-width: 575.98px) {
  .home-navbar {
    min-height: 64px;
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
  }

  .brand-logo {
    height: 30px;
    max-width: 190px;
  }

  .custom-toggler {
    font-size: 1.45rem;
  }

  .navbar-collapse {
    padding: 0.7rem 1rem 0.95rem;
  }

  .nav-link {
    font-size: var(--bs-body-font-size);
    padding: 0.8rem 0;
  }
}
</style>