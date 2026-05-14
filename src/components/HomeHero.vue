<template>
  <section id="inicio" class="hero-section">
    <!-- Decorative Background Elements -->
    <div class="hero-bg-blob blob-1"></div>
    <div class="hero-bg-blob blob-2"></div>

    <div class="container hero-container">
      <div class="hero-grid">
        <div class="hero-content-wrapper">
          <div class="hero-content">
            <p class="hero-eyebrow">TU FUTURO FINANCIERO COMIENZA AQUÍ</p>

            <h1 class="hero-title">
              La banca diseñada
              <br class="d-none d-md-block" />
              para la comunidad
              <br class="d-none d-md-block" />
              universitaria
            </h1>

            <p class="hero-text">
              Gestiona tus becas, gastos diarios y ahorros en una plataforma
              construida para la excelencia académica. Segura, rápida y siempre
              disponible.
            </p>

            <div class="trust-indicators">
              <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Seguridad</span>
              </div>
              <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                <span>Trayectoria</span>
              </div>
              <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span>Presencia</span>
              </div>
            </div>

            <div class="hero-actions">
              <a href="#" class="btn hero-btn-primary">
                Abrir cuenta
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ms-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>

              <a href="#servicios" class="btn hero-btn-secondary">
                Conocer más
              </a>
            </div>
          </div>
        </div>

        <div class="hero-visual-wrapper">
          <div class="hero-visual">
            <div class="balance-card">
              <p class="balance-label">BALANCE DISPONIBLE</p>
              <h2 class="balance-amount">$12,450.00</h2>

              <div class="bars">
                <span v-for="n in 12" :key="n" class="bar"></span>
              </div>

              <div class="balance-actions">
                <button class="action-btn" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  Enviar
                </button>
                <button class="action-btn" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Recibir
                </button>
              </div>
            </div>

            <div class="floating-card floating-left">
              <div class="float-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              </div>
              <div class="float-text">
                <h6>Transferencia Exitosa</h6>
                <p>$250.00 enviados</p>
              </div>
            </div>

            <div class="floating-card floating-right">
              <div class="float-icon growth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div class="float-text">
                <small>Este mes</small>
                <strong>+12.5%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.hero-section {
  position: relative;
  background: #ffffff;
  overflow: hidden;
}

.hero-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.blob-1 {
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
  width: 600px;
  height: 600px;
  background: rgba(73, 190, 183, 0.15);
}

.blob-2 {
  bottom: 0;
  left: 0;
  transform: translate(-25%, 25%);
  width: 400px;
  height: 400px;
  background: rgba(8, 95, 99, 0.1);
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 992px) {
  .hero-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 5rem; /* 80px */
  }
  .hero-content-wrapper {
    grid-column: span 7;
  }
  .hero-visual-wrapper {
    grid-column: span 5;
  }
}

.hero-content {
  max-width: 100%;
}

.hero-eyebrow {
  margin: 0 0 1.25rem;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #49beb7;
}

@media (min-width: 992px) {
  .hero-eyebrow {
    font-size: 16px;
  }
}

.hero-title {
  margin: 0 0 1.5rem;
  font-size: 36px;
  line-height: 1.05;
  font-weight: 700;
  color: #085f63;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 48px;
  }
}

@media (min-width: 992px) {
  .hero-title {
    font-size: 64px;
  }
}

.hero-text {
  margin: 0 0 2rem;
  max-width: 520px;
  font-size: 16px;
  line-height: 1.65;
  color: #5b6b73; /* text-muted-foreground */
}

@media (min-width: 992px) {
  .hero-text {
    font-size: 20px;
  }
}

.trust-indicators {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .trust-indicators {
    gap: 2.5rem;
  }
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #5b6b73;
  font-weight: 600;
  font-size: 0.95rem;
}

