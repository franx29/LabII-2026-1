<template>
  <PrivateLayout>
    <div class="receipt-page-container d-flex flex-column align-items-center py-4">
      <!-- Mensaje de Estado de Descarga PDF -->
      <div v-if="pdfStatusMsg" class="alert d-flex align-items-center gap-2 mb-4 w-100 max-w-actions" :class="pdfStatusType === 'success' ? 'alert-success-custom' : pdfStatusType === 'info' ? 'alert-info-custom' : 'alert-danger-custom'" role="alert">
        <div v-if="pdfStatusType === 'info'" class="spinner-border spinner-border-sm text-teal" role="status"></div>
        <i v-else :class="pdfStatusType === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
        <div>{{ pdfStatusMsg }}</div>
      </div>

      <!-- Icono e Indicador de Éxito -->
      <div class="success-header text-center mb-4">
        <div class="success-circle mb-3 d-flex align-items-center justify-content-center mx-auto">
          <i class="bi bi-check-lg"></i>
        </div>
        <h1 class="success-title">¡Transferencia Exitosa!</h1>
        <p class="success-subtitle text-muted">Tu transferencia ha sido procesada correctamente</p>
      </div>

      <!-- Tarjeta del Comprobante (Ticket) -->
      <div ref="receiptCard" class="receipt-card card border-0 shadow rounded-4 overflow-hidden mb-4 p-4 p-md-5">
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
        <button 
          class="btn btn-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" 
          @click="downloadPdf"
          :disabled="isDownloadingPdf"
        >
          <span v-if="isDownloadingPdf" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <i v-else class="bi bi-download"></i> 
          {{ isDownloadingPdf ? 'Generando...' : 'Descargar' }}
        </button>
        <button 
          class="btn btn-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" 
          @click="printReceipt"
          :disabled="isDownloadingPdf"
        >
          <i class="bi bi-printer"></i> Imprimir
        </button>
        <button 
          class="btn btn-outline-teal-action py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2" 
          @click="newTransfer"
          :disabled="isDownloadingPdf"
        >
          <i class="bi bi-arrow-repeat"></i> Nueva Transferencia
        </button>
      </div>

      <!-- Enlace Volver al Inicio -->
      <button class="btn btn-link text-teal text-decoration-none fw-semibold mb-5" @click="goHome" :disabled="isDownloadingPdf">
        Volver al Inicio
      </button>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const router = useRouter()
const receipt = ref(null)
const receiptCard = ref(null)
const isDownloadingPdf = ref(false)
const pdfStatusMsg = ref('')
const pdfStatusType = ref('')

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

// Impresión real del comprobante (Fase 6)
const printReceipt = () => {
  window.print()
}

// Descarga en PDF real del comprobante (Fase 7)
const downloadPdf = async () => {
  if (isDownloadingPdf.value) return
  isDownloadingPdf.value = true
  pdfStatusMsg.value = 'Generando comprobante en PDF...'
  pdfStatusType.value = 'info'

  try {
    const cardEl = receiptCard.value
    if (!cardEl) throw new Error('No se pudo encontrar la tarjeta del comprobante.')

    // Capturar el ticket en un canvas de alta calidad (scale 2)
    const canvas = await html2canvas(cardEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    })

    const imgData = canvas.toDataURL('image/png')
    
    // Crear PDF tamaño A4 vertical
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Centrar en página A4 dejando márgenes de 15mm de cada lado
    const maxPdfWidth = pdfWidth - 30 
    const imgWidth = maxPdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const xOffset = (pdfWidth - imgWidth) / 2
    const yOffset = 20 // 20mm de margen superior

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight)

    const reference = receipt.value?.id || 'BU'
    pdf.save(`comprobante-BU-${reference}.pdf`)

    // Éxito de descarga
    pdfStatusMsg.value = 'Comprobante descargado exitosamente'
    pdfStatusType.value = 'success'
    
    // Ocultar mensaje automáticamente
    setTimeout(() => {
      pdfStatusMsg.value = ''
    }, 4500)

  } catch (error) {
    console.error('Error al generar PDF:', error)
    pdfStatusMsg.value = 'Error al generar el archivo PDF. Inténtalo nuevamente.'
    pdfStatusType.value = 'danger'
  } finally {
    isDownloadingPdf.value = false
  }
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

/* Alertas de descarga */
.alert-success-custom {
  background-color: #f3faf7;
  color: #03543f;
  border: 1px solid rgba(3, 84, 63, 0.15);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
}

.alert-danger-custom {
  background-color: #fdf2f2;
  color: #9b1c1c;
  border: 1px solid rgba(155, 28, 28, 0.15);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
}

.alert-info-custom {
  background-color: #f0fdfa;
  color: #0d9488;
  border: 1px solid rgba(13, 148, 136, 0.15);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
}

/* --- ESTILOS DE IMPRESIÓN (Fase 6) --- */
@media print {
  html, body, #app {
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Ocultar barra lateral, header, pie de página, botones e indicadores generales */
  .sidebar,
  .brand-logo-card,
  .sidebar-nav,
  .sidebar-footer,
  aside,
  nav,
  .receipt-actions-container,
  .btn,
  .btn-link,
  a,
  .success-header,
  .alert,
  .alert-success-custom,
  .alert-danger-custom,
  .alert-info-custom {
    display: none !important;
  }

  /* Resetear el layout principal y desactivar flexbox */
  .private-layout-wrapper,
  .main-content,
  .container-fluid {
    background-color: #ffffff !important;
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    box-shadow: none !important;
    display: block !important;
    overflow: visible !important;
  }

  .main-content {
    margin-left: 0 !important;
    padding-bottom: 0 !important;
  }

  /* Centrar el ticket en la hoja sin usar 100vh */
  .receipt-page-container {
    display: block !important;
    width: 100% !important;
    min-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #ffffff !important;
    overflow: visible !important;
  }

  /* Ajustar tamaño y evitar cortes en la tarjeta de comprobante */
  .receipt-card {
    border: 1px solid #e2e8f0 !important;
    box-shadow: none !important;
    margin: 20px auto !important;
    padding: 30px !important;
    width: 100% !important;
    max-width: 480px !important;
    background-color: #ffffff !important;
    box-sizing: border-box !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    overflow: visible !important;
  }

  /* Tamaño A4 vertical sin cabecera de navegador */
  @page {
    size: A4 portrait;
    margin: 1.5cm;
  }
}
</style>
