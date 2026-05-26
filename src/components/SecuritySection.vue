<template>
  <section id="seguridad" class="security-section py-5 bg-white">
    <div class="container py-4">

      <div class="security-header text-center mx-auto mb-5">
        <span class="section-badge d-block fw-bold mb-2">
          SEGURIDAD
        </span>
        <h2 class="main-title fw-bold mb-3">
          Tu confianza es nuestra prioridad
        </h2>
        <p class="subtitle mx-auto text-balance">
          Implementamos los más altos estándares de seguridad financiera para proteger cada transacción y dato personal.
        </p>
      </div>

      <div class="row g-4 justify-content-center">

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-lock"></i>
            </div>
            <h3 class="card-title">Cifrado de extremo a extremo</h3>
            <p class="card-text">
              Todas tus transacciones y datos personales están protegidos con encriptación de nivel bancario.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-shield-check"></i>
            </div>
            <h3 class="card-title">Autenticación multifactor</h3>
            <p class="card-text">
              Verificación en múltiples pasos con biometría y códigos únicos para garantizar que solo tú accedas. 
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-eye"></i>
            </div>
            <h3 class="card-title">Monitoreo 24/7</h3>
            <p class="card-text">
              Sistema de vigilancia continua que detecta y previene actividades sospechosas en tiempo real.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-award"></i>
            </div>
            <h3 class="card-title">Infraestructura certificada</h3>
            <p class="card-text">
              Cumplimos con estándares internacionales PCI DSS y certificaciones de seguridad financiera.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.section-badge {
  color: #49beb7; 
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em; 
  text-transform: uppercase;
}

.main-title {
  color: #085f63; 
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
}

.subtitle {
  color: #5b6b73; 
  max-width: 620px; 
  font-size: 1rem;
  line-height: 1.6;
}


.custom-card {
  border: 1px solid #e2e8f0; 
  border-radius: 20px;       
  background: #ffffff;
  padding: 2rem 1.25rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 4px 12px rgba(8, 95, 99, 0.02); 
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
  border-color: rgba(73, 190, 183, 0.3);
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.08);
}

.icon-container {
  width: 52px;
  height: 52px;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px; 
  background: rgba(73, 190, 183, 0.15);  
  font-size: 1.3rem;
  color: #085f63;       
  flex-shrink: 0;
}

.card-title {
  color: #085f63;      
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #5b6b73;
  margin: 0;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 1.75rem;
  }
}
</style>