.trust-icon {
  color: #49beb7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.5rem;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #085f63;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.95rem 1.55rem;
  font-size: 0.98rem;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(8, 95, 99, 0.18);
  transition: all 0.25s ease;
  text-decoration: none;
}

.hero-btn-primary:hover {
  background: #074d51;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(8, 95, 99, 0.25);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #49beb7;
  border: 1px solid #d5dee0;
  border-radius: 12px;
  padding: 0.95rem 1.55rem;
  font-size: 0.98rem;
  font-weight: 500;
  transition: all 0.25s ease;
  text-decoration: none;
}

.hero-btn-secondary:hover {
  border-color: #49beb7;
  color: #085f63;
  background: #f8fbfb;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 430px;
}

@media (min-width: 992px) {
  .hero-visual {
    justify-content: flex-end;
  }
}

.balance-card {
  position: relative;
  width: 100%;
  max-width: 455px;
  background: #ffffff;
  border: 1px solid rgba(213, 222, 224, 0.8);
  border-radius: 2rem;
  padding: 1.75rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
}

.balance-label {
  margin: 0 0 0.45rem;
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: #5b6b73;
}

.balance-amount {
  margin: 0 0 1.4rem;
  font-size: 3.1rem;
  line-height: 1.05;
  font-weight: 700;
  color: #085f63;
}

.bars {
  display: flex;
  align-items: end;
  gap: 0.35rem;
  height: 48px;
  margin-bottom: 1.4rem;
}

.bar {
  flex: 1;
  height: 75%;
  background: rgba(73, 190, 183, 0.32);
  border-radius: 6px;
  transition: all 0.25s ease;
}

.bar:nth-child(1) { height: 42%; }
.bar:nth-child(2) { height: 62%; }
.bar:nth-child(3) { height: 48%; }
.bar:nth-child(4) { height: 72%; }
.bar:nth-child(5) { height: 56%; }
.bar:nth-child(6) { height: 82%; }
.bar:nth-child(7) { height: 64%; }
.bar:nth-child(8) { height: 76%; }
.bar:nth-child(9) { height: 88%; }
.bar:nth-child(10) { height: 72%; }
.bar:nth-child(11) { height: 92%; }
.bar:nth-child(12) { height: 96%; }

.balance-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(213, 222, 224, 0.9);
  background: #f8fbfb;
  color: #085f63;
  border-radius: 18px;
  padding: 0.95rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.25s ease;
}

.action-btn:hover {
  background: #eef8f7;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid rgba(213, 222, 224, 0.8);
  border-radius: 16px;
  padding: 0.8rem 1rem;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08);
}

.floating-left {
  left: -28px;
  bottom: 68px;
  animation: floatY 3.2s ease-in-out infinite;
}

.floating-right {
  right: -10px;
  top: 46px;
  animation: floatY 3.2s ease-in-out infinite 0.8s;
}

.float-icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.success {
  background: rgba(46, 158, 91, 0.1);
  color: #2e9e5b;
}

.growth {
  background: rgba(73, 190, 183, 0.12);
  color: #49beb7;
}

.float-text h6,
.float-text p,
.float-text small,
.float-text strong {
  margin: 0;
}

.float-text h6 {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #085f63;
  margin-bottom: 0.15rem;
}

.float-text p,
.float-text small {
  display: block;
  font-size: 0.8rem;
  color: #5b6b73;
}

.float-text strong {
  display: block;
  font-size: 1.15rem;
  line-height: 1.2;
  color: #2e9e5b;
  font-weight: 700;
}

@keyframes floatY {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 575.98px) {
  .hero-visual {
    min-height: 310px;
    margin-top: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .balance-card {
    padding: 1.2rem;
  }
  .balance-amount {
    font-size: 2.15rem;
  }
  .floating-card {
    transform: scale(0.86);
  }
  .floating-left {
    left: -24px;
    bottom: 24px;
  }
  .floating-right {
    right: -18px;
    top: 10px;
  }
}
</style>