<template>
  <section id="nosotros" class="py-5 bg-white">
    <div class="container">
      <div class="section-heading mb-5">
        <p class="section-eyebrow">NOSOTROS</p>
        <h2 class="section-title">Comprometidos con la excelencia académica</h2>
        <p class="hero-text mt-3">
          Banco Universitario opera bajo los más altos estándares regulatorios y de seguridad, 
          con alianzas estratégicas con instituciones de educación superior para garantizar 
          un servicio confiable, transparente y alineado con los valores académicos.
        </p>
      </div>     
    </div>

    <div class="container">
      <div class="row g-4 justify-content-center">
        <div class="col-md-6">
          <div class="nosotros-card p-4 h-100">
            <div class="card-header-custom d-flex align-items-center mb-3">
              <div class="icon-container d-flex align-items-center justify-content-center rounded-3 me-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bullseye" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
              </div>
              <h3 class="card-title-custom mb-0">MISIÓN</h3>
            </div>
            <p class="card-text-custom">
              Somos una confiable institución financiera comprometida con los estudiantes universitarios, 
              brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión 
              de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.
            </p>
          </div>
        </div>

        <div class="col-md-6">
          <div class="nosotros-card p-4 h-100">
            <div class="card-header-custom d-flex align-items-center mb-3">
              <div class="icon-container d-flex align-items-center justify-content-center rounded-3 me-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
              </div>
              <h3 class="card-title-custom mb-0">VISIÓN</h3>
            </div>
            <p class="card-text-custom">
              Queremos ser la principal opción financiera para estudiantes universitarios en el país. 
              Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al 
              cliente y nuestro compromiso con la educación y el desarrollo social.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  max-width: 900px;
}

.section-eyebrow {
  margin: 0 0 0.75rem;
  color: #49beb7;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
}

.section-title {
  color: #085f63;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
}

.hero-text {
  color: #5b6b73;
  font-size: 1rem;
  line-height: 1.6;
}


.nosotros-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nosotros-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.08);
}

.icon-container {
  width: 44px;
  height: 44px;
  background-color: rgba(73, 190, 183, 0.15);
  color: #085f63;
  flex-shrink: 0;
}

.card-title-custom {
  color: #085f63;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.card-text-custom {
  color: #5b6b73;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.75rem;
  }
}
</style>