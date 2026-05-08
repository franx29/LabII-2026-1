<template>
  <section id="contacto" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold teal-text tracking-widest">Contacto</h6>
        <h2 class="fw-bold teal-text mb-3">Estamos para ayudarte</h2>
        <p class="text-muted fs-5 max-w-2xl mx-auto">Nuestro equipo de soporte está disponible para atender tus consultas y ayudarte con cualquier operación financiera.</p>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-md-6 col-lg-3" v-for="(contact, index) in contactos" :key="index">
          <div class="card h-100 border-0 shadow-sm custom-card text-center p-4">
            <div class="card-body d-flex flex-column align-items-center justify-content-center">
              <div class="icon-container mb-3 text-teal">
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
.teal-text {
  color: #1a6f67;
}
.text-teal {
  color: #1a6f67;
}
.tracking-widest {
  letter-spacing: 0.1em;
}
.max-w-2xl {
  max-width: 42rem;
}
.custom-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}
.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(26, 111, 103, 0.1) !important;
}
.icon-container {
  font-size: 1.5rem;
  background-color: #f0f7f6;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
