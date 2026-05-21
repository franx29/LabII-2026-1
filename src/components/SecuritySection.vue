<template>
  <section class="security-section py-5 bg-white">
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
            <h5 class="card-title fw-semibold">Cifrado de extremo a extremo</h5>
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
            <h5 class="card-title fw-semibold">Autenticación multifactor</h5>
            <p class="card-text">
              Verificación en múltiples pasos con biometría y códigos únicos.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-eye"></i>
            </div>
            <h5 class="card-title fw-semibold">Monitoreo 24/7</h5>
            <p class="card-text">
              Vigilancia continua que detecta actividades sospechosas en tiempo real.
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card custom-card">
            <div class="icon-container">
              <i class="bi bi-award"></i>
            </div>
            <h5 class="card-title fw-semibold">Infraestructura certificada</h5>
            <p class="card-text">
              Cumplimos con estándares PCI DSS y certificaciones internacionales.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- ESTILOS DEL ENCABEZADO --- */
.section-badge {
  color: #49beb7; 
  font-size: 0.85rem;
  letter-spacing: 0.15em; 
}

.main-title {
  color: #085f63; 
  font-size: 2.5rem;
}

.subtitle {
  color: #5b6b73; 
  max-width: 620px; 
  font-size: 1.1rem;
  line-height: 1.6;
}

/* --- ESTILOS DE LAS TARJETAS --- */
.custom-card {
  border: 1px solid #cbdddf; 
  border-radius: 24px;       
  background: #ffffff;
  padding: 2.5rem 1.5rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 4px 20px rgba(8, 95, 99, 0.02); 
  transition: all 0.25s ease-in-out;
}

.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(8, 95, 99, 0.06);
}

.icon-container {
  width: 76px;
  height: 76px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px; 
  background: #f4f8f8;  
  font-size: 1.8rem;
  color: #085f63;       
}

.card-title {
  color: #085f63;      
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 0.75rem; /* Separación sutil con el texto de abajo */
}

/* Ajuste fino para los textos descriptivos dentro de la card */
.card-text {
  font-size: 0.95rem;     /* Un pelo más pequeño para que no compita con el título */
  line-height: 1.6;
  color: #5b6b73;         /* Mismo tono grisáceo suave del diseño */
  margin: 0;
}

.custom-card:hover {
  /* Opcional: hacer que la sombra de abajo se vuelva más intensa al hacer hover */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12); 
}
</style>