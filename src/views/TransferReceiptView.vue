<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4 text-center">
      <div class="success-icon-wrapper mb-2">
        <i class="bi bi-check-circle-fill text-success fs-1"></i>
      </div>
      <h1 class="view-title">¡Transferencia Exitosa!</h1>
      <p class="view-subtitle">Tu transferencia ha sido procesada correctamente</p>
    </header>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 p-4 text-center">
          <p class="text-muted">Estructura base del Comprobante (Fase 1)</p>
        </div>
      </div>
    </div>
  </PrivateLayout>
</template>

<script setup>
import PrivateLayout from '@/layouts/PrivateLayout.vue'
</script>

<style scoped>
.view-header {
  margin-top: 10px;
}

.view-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  color: #085f63;
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 4px;
}

.view-subtitle {
  color: #7c8e96;
  font-size: 14.5px;
  font-weight: 500;
  margin: 0;
}
</style>
