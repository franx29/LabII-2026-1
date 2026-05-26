<template>
  <section class="cta-section py-5 text-center text-white">
    <div class="container py-4">
      <h2 class="fw-bold mb-3 display-6">Comienza a gestionar tu futuro financiero</h2>
      <p class="mb-5 opacity-75 mx-auto text-balance" style="max-width: 700px;">
        Únete a miles de estudiantes y académicos que ya confían en Banco Universitario para sus operaciones financieras diarias.
      </p>
      <button class="btn btn-cta btn-lg px-4 py-3 fw-medium">
        Acceder a banca en línea 
        <span class="ms-2">→</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  /* Degradado fluido de esquina a esquina */
  background: linear-gradient(155deg, #085F63 0%, #085F63 60%, #47BBB4 100%);
}

.btn-cta {
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  color: #0a423d;
  font-size: 1.1rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;     /* Asegura el cursor de mano */
  will-change: transform, box-shadow; /* Optimiza la animación */
}

.btn-cta:hover {
  background-color: #ffffff;          /* Mantiene fondo blanco limpio */
  transform: scale(1.05);             /* Se agranda un 5% */
  box-shadow: 0 0 20px 8px rgba(103, 115, 122, 0.8); /* Brillo blanco alrededor */
}

.cta-section h2,
.cta-section p {
  color: white;
}
</style>