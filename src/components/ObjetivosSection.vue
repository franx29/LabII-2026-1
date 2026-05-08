<template>
  <section id="objetivos" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold teal-text tracking-widest">Objetivos</h6>
        <p class="text-muted fs-5">Nuestros compromisos institucionales para servir a la comunidad universitaria</p>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-md-6 col-lg-4" v-for="(obj, index) in objetivos" :key="index">
          <div class="card h-100 border-0 shadow-sm custom-card position-relative">
            <div class="card-body p-4 p-md-5">
              <div class="icon-container mb-4 text-teal">
                <i :class="obj.icon"></i>
              </div>
              <h5 class="card-title fw-bold teal-text mb-3">{{ obj.title }}</h5>
              <p class="card-text text-muted" style="font-size: 0.95rem;">{{ obj.description }}</p>
            </div>
            <div class="number-bubble bg-teal text-white fw-bold d-flex align-items-center justify-content-center shadow-sm">
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const objetivos = ref([
  {
    title: 'Servicio de calidad',
    description: 'Brindar a los estudiantes universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de nuestros canales digitales y nuestros puntos de atención presencial.',
    icon: 'bi bi-award'
  },
  {
    title: 'Plataformas digitales',
    description: 'Fomentar el uso de nuestras plataformas digitales para hacer transferencias entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo herramientas tecnológicas fáciles y seguras.',
    icon: 'bi bi-phone'
  },
  {
    title: 'Educación financiera',
    description: 'Promover la educación financiera de los estudiantes universitarios, a través de charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el uso responsable del crédito.',
    icon: 'bi bi-mortarboard'
  },
  {
    title: 'Alianzas estratégicas',
    description: 'Establecer alianzas estratégicas con universidades y empresas para ofrecer beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas, becas, prácticas laborales, entre otros.',
    icon: 'bi bi-handshake'
  },
  {
    title: 'Innovación continua',
    description: 'Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado.',
    icon: 'bi bi-graph-up-arrow'
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
.bg-teal {
  background-color: #1a6f67;
}
.tracking-widest {
  letter-spacing: 0.1em;
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
  border-radius: 12px;
}
.number-bubble {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 0.9rem;
}
</style>
