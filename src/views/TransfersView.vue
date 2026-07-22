<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4">
      <h1 class="view-title">Transferencias Bancarias</h1>
      <p class="view-subtitle">Realiza transferencias de forma rápida y segura</p>
    </header>

    <!-- Esqueleto de Carga (Skeleton Loader) -->
    <div v-if="isLoadingData" class="transfers-skeleton">
      <!-- Tarjeta de Saldo Disponible -->
      <div class="card border-0 shadow-sm rounded-4 p-3 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div class="skeleton-loader skeleton-text mb-1" style="width: 120px; height: 12px;"></div>
            <div class="skeleton-loader skeleton-text" style="width: 150px; height: 24px; margin-bottom: 0;"></div>
          </div>
          <div class="text-end">
            <div class="skeleton-loader skeleton-text mb-1 ms-auto" style="width: 120px; height: 12px;"></div>
            <div class="skeleton-loader skeleton-text" style="width: 180px; height: 20px; margin-bottom: 0;"></div>
          </div>
        </div>
      </div>

      <!-- Panel 1: Datos del Destinatario -->
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="skeleton-loader skeleton-text mb-3" style="width: 180px; height: 20px;"></div>
        <div class="mb-3">
          <div class="skeleton-loader skeleton-text mb-2" style="width: 200px; height: 14px;"></div>
          <div class="skeleton-loader skeleton-text" style="height: 45px; border-radius: 10px; margin-bottom: 0;"></div>
        </div>
        <div class="form-check mb-3">
          <div class="skeleton-loader skeleton-text" style="width: 250px; height: 18px; margin-bottom: 0;"></div>
        </div>
      </div>

      <!-- Panel 2: Detalles de la Transferencia -->
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="skeleton-loader skeleton-text mb-3" style="width: 220px; height: 20px;"></div>
        <div class="mb-3">
          <div class="skeleton-loader skeleton-text mb-2" style="width: 120px; height: 14px;"></div>
          <div class="skeleton-loader skeleton-text" style="height: 45px; border-radius: 10px; margin-bottom: 0;"></div>
        </div>
        <div class="mb-3">
          <div class="skeleton-loader skeleton-text mb-2" style="width: 180px; height: 14px;"></div>
          <div class="skeleton-loader skeleton-text" style="height: 80px; border-radius: 10px; margin-bottom: 0;"></div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="d-flex justify-content-center gap-3 mb-5">
        <div class="skeleton-loader skeleton-button" style="height: 42px; border-radius: 10px; width: 120px;"></div>
        <div class="skeleton-loader skeleton-button" style="height: 42px; border-radius: 10px; width: 120px;"></div>
      </div>
    </div>

    <div v-else class="transfers-container">
      <!-- Mensaje de Error Global -->
      <div v-if="errorMsg" class="alert alert-danger-custom d-flex align-items-center gap-2 mb-4" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <div>{{ errorMsg }}</div>
      </div>

      <!-- Tarjeta de Saldo Disponible -->
      <div class="balance-bar card border-0 shadow-sm rounded-4 p-3 mb-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <span class="text-muted text-sm d-block">Tu saldo disponible:</span>
            <strong class="balance-amount text-teal font-monospace fs-4">Bs. {{ formatNumber(balance) }}</strong>
          </div>
          <div class="text-end">
            <span class="text-muted text-sm d-block">Tu número de cuenta:</span>
            <span class="account-number font-monospace text-teal fw-semibold">{{ formatAccountNumber(currentUser?.account_number) }}</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleContinue" class="transfer-form">
        <!-- Panel 1: Datos del Destinatario -->
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 card-form-panel">
          <h3 class="panel-title mb-3">Datos del Destinatario</h3>
          
          <!-- Input Número de Cuenta -->
          <div class="mb-3">
            <label for="destinationAccount" class="form-label">Número de Cuenta (20 dígitos)</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 border-teal-light text-muted font-monospace">
                <i class="bi bi-bank"></i>
              </span>
              <input
                id="destinationAccount"
                v-model="accountNumber"
                type="text"
                class="form-control border-start-0 border-teal-light font-monospace"
                :class="{ 'is-invalid': validationErrors.accountNumber }"
                placeholder="01020123456789012345"
                maxlength="20"
                @input="onAccountInput"
                :disabled="isValidatingRecipient"
                required
              />
              <button 
                class="btn btn-teal px-3" 
                type="button"
                @click="openAffiliatesModal"
                :disabled="isValidatingRecipient"
              >
                <i class="bi bi-people-fill me-1"></i> Afiliados
              </button>
              <div v-if="validationErrors.accountNumber" class="invalid-feedback">
                {{ validationErrors.accountNumber }}
              </div>
            </div>
            <div class="form-text text-muted">
              Ingresa exactamente 20 dígitos numéricos del banco de destino.
            </div>
          </div>

          <!-- Checkbox Guardar Afiliado -->
          <div class="form-check mb-3">
            <input
              id="saveContact"
              v-model="saveContact"
              type="checkbox"
              class="form-check-input custom-checkbox"
              :disabled="isValidatingRecipient"
            />
            <label class="form-check-label select-none" for="saveContact">
              Guardar en mis afiliados frecuentes
            </label>
          </div>

          <!-- Input Alias Dinámico -->
          <Transition name="slide-fade">
            <div v-if="saveContact" class="mb-3">
              <label for="contactAlias" class="form-label">Alias del Afiliado</label>
              <div class="input-wrapper">
                <span class="input-icon"><i class="bi bi-tag"></i></span>
                <input
                  id="contactAlias"
                  v-model="contactAlias"
                  type="text"
                  class="form-control px-input"
                  :class="{ 'is-invalid': validationErrors.contactAlias }"
                  placeholder="Ej. Tio Carlos, Mamá, Trabajo"
                  maxlength="20"
                  :disabled="isValidatingRecipient"
                  required
                />
                <div v-if="validationErrors.contactAlias" class="invalid-feedback">
                  {{ validationErrors.contactAlias }}
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Panel 2: Detalles de la Transferencia -->
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 card-form-panel">
          <h3 class="panel-title mb-3">Detalles de la Transferencia</h3>

          <!-- Monto -->
          <div class="mb-3">
            <label for="transferAmount" class="form-label">Monto (Bs.)</label>
            <div class="input-wrapper">
              <span class="input-icon font-monospace fw-bold">Bs.</span>
              <input
                id="transferAmount"
                v-model="amount"
                type="number"
                step="0.01"
                min="0.01"
                class="form-control px-input font-monospace"
                :class="{ 'is-invalid': validationErrors.amount }"
                placeholder="0.00"
                :disabled="isValidatingRecipient"
                required
              />
              <div v-if="validationErrors.amount" class="invalid-feedback">
                {{ validationErrors.amount }}
              </div>
            </div>
          </div>

          <!-- Concepto -->
          <div class="mb-3">
            <label for="transferDescription" class="form-label">Concepto/Referencia</label>
            <textarea
              id="transferDescription"
              v-model="description"
              class="form-control"
              :class="{ 'is-invalid': validationErrors.description }"
              placeholder="Descripción de la transferencia"
              rows="3"
              maxlength="100"
              :disabled="isValidatingRecipient"
              required
            ></textarea>
            <div class="d-flex justify-content-between mt-1 text-muted text-xs">
              <span v-if="validationErrors.description" class="text-danger">{{ validationErrors.description }}</span>
              <span v-else>Indica el motivo o referencia de la transacción.</span>
              <span>{{ description.length }}/100</span>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="d-flex justify-content-center gap-3 mb-5">
          <button
            type="button"
            class="btn btn-outline-teal rounded-3 px-4 py-2"
            @click="handleCancel"
            :disabled="isValidatingRecipient"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-teal rounded-3 px-4 py-2"
            :disabled="isValidatingRecipient"
          >
            <span v-if="isValidatingRecipient" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isValidatingRecipient ? 'Validando...' : 'Continuar' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Modal "Mis Afiliados" (Fase 3 con corrección singular/plural) -->
    <div v-if="showAffiliatesModal" class="modal-backdrop-custom" @click="closeAffiliatesModal">
      <div class="modal-card-custom" @click.stop>
        <!-- Encabezado del Modal -->
        <div class="modal-header-custom d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="modal-title-icon">
              <i class="bi bi-people-fill text-teal"></i>
            </div>
            <div>
              <h3 class="modal-title-text m-0">Mis Afiliados</h3>
              <span class="modal-subtitle-text text-muted small" v-if="!isLoadingAffiliates">
                {{ affiliates.length }} {{ affiliates.length === 1 ? 'contacto' : 'contactos' }}
              </span>
            </div>
          </div>
          <button class="btn-close-custom" @click="closeAffiliatesModal" aria-label="Cerrar modal">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <!-- Cuerpo del Modal -->
        <div class="modal-body-custom">
          <!-- Filtro de Búsqueda -->
          <div class="mb-3">
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-search"></i></span>
              <input
                type="text"
                v-model="affiliateSearchQuery"
                class="form-control px-input search-input"
                placeholder="Buscar por nombre, cuenta o alias..."
                :disabled="isLoadingAffiliates || affiliates.length === 0"
              />
            </div>
          </div>

          <!-- Alerta de error -->
          <div v-if="errorAffiliatesMsg" class="alert alert-danger-custom py-2 px-3 mb-3 text-sm">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            {{ errorAffiliatesMsg }}
          </div>

          <!-- Cargando afiliados -->
          <div v-if="isLoadingAffiliates" class="modal-loader py-5 text-center">
            <div class="spinner-border text-teal spinner-border-sm mb-2" role="status"></div>
            <p class="text-muted text-sm m-0">Obteniendo afiliados registrados...</p>
          </div>

          <!-- Lista de Afiliados (Scrollable) -->
          <div v-else class="affiliates-list-container scroll-container">
            <div 
              v-for="contact in filteredAffiliates" 
              :key="contact.id" 
              class="affiliate-item-card p-3 mb-2 d-flex justify-content-between align-items-center"
              @click="selectAffiliate(contact)"
            >
              <div>
                <h4 class="affiliate-name m-0">{{ getContactName(contact) }}</h4>
                <span class="affiliate-account font-monospace text-muted text-xs d-block mt-1">
                  {{ contact.account_number }}
                </span>
              </div>
              <div class="affiliate-tag-wrapper">
                <span class="badge badge-alias-outline">
                  {{ contact.alias }}
                </span>
              </div>
            </div>

            <!-- Estado Vacío (Sin resultados de búsqueda) -->
            <div v-if="filteredAffiliates.length === 0 && affiliateSearchQuery.trim() !== ''" class="py-5 text-center text-muted">
              <i class="bi bi-search fs-3 d-block mb-2"></i>
              No se encontraron afiliados que coincidan con la búsqueda.
            </div>

            <!-- Estado Vacío (Sin afiliados agregados) -->
            <div v-if="affiliates.length === 0" class="py-5 text-center text-muted">
              <i class="bi bi-journal-x fs-3 d-block mb-2"></i>
              Aún no tienes afiliados guardados en contactos frecuentes.
            </div>
          </div>
        </div>

        <!-- Pie del Modal -->
        <div class="modal-footer-custom d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-light">
          <span class="text-muted text-xs fw-semibold">
            Total de afiliados: {{ affiliates.length }} {{ affiliates.length === 1 ? 'contacto' : 'contactos' }}
          </span>
          <button class="btn btn-outline-teal btn-sm px-3 rounded-2" @click="closeAffiliatesModal">
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal "Verifica los Datos" (Fase 4) -->
    <div v-if="showConfirmModal" class="modal-backdrop-custom" @click="closeConfirmModal">
      <div class="modal-card-custom confirm-modal" @click.stop>
        <!-- Encabezado del Modal -->
        <div class="modal-header-custom d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="modal-title-icon-warning">
              <i class="bi bi-exclamation-triangle text-teal"></i>
            </div>
            <h3 class="modal-title-text m-0">Verifica los Datos</h3>
          </div>
          <button class="btn-close-custom" @click="closeConfirmModal" :disabled="isSubmittingTransfer" aria-label="Cerrar modal">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <!-- Cuerpo del Modal -->
        <div class="modal-body-custom">
          <p class="text-muted text-sm mb-4">
            Por favor, asegúrate de que la información del destinatario sea correcta antes de procesar la transacción.
          </p>

          <div class="confirm-details-card p-3 mb-3 rounded-3">
            <div class="mb-3">
              <span class="text-muted text-xs d-block uppercase-label">NÚMERO DE CUENTA</span>
              <strong class="font-monospace text-sm d-block mt-1 text-dark-blue">{{ accountNumber }}</strong>
            </div>

            <div v-if="recipientUser" class="mb-3">
              <span class="text-muted text-xs d-block uppercase-label">DESTINATARIO</span>
              <strong class="text-sm d-block mt-1 text-dark-blue">{{ recipientUser.first_name }} {{ recipientUser.last_name }}</strong>
            </div>

            <div class="row">
              <div class="col-6 mb-3">
                <span class="text-muted text-xs d-block uppercase-label">MONTO</span>
                <strong class="text-teal font-monospace text-sm d-block mt-1">Bs. {{ formatNumber(amount) }}</strong>
              </div>
              <div class="col-6 mb-3">
                <span class="text-muted text-xs d-block uppercase-label">MONEDA</span>
                <strong class="text-sm d-block mt-1 text-dark-blue">Bolívares (VES)</strong>
              </div>
            </div>

            <div class="mb-0">
              <span class="text-muted text-xs d-block uppercase-label">CONCEPTO</span>
              <span class="text-sm font-monospace d-block mt-1 text-dark-blue">"{{ description }}"</span>
            </div>
          </div>
        </div>

        <!-- Pie del Modal -->
        <div class="modal-footer-custom d-flex justify-content-end gap-3 mt-3 pt-3 border-top border-light">
          <button 
            type="button"
            class="btn btn-outline-teal btn-sm px-3 py-2 rounded-3" 
            @click="closeConfirmModal" 
            :disabled="isSubmittingTransfer"
          >
            Regresar
          </button>
          <button 
            type="button"
            class="btn btn-teal btn-sm px-4 py-2 rounded-3" 
            @click="submitTransfer" 
            :disabled="isSubmittingTransfer"
          >
            <span v-if="isSubmittingTransfer" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isSubmittingTransfer ? 'Procesando...' : 'Confirmar y Enviar' }}
          </button>
        </div>
      </div>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import userApi from '@/api/user'
