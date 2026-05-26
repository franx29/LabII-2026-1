<template>
  <section id="contacto" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold text-primary tracking-widest">CONTACTO</h6>
        <h2 class="fw-bold text-primary mb-3">Estamos para ayudarte</h2>
        <p class="text-muted fs-5 col-md-8 mx-auto">Nuestro equipo de soporte está disponible para atender tus consultas y ayudarte con cualquier operación financiera.</p>
      </div>

      <div class="row justify-content-center g-4 mb-5">
        <div class="col-md-6 col-lg-3" v-for="(contact, index) in contactos" :key="index">
          <div class="card h-100 rounded-4 hover-card p-2">
            <div class="card-body text-start p-4">
              <div class="mb-4 d-flex align-items-center justify-content-center rounded-3" style="width: 48px; height: 48px; font-size: 1.25rem; background-color: rgba(73, 190, 183, 0.15); color: #085f63;">
                <i :class="contact.icon"></i>
              </div>
              <h6 class="card-title fw-bold text-uppercase mb-2" style="font-size: 0.85rem; letter-spacing: 0.05em; color: #085f63;">{{ contact.title }}</h6>
              <p class="card-text text-muted small mb-0" style="font-size: 0.9rem;">{{ contact.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5 mb-4">
        <h4 class="fw-bold text-primary">Síguenos en redes sociales</h4>
      </div>

      <div class="row justify-content-center g-3">
        <div class="col-md-4 col-lg-3" v-for="(red, index) in redesSociales" :key="index">
          <div class="card rounded-4 hover-card p-3">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center justify-content-center rounded-3 me-3" style="width: 40px; height: 40px; font-size: 1.2rem; background-color: rgba(73, 190, 183, 0.15); color: #085f63;">
                <i :class="red.icon"></i>
              </div>
              <div class="text-start">
                <h6 class="fw-bold text-uppercase mb-0" style="font-size: 0.75rem; letter-spacing: 0.05em; color: #085f63;">{{ red.name }}</h6>
                <p class="text-muted mb-0" style="font-size: 0.8rem;">{{ red.handle }}</p>
              </div>
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
    title: 'TELÉFONO',
    value: '+58 212-555-5555',
    icon: 'bi bi-telephone'
  },
  {
    title: 'FAX',
    value: '+58 212-555-5556',
    icon: 'bi bi-printer'
  },
  {
    title: 'CORREO ELECTRÓNICO',
    value: 'info@bancouniversitario.com.ve',
    icon: 'bi bi-envelope'
  },
  {
    title: 'DIRECCIÓN',
    value: 'Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela.',
    icon: 'bi bi-geo-alt'
  }
])

const redesSociales = ref([
  {
    name: 'FACEBOOK',
    handle: '@bancouniversitariove',
    icon: 'bi bi-facebook'
  },
  {
    name: 'INSTAGRAM',
    handle: '@bancouniversitariove',
    icon: 'bi bi-instagram'
  },
  {
    name: 'TWITTER',
    handle: '@bancouniversitariove',
    icon: 'bi bi-twitter'
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
  border: 1px solid #e2e8f0;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.08); 
}
</style>