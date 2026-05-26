<template>
  <section id="servicios" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold text-primary tracking-widest">Servicios</h6>
        <h2 class="fw-bold text-primary mb-3">Todo lo que necesitas en un solo lugar</h2>
        <p class="text-muted fs-5">Soluciones financieras diseñadas específicamente para la comunidad universitaria</p>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-md-6 col-lg-4" v-for="(srv, index) in servicios" :key="index">
          <div class="card h-100 border-0 rounded-4 hover-card overflow-hidden position-relative">
            <div class="img-wrapper position-relative">
              <img :src="srv.image" class="card-img-top object-fit-cover" alt="servicio" style="height: 200px;">
              <div class="position-absolute bg-white text-primary shadow-sm d-flex align-items-center justify-content-center rounded-circle service-icon" style="bottom: -20px; right: 25px; z-index: 10;">
                <i :class="srv.icon"></i>
              </div>
            </div>
            <div class="card-body p-4 p-md-5">
              <h5 class="card-title fw-bold text-primary mb-3">{{ srv.title }}</h5>
              <p class="card-text text-muted text-sm">{{ srv.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Import images
import imgAhorro from '@/assets/images/service_cuentas_ahorro_1778271527853.png'
import imgTarjeta from '@/assets/images/service_tarjeta_digital_1778271541197.png'
import imgBecas from '@/assets/images/service_gestion_becas_1778271553873.png'
import imgMovil from '@/assets/images/service_banca_movil_1778271566813.png'
import imgPagos from '@/assets/images/service_pagos_institucionales_1778271579382.png'
import imgEdu from '@/assets/images/service_educacion_financiera_1778271591486.png'

const servicios = ref([
  {
    title: 'Cuentas de Ahorro',
    description: 'Cuentas diseñadas específicamente para estudiantes con tasas preferenciales, sin comisiones de mantenimiento y acceso inmediato a tus fondos.',
    icon: 'bi bi-piggy-bank',
    image: imgAhorro
  },
  {
    title: 'Tarjeta Digital',
    description: 'Tarjeta virtual instantánea para compras en línea y pagos seguros. Compatible con Apple Pay, Google Pay y principales plataformas digitales.',
    icon: 'bi bi-credit-card',
    image: imgTarjeta
  },
  {
    title: 'Gestión de Becas',
    description: 'Administra y recibe tus becas académicas de forma automática. Seguimiento en tiempo real de desembolsos y saldos disponibles.',
    icon: 'bi bi-mortarboard',
    image: imgBecas
  },
  {
    title: 'Banca Móvil',
    description: 'Aplicación intuitiva y segura para realizar operaciones desde cualquier lugar. Disponible para iOS y Android con autenticación biométrica.',
    icon: 'bi bi-phone',
    image: imgMovil
  },
  {
    title: 'Pagos Institucionales',
    description: 'Realiza pagos de matrícula, mensualidades y servicios universitarios con un solo clic. Programación de pagos recurrentes disponible.',
    icon: 'bi bi-building',
    image: imgPagos
  },
  {
    title: 'Educación Financiera',
    description: 'Acceso a recursos educativos, talleres y asesoría personalizada para desarrollar hábitos financieros saludables y planificar tu futuro.',
    icon: 'bi bi-book',
    image: imgEdu
  }
])
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.1em;
}
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  box-shadow: var(--bs-box-shadow-sm);
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(var(--bs-primary-rgb), 0.1);
}
.img-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(var(--bs-primary-rgb), 0.2) 100%);
  pointer-events: none;
}

.service-icon {
  width: 45px;
  height: 45px;
  font-size: var(--bs-h3-font-size);
}
</style>