import contactsApi from '@/api/contacts'
import transfersApi from '@/api/transfers'

const router = useRouter()

// Estados reactivos de carga y datos de cuenta
const currentUser = ref(null)
const balance = ref(0)
const isLoadingData = ref(true)
const isValidatingRecipient = ref(false)

// Estados del formulario
const accountNumber = ref('')
const saveContact = ref(false)
const contactAlias = ref('')
const amount = ref('')
const description = ref('')

// Estados de error y validaciones
const errorMsg = ref('')
const successMsg = ref('')
const validationErrors = ref({})
const recipientUser = ref(null)

// Estados de Afiliados (Fase 3)
const showAffiliatesModal = ref(false)
const affiliates = ref([])
const isLoadingAffiliates = ref(false)
const errorAffiliatesMsg = ref('')
const affiliateSearchQuery = ref('')
const nameCache = ref({}) // key: account_number, value: { first_name, last_name, document_number }

// Estados de Confirmación y Envío (Fase 4)
const showConfirmModal = ref(false)
const isSubmittingTransfer = ref(false)

// Formateadores
const formatNumber = (num) => {
  return Number(num).toFixed(2)
}

const formatAccountNumber = (accNum) => {
  if (!accNum) return '-'
  return accNum.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4-$5')
}

// Filtro de teclado para número de cuenta (solo dígitos)
const onAccountInput = (e) => {
  accountNumber.value = e.target.value.replace(/\D/g, '')
}

