<template>
  <PrivateLayout>
    <div class="receipt-page-container d-flex flex-column align-items-center py-4">
      <!-- Icono e Indicador de Éxito -->
      <div class="success-header text-center mb-4">
        <div class="success-circle mb-3 d-flex align-items-center justify-content-center mx-auto">
          <i class="bi bi-check-lg"></i>
        </div>
        <h1 class="success-title">¡Transferencia Exitosa!</h1>
        <p class="success-subtitle text-muted">Tu transferencia ha sido procesada correctamente</p>
      </div>

      <!-- Tarjeta del Comprobante (Ticket) -->
      <div class="receipt-card card border-0 shadow rounded-4 overflow-hidden mb-4 p-4 p-md-5">
        <div class="receipt-card-header text-center mb-4">
          <div class="bank-logo-badge mb-3 px-4 py-2 d-inline-block">
            Banco Universitario
          </div>
          <h2 class="receipt-type-label m-0">COMPROBANTE DE TRANSFERENCIA</h2>
        </div>

        <hr class="dashed-divider my-4" />

        <div class="receipt-card-body">
          <!-- Número de Referencia -->
          <div class="detail-group mb-4">
            <span class="detail-label text-muted d-block mb-1">Número de Referencia</span>
            <strong class="detail-value text-teal font-monospace fs-5">
              BU-{{ receipt?.id }}
            </strong>
          </div>

          <!-- CI/RIF del Destinatario -->
          <div class="detail-group mb-4">
            <span class="detail-label text-muted d-block mb-1">CI/RIF del Destinatario</span>
            <strong class="detail-value text-dark-blue font-monospace">
              {{ receipt?.document_number || 'No disponible' }}
            </strong>
          </div>

          <!-- Banner de Monto Transferido -->
          <div class="monto-banner-block rounded-3 text-white text-center p-3 mb-4">
            <span class="monto-banner-label d-block text-white-50 text-sm">Monto Transferido</span>
            <strong class="monto-banner-value font-monospace fs-3">Bs. {{ formatNumber(receipt?.amount) }}</strong>
          </div>

          <!-- Número de Cuenta Destino -->
          <div class="detail-group mb-4">
            <span class="detail-label text-muted d-block mb-1">Número de Cuenta Destino</span>
            <strong class="detail-value text-dark-blue font-monospace d-block">
              {{ formatAccountNumber(receipt?.account_number) }}
            </strong>
            <span class="detail-subvalue text-muted text-sm d-block mt-1">
              {{ receipt?.recipient }}
            </span>
          </div>

          <!-- Concepto -->
          <div class="detail-group mb-4">
            <span class="detail-label text-muted d-block mb-1">Concepto</span>
            <strong class="detail-value text-dark-blue font-monospace">
              "{{ receipt?.description }}"
            </strong>
          </div>
        </div>

        <hr class="dashed-divider my-4" />

        <!-- Pie del Ticket -->
        <div class="receipt-card-footer text-center">
          <p class="footer-notice text-muted text-xs mb-1">
            Este documento es un comprobante válido de la operación realizada
          </p>
          <p class="footer-datetime text-muted text-xs font-monospace m-0">
            Banco Universitario - {{ formatDateTime(receipt?.created_at) }}
          </p>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="receipt-actions-container d-flex flex-column flex-sm-row gap-3 justify-content-center w-100 max-w-actions mb-4">
        <button class="btn btn-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" @click="onDownloadPlaceholder">
          <i class="bi bi-download"></i> Descargar
        </button>
        <button class="btn btn-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" @click="onPrintPlaceholder">
          <i class="bi bi-printer"></i> Imprimir
        </button>
        <button class="btn btn-outline-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" @click="newTransfer">
          <i class="bi bi-arrow-repeat"></i> Nueva Transferencia
        </button>
      </div>

      <!-- Enlace Volver al Inicio -->
      <button class="btn btn-link text-teal text-decoration-none fw-semibold mb-5" @click="goHome">
        Volver al Inicio
      </button>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'

const router = useRouter()
const receipt = ref(null)

// Formateadores
const formatNumber = (num) => {
  if (num === undefined || num === null) return '0.00'
  return Number(num).toFixed(2)
}

