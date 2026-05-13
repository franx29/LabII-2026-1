<template>
  <section id="contacto" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold text-primary tracking-widest">Contacto</h6>
        <h2 class="fw-bold text-primary mb-3">Estamos para ayudarte</h2>
        <p class="text-muted fs-5 col-md-8 mx-auto">Nuestro equipo de soporte está disponible para atender tus consultas y ayudarte con cualquier operación financiera.</p>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-md-6 col-lg-3" v-for="(contact, index) in contactos" :key="index">
          <div class="card h-100 border-0 shadow-sm rounded-4 hover-card text-center p-4">
            <div class="card-body d-flex flex-column align-items-center justify-content-center">
              <div class="mb-3 text-primary bg-primary bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle" style="width: 50px; height: 50px; font-size: 1.5rem;">
                <i :class="contact.icon"></i>
              </div>
              <h6 class="card-title fw-bold text-uppercase mb-2 text-dark" style="font-size: 0.85rem; letter-spacing: 0.05em;">{{ contact.title }}</h6>
              <p class="card-text text-muted small mb-0">{{ contact.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const contactos = ref([
  {
    title: 'Teléfono',
    value: '+58 212-555-5555',
    icon: 'bi bi-telephone'
  },
  {
    title: 'Fax',
    value: '+58 212-555-5556',
    icon: 'bi bi-printer'
  },
  {
    title: 'Correo Electrónico',
    value: 'info@bancouniversitario.com.ve',
    icon: 'bi bi-envelope'
  },
  {
    title: 'Dirección',
    value: 'Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela.',
    icon: 'bi bi-geo-alt'
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
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(var(--bs-primary-rgb), 0.1) !important;
}
</style>