// Limpiar formulario y errores
const handleCancel = () => {
  accountNumber.value = ''
  saveContact.value = false
  contactAlias.value = ''
  amount.value = ''
  description.value = ''
  validationErrors.value = {}
  errorMsg.value = ''
  successMsg.value = ''
  recipientUser.value = null
}

// Carga inicial del balance y datos del usuario
const loadAccountDetails = async () => {
  isLoadingData.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const userRes = await userApi.whoami()
    currentUser.value = userRes.data.data

    const balanceRes = await userApi.getBalance()
    balance.value = balanceRes.data.data?.balance || 0
  } catch (err) {
    console.error('Error al cargar datos del usuario/balance:', err)
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = err.response?.data?.message || 'Error al conectar con el servidor para obtener los datos de la cuenta.'
    }
  } finally {
    isLoadingData.value = false
  }
}

// Acción de continuar y realizar validaciones
const handleContinue = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  validationErrors.value = {}

  // 1. Validaciones locales de formulario
  let hasErrors = false

  if (!accountNumber.value) {
    validationErrors.value.accountNumber = 'El número de cuenta es obligatorio.'
    hasErrors = true
  } else if (accountNumber.value.length !== 20) {
    validationErrors.value.accountNumber = 'El número de cuenta debe tener exactamente 20 dígitos.'
    hasErrors = true
  } else if (currentUser.value && accountNumber.value === currentUser.value.account_number) {
    validationErrors.value.accountNumber = 'No puedes transferir fondos a tu propia cuenta.'
    hasErrors = true
  }

  if (saveContact.value) {
    if (!contactAlias.value.trim()) {
      validationErrors.value.contactAlias = 'El alias es obligatorio para guardar el afiliado.';
      hasErrors = true;
    } else if (contactAlias.value.trim().length > 20) {
      validationErrors.value.contactAlias = 'El alias no puede exceder los 20 caracteres.';
      hasErrors = true;
    }
  }

  if (amount.value === '' || amount.value === null || amount.value === undefined) {
    validationErrors.value.amount = 'El monto es obligatorio.'
    hasErrors = true
  } else {
    const numAmount = Number(amount.value)
    if (isNaN(numAmount) || numAmount <= 0) {
      validationErrors.value.amount = 'El monto debe ser un número mayor a cero.'
      hasErrors = true
    } else if (numAmount > balance.value) {
      validationErrors.value.amount = `Saldo insuficiente. Tu saldo disponible es Bs. ${formatNumber(balance.value)}.`
      hasErrors = true
    }
  }

  if (!description.value.trim()) {
    validationErrors.value.description = 'El concepto es obligatorio.'
    hasErrors = true
  } else if (description.value.trim().length > 100) {
    validationErrors.value.description = 'El concepto no puede exceder los 100 caracteres.'
    hasErrors = true
  }

  if (hasErrors) {
    return
  }

  // 2. Validación de la cuenta destino con la API real
  isValidatingRecipient.value = true
  recipientUser.value = null
  try {
    const res = await userApi.findByAccountNumber(accountNumber.value)
    recipientUser.value = res.data.data
    
    // Abre el modal de confirmación
    openConfirmModal()
  } catch (err) {
    console.error('Error al verificar cuenta destino:', err)
    if (err.response && err.response.status === 404) {
      validationErrors.value.accountNumber = 'La cuenta destino ingresada no existe en el sistema.'
    } else {
      errorMsg.value = err.response?.data?.message || 'Error de conexión al validar la cuenta en el servidor.'
    }
  } finally {
    isValidatingRecipient.value = false
  }
}

