<template>
  <section id="objetivos" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h6 class="text-uppercase fw-bold text-primary tracking-widest">Objetivos</h6>
        <p class="text-muted fs-5">Nuestros compromisos institucionales para servir a la comunidad universitaria</p>
      </div>
      <div class="row justify-content-center g-4">
        <div class="col-md-6 col-lg-4" v-for="(obj, index) in objetivos" :key="index">
          <div class="card h-100 border-0 rounded-4 hover-card position-relative">
            <div class="card-body p-4 p-md-5">
              <div class="mb-4 text-primary bg-primary bg-opacity-10 d-flex align-items-center justify-content-center rounded-3 objective-icon">
                <i :class="obj.icon"></i>
              </div>
              <h5 class="card-title fw-bold text-primary mb-3">{{ obj.title }}</h5>
              <p class="card-text text-muted text-sm">{{ obj.description }}</p>
            </div>
            <div class="position-absolute top-0 end-0 translate-middle bg-primary text-white fw-bold d-flex align-items-center justify-content-center shadow-sm rounded-circle objective-badge">
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
    icon: 'bi bi-people'
  },
  {
    title: 'Innovación continua',
    description: 'Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado.',
    icon: 'bi bi-graph-up-arrow'
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

.objective-icon {
  width: 50px;
  height: 50px;
  font-size: var(--bs-h3-font-size);
}

.objective-badge {
  width: 35px;
  height: 35px;
  font-size: var(--bs-body-font-size);
  margin-top: 15px;
  margin-right: 15px;
}
</style>
