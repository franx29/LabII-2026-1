<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4">
      <h1 class="view-title">Transferencias Bancarias</h1>
      <p class="view-subtitle">Realiza transferencias de forma rápida y segura</p>
    </header>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <p class="text-muted">Estructura base de Transferencias (Fase 1)</p>
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