// --- MÉTODOS DEL MODAL DE CONFIRMACIÓN (Fase 4) ---

const openConfirmModal = () => {
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}

// Realiza el POST de transferencia y, si corresponde, guarda el contacto
const submitTransfer = async () => {
  if (isSubmittingTransfer.value) return
  isSubmittingTransfer.value = true
  errorMsg.value = ''

  try {
    // 1. Crear la transferencia en el backend
    const payload = {
      account_number: accountNumber.value,
      amount: Number(amount.value),
      description: description.value.trim()
    }
    const transferRes = await transfersApi.createTransfer(payload)
    const transferData = transferRes.data.data

    // 2. Intentar guardar el contacto si el checkbox fue marcado
    if (saveContact.value) {
      try {
        await contactsApi.createContact({
          alias: contactAlias.value.trim(),
          account_number: accountNumber.value,
          description: description.value.trim()
        })
      } catch (contactErr) {
        console.warn('Fallo no crítico al guardar el contacto frecuente en la base de datos:', contactErr)
        // Ignoramos el error para no duplicar ni interrumpir la confirmación exitosa de transferencia
      }
    }

    // 3. Estructurar el objeto del comprobante con los campos esenciales
    const SESSION_KEY = 'bu_last_transfer_receipt'
    const receiptData = {
      id: transferData.id,
      amount: transferData.amount,
      account_number: transferData.account_number,
      description: transferData.description,
      created_at: transferData.created_at,
      recipient: recipientUser.value ? `${recipientUser.value.first_name} ${recipientUser.value.last_name}` : 'No disponible',
      document_number: recipientUser.value ? recipientUser.value.document_number : 'No disponible'
    }

    // Almacenar en sessionStorage con la clave centralizada
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(receiptData))

    // Cerrar el modal de confirmación y navegar al comprobante
    closeConfirmModal()
    router.push({
      name: 'transfer-receipt',
      state: { receipt: receiptData }
    })


  } catch (err) {
    console.error('Error al enviar la transferencia:', err)
    closeConfirmModal()
    
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = err.response?.data?.message || 'Error al procesar la transferencia con el servidor. Por favor, reintenta.'
    }
  } finally {
    isSubmittingTransfer.value = false
  }
}