const formatAccountNumber = (accNum) => {
  if (!accNum) return '-'
  return accNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4-$5')
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    let hours = d.getHours()
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.'
    hours = hours % 12
    hours = hours ? hours : 12 // la hora '0' debe ser '12'
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`
  } catch (e) {
    return dateStr
  }
}

// Marcadores de posición para las fases de Impresión y Descarga
const onPrintPlaceholder = () => {
  alert('La funcionalidad de impresión se habilitará en la Fase 6.')
}

const onDownloadPlaceholder = () => {
  alert('La funcionalidad de descarga en PDF se habilitará en la Fase 7.')
}

const SESSION_KEY = 'bu_last_transfer_receipt'

// Nueva transferencia (limpia sesión y redirige)
const newTransfer = () => {
  sessionStorage.removeItem(SESSION_KEY)
  router.push('/transferencias')
}

// Volver al inicio
const goHome = () => {
  sessionStorage.removeItem(SESSION_KEY)
  router.push('/inicio')
}

// Cargar y recuperar el estado de la transferencia
const loadReceiptData = () => {
  // 1. Intentar desde history.state de Vue Router
  let data = window.history.state?.receipt
  
  // 2. Si no existe (refresco de página), intentar desde sessionStorage
  if (!data) {
    const sessionData = sessionStorage.getItem(SESSION_KEY)
    if (sessionData) {
      try {
        data = JSON.parse(sessionData)
      } catch (e) {
        console.error('Error parsing session storage receipt:', e)
      }
    }
  }

  // 3. Validar presencia de campos esenciales
  const isValid = data && 
                  data.id !== undefined && 
                  data.account_number && 
                  data.amount !== undefined && 
                  data.description && 
                  data.created_at && 
                  data.recipient && 
                  data.document_number

  // 4. Si no hay datos válidos disponibles, eliminar y redirigir
  if (!isValid) {
    console.warn('Datos del comprobante inválidos o inexistentes. Redirigiendo a transferencias.')
    sessionStorage.removeItem(SESSION_KEY)
    receipt.value = null
    router.push('/transferencias')
    return
  }

  receipt.value = data
}

onMounted(() => {
  loadReceiptData()
})
</script>

<style scoped>
.receipt-page-container {
  width: 100%;
}

/* Indicador de éxito */
.success-circle {
  background-color: #d1fae5;
  color: #10b981;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  font-size: 34px;
}

.success-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  color: #085f63;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 6px;
}

.success-subtitle {
  font-size: 15px;
  font-weight: 500;
  margin: 0;
}

/* Tarjeta del Comprobante */
.receipt-card {
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  box-shadow: 0 10px 25px rgba(8, 95, 99, 0.04) !important;
}

.bank-logo-badge {
  background-color: #085f63;
  color: #ffffff;
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  letter-spacing: 0.2px;
}

.receipt-type-label {
  font-size: 11px;
  font-weight: 600;
  color: #7c8e96;
  letter-spacing: 1px;
}

.dashed-divider {
  border: none;
  border-top: 1.5px dashed rgba(8, 95, 99, 0.15);
  margin: 0;
}

/* Detalles */
.detail-group {
  text-align: left;
}

.detail-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.detail-value {
  font-size: 14.5px;
  font-weight: 600;
}

.text-teal {
  color: #085f63 !important;
}

.text-dark-blue {
  color: #2c3e50;
}

/* Banner de Monto */
.monto-banner-block {
  background: linear-gradient(135deg, #49beb7 0%, #129a90 100%);
  box-shadow: 0 4px 15px rgba(73, 190, 183, 0.15);
}

.monto-banner-label {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 10px !important;
}

.monto-banner-value {
  font-weight: 700;
  letter-spacing: -0.5px;
}

.footer-notice {
  font-size: 10.5px;
  font-weight: 500;
}

.footer-datetime {
  font-size: 10.5px;
  font-weight: 600;
}

/* Acciones */
.max-w-actions {
  max-width: 480px;
}

.btn-teal-action {
  background: linear-gradient(135deg, #129a90 0%, #085f63 100%);
  color: #ffffff;
  border: 1px solid #085f63;
  font-weight: 600;
  font-size: 14px;
  flex: 1;
  box-shadow: 0 4px 12px rgba(8, 95, 99, 0.1);
  transition: all 0.2s ease;
}

.btn-teal-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(8, 95, 99, 0.15);
  color: #ffffff;
}

.btn-outline-teal-action {
  background-color: #ffffff;
  color: #085f63;
  border: 1.5px solid #085f63;
  font-weight: 600;
  font-size: 14px;
  flex: 1.2;
  transition: all 0.2s ease;
}

.btn-outline-teal-action:hover {
  background-color: rgba(8, 95, 99, 0.03);
  transform: translateY(-1px);
}
</style>
