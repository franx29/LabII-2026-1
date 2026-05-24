<template>
  <section id="beneficios" class="benefits-section">
    <div class="container">
      <div class="section-heading text-center">
        <p class="section-eyebrow">BENEFICIOS</p>
        <h2 class="section-title">Simplicidad financiera para mentes brillantes</h2>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-6 col-xl-3">
          <BenefitCardFlip
            title="Transferencias Express"
            description="Envía dinero a compañeros al instante, sin comisiones ni demoras."
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </template>
          </BenefitCardFlip>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
          <BenefitCardFlip
            title="Acceso Total"
            description="Tu credencial universitaria es tu llave financiera. Sin trámites adicionales."
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>
            </template>
          </BenefitCardFlip>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
          <BenefitCardFlip
            title="Servicios Académicos"
            description="Gestiona matrículas, mensualidades y servicios universitarios desde un solo lugar."
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </template>
          </BenefitCardFlip>
        </div>

        <div class="col-12 col-md-6 col-xl-3">
          <BenefitCardFlip
            title="Seguridad Biométrica"
            description="Autenticación avanzada con huella digital y reconocimiento facial para máxima protección."
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </template>
          </BenefitCardFlip>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BenefitCardFlip from '@/components/BenefitCardFlip.vue'
</script>

<style scoped>
.benefits-section {
  padding: 5rem 0 6rem;
  background: #ffffff;
}

.section-heading {
  max-width: 900px;
  margin: 0 auto 3rem;
}

  .section-eyebrow {
  margin: 0 0 0.75rem;
  color: #49beb7;
  font-size: var(--text-xs, 0.75rem);
  font-weight: 500;
  letter-spacing: 0.12em;
}

  .section-title {
  margin: 0;
  color: #085f63;
  line-height: 1.2;
  font-weight: 600;
}

@media (max-width: 575.98px) {
  .benefits-section {
    padding: 3.5rem 0 4rem;
  }

  .section-heading {
    margin-bottom: 2rem;
  }

  .section-eyebrow {
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>