// --- MÉTODOS DEL MODAL DE AFILIADOS (Fase 3) ---

// Abrir el modal y cargar afiliados
const openAffiliatesModal = async () => {
  showAffiliatesModal.value = true
  affiliateSearchQuery.value = ''
  errorAffiliatesMsg.value = ''
  isLoadingAffiliates.value = true
  
  try {
    const res = await contactsApi.getContacts({ page_size: 100 })
    affiliates.value = res.data.data || []
    
    // Resolver asíncronamente los nombres reales para la lista de contactos
    resolveRealNames(affiliates.value)
  } catch (err) {
    console.error('Error al obtener lista de afiliados:', err)
    errorAffiliatesMsg.value = 'Error al consultar el listado de afiliados en el servidor.'
  } finally {
    isLoadingAffiliates.value = false
  }
}

// Cerrar el modal
const closeAffiliatesModal = () => {
  showAffiliatesModal.value = false
}

// Seleccionar un afiliado de la lista y cargarlo en el formulario
const selectAffiliate = (contact) => {
  accountNumber.value = contact.account_number
  closeAffiliatesModal()
  // Limpiar cualquier error anterior de la cuenta destino
  if (validationErrors.value.accountNumber) {
    validationErrors.value.accountNumber = ''
  }
}

// Resolver nombres reales por número de cuenta de manera asíncrona usando caché
const resolveRealNames = (contactsList) => {
  contactsList.forEach(async (contact) => {
    const accNum = contact.account_number
    if (nameCache.value[accNum]) {
      return
    }
    
    // Asignar cargando temporalmente
    nameCache.value[accNum] = { first_name: 'Cargando', last_name: 'nombre...' }
    
    try {
      const userRes = await userApi.findByAccountNumber(accNum)
      if (userRes.data && userRes.data.data) {
        nameCache.value[accNum] = userRes.data.data
      }
    } catch (e) {
      console.warn(`No se pudo resolver el titular para la cuenta ${accNum}:`, e)
      // Fallback
      nameCache.value[accNum] = { first_name: contact.alias, last_name: '(Verificar)' }
    }
  })
}

// Retornar el nombre formateado de un afiliado
const getContactName = (contact) => {
  const accNum = contact.account_number
  const cached = nameCache.value[accNum]
  if (cached) {
    if (cached.first_name === 'Cargando') {
      return 'Cargando nombre...'
    }
    return `${cached.first_name} ${cached.last_name}`
  }
  return 'Cargando nombre...'
}

// Filtrar afiliados en el frontend por nombre, cuenta o alias
const filteredAffiliates = computed(() => {
  const query = affiliateSearchQuery.value.trim().toLowerCase()
  if (!query) return affiliates.value
  
  return affiliates.value.filter((contact) => {
    const alias = (contact.alias || '').toLowerCase()
    const accNum = (contact.account_number || '').toLowerCase()
    const name = getContactName(contact).toLowerCase()
    
    return alias.includes(query) || accNum.includes(query) || name.includes(query)
  })
})

// Manejar escape key en ventana
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (showConfirmModal.value) {
      closeConfirmModal()
    } else if (showAffiliatesModal.value) {
      closeAffiliatesModal()
    }
  }
}

onMounted(() => {
  loadAccountDetails()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
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

/* Loader y alertas */
.loader-container {
  min-height: 300px;
}

.text-teal {
  color: #085f63 !important;
}

.border-teal-light {
  border-color: rgba(8, 95, 99, 0.15) !important;
}

.btn-teal {
  background-color: #085f63;
  color: #ffffff;
  border: 1px solid #085f63;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-teal:hover:not(:disabled) {
  background-color: #129a90;
  border-color: #129a90;
}

.btn-outline-teal {
  color: #085f63;
  border-color: #085f63;
  background: transparent;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-outline-teal:hover:not(:disabled) {
  background-color: rgba(8, 95, 99, 0.05);
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

.alert-success-custom {
  background-color: #f3faf7;
  color: #03543f;
  border: 1px solid rgba(3, 84, 63, 0.15);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
}

/* Tarjeta de Balance */
.balance-bar {
  background-color: #ffffff;
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.02) !important;
}

.card-form-panel {
  background-color: #ffffff;
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.02) !important;
}

.panel-title {
  color: #085f63;
  font-size: 18px;
  font-weight: 600;
}

/* Inputs y estilos */
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #7c8e96;
  z-index: 10;
  display: flex;
  align-items: center;
}

.px-input {
  padding-left: 42px !important;
}

.form-control {
  border: 1px solid rgba(8, 95, 99, 0.15);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14.5px;
  transition: all 0.2s ease;
  color: #2c3e50;
}

.form-control:focus {
  border-color: #49beb7;
  box-shadow: 0 0 0 0.25rem rgba(73, 190, 183, 0.12);
  outline: 0;
}

.is-invalid {
  border-color: #dc3545 !important;
}

.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.12) !important;
}

/* Custom checkbox */
.form-check-input.custom-checkbox {
  border-color: rgba(8, 95, 99, 0.3);
}

.form-check-input.custom-checkbox:checked {
  background-color: #085f63;
  border-color: #085f63;
}

.form-check-input.custom-checkbox:focus {
  box-shadow: 0 0 0 0.25rem rgba(73, 190, 183, 0.12);
}

.select-none {
  user-select: none;
  font-weight: 500;
  color: #4f5e66;
  cursor: pointer;
}

/* Animación slide-fade */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.text-xs {
  font-size: 0.75rem !important;
}

/* MODAL STYLING (Fase 3 & 4) */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-card-custom {
  background-color: #ffffff;
  border-radius: 20px;
  width: 90%;
  max-width: 580px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.08);
  border: 1px solid rgba(8, 95, 99, 0.08);
  animation: modal-scale 0.25s ease-out;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
}

.confirm-modal {
  max-width: 480px;
}

@keyframes modal-scale {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-title-icon {
  background-color: rgba(73, 190, 183, 0.1);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.modal-title-icon-warning {
  background-color: rgba(245, 158, 11, 0.15);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.modal-title-text {
  font-family: 'Montserrat Alternates', sans-serif !important;
  color: #085f63;
  font-weight: 700;
  font-size: 18px;
}

.btn-close-custom {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #7c8e96;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
}

.btn-close-custom:hover {
  color: #085f63;
  background-color: rgba(8, 95, 99, 0.05);
}

.search-input {
  border-color: rgba(8, 95, 99, 0.12);
  background-color: #fcfdfe;
}

.search-input:focus {
  background-color: #ffffff;
}

.scroll-container {
  overflow-y: auto;
  max-height: 380px;
  padding-right: 4px;
}

/* Custom scrollbar styling */
.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(8, 95, 99, 0.2);
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(8, 95, 99, 0.4);
}

/* Contact row item design */
.affiliate-item-card {
  background-color: #fcfdfe;
  border: 1px solid rgba(8, 95, 99, 0.06);
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.affiliate-item-card:hover {
  background-color: rgba(73, 190, 183, 0.05);
  border-color: rgba(73, 190, 183, 0.25);
  transform: translateY(-1px);
}

.affiliate-name {
  font-size: 14.5px;
  font-weight: 600;
  color: #2c3e50;
}

.affiliate-account {
  letter-spacing: 0.2px;
}

.badge-alias-outline {
  border: 1px solid rgba(73, 190, 183, 0.35);
  color: #129a90;
  background-color: rgba(73, 190, 183, 0.04);
  font-weight: 500;
  font-size: 11px;
  border-radius: 8px;
  padding: 6px 10px;
  letter-spacing: 0.2px;
}

/* Confirmation modal details styling */
.confirm-details-card {
  background-color: #f8fafd;
  border: 1px solid rgba(8, 95, 99, 0.06);
}

.uppercase-label {
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 10px !important;
}

.text-dark-blue {
  color: #2c3e50;
}
</style>
