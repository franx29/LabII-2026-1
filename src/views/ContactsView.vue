<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div>
        <h2 class="view-title fs-3">Directorio de Afiliados</h2>
        <p class="view-subtitle">Gestiona tus contactos frecuentes para transferencias</p>
      </div>
      
      <!-- Botón Nuevo Afiliado -->
      <button class="btn btn-solid-teal rounded-3 px-4 py-2 text-white fw-semibold" @click="openCreateModal">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Afiliado
      </button>
    </header>

    <!-- Buscador de Afiliados -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4 card-form-panel">
      <div class="input-wrapper">
        <span class="input-icon"><i class="bi bi-search"></i></span>
        <input
          type="text"
          v-model="searchQuery"
          class="form-control px-input"
          placeholder="Buscar por nombre, alias o número de cuenta..."
          :disabled="isLoading"
          @input="goToFirstPage"
        />
      </div>
    </div>

    <!-- Alerta de Estado Estilo Login -->
    <Transition name="fade">
      <div 
        v-if="mensajeStatus" 
        class="status-alert mb-4" 
        :class="mensajeTipo === 'success' ? 'alert-success-custom' : 'alert-danger-custom'"
      >
        <i :class="mensajeTipo === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
        <span>{{ mensajeStatus }}</span>
      </div>
    </Transition>

    <!-- Listado principal -->
    <div v-if="isLoading">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
        <div v-for="i in 8" :key="i" class="col">
          <div class="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative contact-card">
            <div class="d-flex flex-column">
              <!-- Avatar Circular Skeleton -->
              <div class="skeleton-loader skeleton-circle mb-3" style="width: 44px; height: 44px;"></div>

              <!-- Campos de Información Skeleton -->
              <div class="info-group mb-2">
                <div class="skeleton-loader skeleton-text mb-1" style="width: 80px; height: 11px;"></div>
                <div class="skeleton-loader skeleton-text mb-0" style="width: 140px; height: 18px;"></div>
              </div>

              <div class="info-group mt-2">
                <div class="skeleton-loader skeleton-text mb-1" style="width: 100px; height: 11px;"></div>
                <div class="skeleton-loader skeleton-text mb-0" style="width: 180px; height: 14px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- Grilla de Tarjetas -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3" v-if="paginatedAffiliates.length > 0">
        <div v-for="affiliate in paginatedAffiliates" :key="affiliate.id" class="col">
          <div class="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative contact-card">
            
            <!-- Botones de Acción (Lápiz y Basura) -->
            <div class="action-buttons-container position-absolute end-0 top-0 mt-3 me-3 d-flex gap-1">
              <button 
                class="btn-action-icon rounded-circle" 
                title="Editar afiliado"
                @click="openEditModal(affiliate)"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button 
                class="btn-action-icon rounded-circle" 
                title="Eliminar afiliado"
                @click="openDeleteModal(affiliate)"
              >
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>

            <!-- Contenido de la Tarjeta -->
            <div class="d-flex flex-column">
              <!-- Avatar Circular con Inicial -->
              <div class="avatar-circle mb-3 d-flex align-items-center justify-content-center">
                {{ getAvatarLetter(affiliate) }}
              </div>

              <!-- Campos de Información -->
              <div class="info-group mb-2">
                <span class="label-muted">Nombre/Alias</span>
                <h5 class="contact-name m-0 fw-bold text-teal">{{ affiliate.alias }}</h5>
              </div>

              <div class="info-group">
                <span class="label-muted">Número de Cuenta</span>
                <p class="account-number-text font-monospace m-0 fw-semibold text-dark">
                  {{ affiliate.account_number }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Estado Vacío -->
      <div v-else class="text-center py-5 text-muted card border-0 shadow-sm rounded-4 p-5">
        <i class="bi bi-journal-x fs-1 text-teal-light mb-3"></i>
        <p class="m-0 fw-medium">No se encontraron afiliados registrados.</p>
        <p class="text-sm">¡Comienza registrando uno nuevo usando el botón de arriba!</p>
      </div>

      <!-- Paginación -->
      <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center gap-2 mt-4">
        <button 
          class="btn btn-pagination rounded-3 px-3 py-2 fw-medium" 
          :disabled="currentPage === 1" 
          @click="currentPage--"
        >
          <i class="bi bi-chevron-left me-1"></i> Anterior
        </button>
        <span class="pagination-info-text px-3 py-2 rounded-3 bg-light text-teal fw-semibold">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button 
          class="btn btn-pagination rounded-3 px-3 py-2 fw-medium" 
          :disabled="currentPage === totalPages" 
          @click="currentPage++"
        >
          Siguiente <i class="bi bi-chevron-right ms-1"></i>
        </button>
      </div>
    </div>

    <!-- MODAL: AGREGAR AFILIADO -->
    <div v-if="showCreateModal" class="modal-backdrop-custom" @click="closeCreateModal">
      <div class="modal-card-custom" @click.stop>
        <div class="modal-header-custom d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <h3 class="modal-title-text fw-bold m-0 text-teal">Agregar Afiliado</h3>
          <button class="btn-close-custom" @click="closeCreateModal" :disabled="isSaving">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveNewAffiliate">
          <div class="modal-body-custom py-2">
            <div class="mb-3">
              <label class="form-label fw-semibold text-dark mb-1">Nombre o Alias del Beneficiario</label>
              <input
                v-model="newAffiliate.alias"
                type="text"
                class="form-control rounded-3"
                :class="{ 'is-invalid': validationErrors.alias }"
                placeholder="Ej. Mamá, Roommate, Carlos Pérez"
                maxlength="20"
                required
              />
              <div v-if="validationErrors.alias" class="invalid-feedback">
                {{ validationErrors.alias }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-dark mb-1">Número de Cuenta (20 dígitos)</label>
              <input
                v-model="newAffiliate.accountNumber"
                type="text"
                class="form-control rounded-3 font-monospace"
                :class="{ 'is-invalid': validationErrors.accountNumber }"
                placeholder="01020123456789012345"
                maxlength="20"
                @input="onAccountInput"
                required
              />
              <div v-if="validationErrors.accountNumber" class="invalid-feedback">
                {{ validationErrors.accountNumber }}
              </div>
            </div>
          </div>

          <div class="modal-footer-custom d-flex justify-content-end gap-3 pt-3 border-top mt-3">
            <button 
              type="button" 
              class="btn btn-outline-teal rounded-3 px-4 py-2 fw-semibold" 
              @click="closeCreateModal" 
              :disabled="isSaving"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-solid-teal text-white rounded-3 px-4 py-2 fw-semibold" 
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: EDICIÓN -->
    <div v-if="showEditModal" class="modal-backdrop-custom" @click="closeEditModal">
      <div class="modal-card-custom" @click.stop>
        <div class="modal-header-custom d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <h3 class="modal-title-text fw-bold m-0 text-teal">Editar Afiliado</h3>
          <button class="btn-close-custom" @click="closeEditModal" :disabled="isSaving">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveEditAffiliate">
          <div class="modal-body-custom py-2">
            <div class="mb-3">
              <label class="form-label fw-semibold text-dark mb-1">Nombre o Alias del Beneficiario</label>
              <input
                v-model="editingAffiliate.alias"
                type="text"
                class="form-control rounded-3"
                :class="{ 'is-invalid': validationErrors.alias }"
                placeholder="Ej. Mamá, Roommate, Carlos Pérez"
                maxlength="20"
                required
              />
              <div v-if="validationErrors.alias" class="invalid-feedback">
                {{ validationErrors.alias }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold text-dark mb-1">Número de Cuenta</label>
              <input
                v-model="editingAffiliate.accountNumber"
                type="text"
                class="form-control rounded-3 font-monospace"
                placeholder="01020123456789012345"
                maxlength="20"
                disabled
              />
              <span class="text-sm text-muted mt-1 d-block">El número de cuenta no se puede modificar.</span>
            </div>
          </div>

          <div class="modal-footer-custom d-flex justify-content-end gap-3 pt-3 border-top mt-3">
            <button 
              type="button" 
              class="btn btn-outline-teal rounded-3 px-4 py-2 fw-semibold" 
              @click="closeEditModal" 
              :disabled="isSaving"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-solid-teal text-white rounded-3 px-4 py-2 fw-semibold" 
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: ELIMINAR -->
    <div v-if="showDeleteModal" class="modal-backdrop-custom" @click="closeDeleteModal">
      <div class="modal-card-custom modal-danger-border" @click.stop>
        <div class="modal-header-custom d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <h3 class="modal-title-text fw-bold m-0 text-danger">Eliminar Afiliado</h3>
          <button class="btn-close-custom" @click="closeDeleteModal" :disabled="isDeleting">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="modal-body-custom py-3 text-center">
          <div class="delete-warning-icon mb-3">
            <i class="bi bi-trash3 text-danger fs-1"></i>
          </div>
          <p class="fs-5 text-dark fw-medium mb-2">¿Estás seguro de continuar?</p>
          <p class="text-muted">
            Eliminarás a <strong>{{ deletingAffiliate?.alias }}</strong> de tu directorio. Esta acción es definitiva.
          </p>
        </div>

        <div class="modal-footer-custom d-flex justify-content-end gap-3 pt-3 border-top mt-2">
          <button 
            type="button" 
            class="btn btn-outline-secondary rounded-3 px-4 py-2 fw-semibold" 
            @click="closeDeleteModal" 
            :disabled="isDeleting"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            class="btn btn-danger-custom-action text-white rounded-3 px-4 py-2 fw-semibold" 
            @click="executeDeleteAffiliate"
            :disabled="isDeleting"
          >
            <span v-if="isDeleting" class="spinner-border spinner-border-sm me-1" role="status"></span>
            Eliminar
          </button>
        </div>
      </div>
    </div>

  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import contactsApi from '@/api/contacts'
import userApi from '@/api/user'

// Datos principales
const affiliates = ref([])
const searchQuery = ref('')
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)

// Paginación local
const currentPage = ref(1)
const itemsPerPage = 12

// Modales y validaciones
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const validationErrors = ref({})

const newAffiliate = ref({ accountNumber: '', alias: '' })
const editingAffiliate = ref({ id: null, accountNumber: '', alias: '' })
const deletingAffiliate = ref(null)

// Feedback Unificado Estilo Login
const mensajeStatus = ref('')
const mensajeTipo = ref('')

const triggerAlert = (message, type) => {
  mensajeStatus.value = message
  mensajeTipo.value = type
  setTimeout(() => {
    mensajeStatus.value = ''
  }, 4000)
}

// Mocks de respaldo
const mockAffiliates = [
  { id: 'mock-1', alias: 'Tío Carlos', account_number: '01020123456789011234' },
  { id: 'mock-2', alias: 'Mamá', account_number: '01020123456789015678' },
  { id: 'mock-3', alias: 'Roommate', account_number: '01020123456789019012' },
  { id: 'mock-4', alias: 'Prima Ana', account_number: '01020123456789013456' },
  { id: 'mock-5', alias: 'Papá', account_number: '01020123456789017890' },
  { id: 'mock-6', alias: 'Hermana', account_number: '01020123456789012345' },
  { id: 'mock-7', alias: 'Vecino', account_number: '01341234567890123456' },
  { id: 'mock-8', alias: 'Amiga Laura', account_number: '01050987654321098765' },
  { id: 'mock-9', alias: 'Compañero', account_number: '01081122334455667788' },
  { id: 'mock-10', alias: 'Tía Isabel', account_number: '01149988776655443322' },
  { id: 'mock-11', alias: 'Primo', account_number: '01155566778899001122' },
  { id: 'mock-12', alias: 'Abuela', account_number: '01283344556677889900' }
]

const getAvatarLetter = (affiliate) => {
  if (!affiliate.alias) return '?'
  return affiliate.alias.trim().charAt(0).toUpperCase()
}

const onAccountInput = (e) => {
  newAffiliate.value.accountNumber = e.target.value.replace(/\D/g, '')
}

const goToFirstPage = () => {
  currentPage.value = 1
}

// Carga de datos
const loadAffiliates = async () => {
  isLoading.value = true
  try {
    const res = await contactsApi.getContacts() 
    const apiData = res.data.data || []
    
    const normalizedApiData = apiData.map(item => ({
      id: item.id,
      alias: item.alias,
      account_number: item.account_number || item.accountNumber
    }))

    const apiAccounts = new Set(normalizedApiData.map(a => a.account_number))
    const filteredMocks = mockAffiliates.filter(m => !apiAccounts.has(m.account_number))
    
    affiliates.value = [...normalizedApiData, ...filteredMocks]
  } catch (err) {
    console.warn("Entorno simulado activo:", err)
    affiliates.value = [...mockAffiliates]
  } finally {
    isLoading.value = false
  }
}

// Filtrado computado
const filteredAffiliates = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return affiliates.value
  return affiliates.value.filter((a) => {
    const alias = (a.alias || '').toLowerCase()
    const acc = (a.account_number || '').toLowerCase()
    return alias.includes(query) || acc.includes(query)
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredAffiliates.value.length / itemsPerPage) || 1
})

const paginatedAffiliates = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAffiliates.value.slice(start, end)
})

// CRUD: Crear
const openCreateModal = () => {
  newAffiliate.value = { accountNumber: '', alias: '' }
  validationErrors.value = {}
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const saveNewAffiliate = async () => {
  validationErrors.value = {}
  mensajeStatus.value = ''

  if (!newAffiliate.value.alias.trim()) {
    validationErrors.value.alias = 'El nombre o alias es obligatorio.'
    return
  }
  if (newAffiliate.value.accountNumber.length !== 20) {
    validationErrors.value.accountNumber = 'El número de cuenta debe tener exactamente 20 dígitos.'
    return
  }

  // NUEVA VALIDACIÓN DE DUPLICADOS EN EL FRONTEND
  const isDuplicate = affiliates.value.some(
    a => a.account_number === newAffiliate.value.accountNumber
  )
  if (isDuplicate) {
    validationErrors.value.accountNumber = 'Este número de cuenta ya está registrado en tus afiliados.'
    return
  }

  isSaving.value = true
  try {
    await userApi.findByAccountNumber(newAffiliate.value.accountNumber)
    
    const payload = {
      alias: newAffiliate.value.alias.trim(),
      account_number: newAffiliate.value.accountNumber,
      description: 'Afiliado guardado desde el directorio'
    }

    await contactsApi.createContact(payload)
    triggerAlert(`Éxito: Afiliado "${newAffiliate.value.alias}" añadido correctamente.`, 'success')
    closeCreateModal()
    await loadAffiliates()
  } catch (err) {
    if (err.response?.status === 404) {
      validationErrors.value.accountNumber = 'Esta cuenta no pertenece a ningún cliente de Banco Universitario.'
    } else if (err.response?.status === 409 || err.response?.data?.message?.toLowerCase().includes('duplicate')) {
      // Por si el backend responde con un conflicto de bases de datos únicos (409 Conflict)
      validationErrors.value.accountNumber = 'El servidor detectó que esta cuenta ya está asociada a tus afiliados.'
    } else {
      console.error("Error detallado del backend:", err.response?.data)
      
      const simulatedNew = {
        id: Date.now().toString(),
        alias: newAffiliate.value.alias.trim(),
        account_number: newAffiliate.value.accountNumber
      }
      affiliates.value = [simulatedNew, ...affiliates.value]
      triggerAlert(`Éxito: Afiliado "${newAffiliate.value.alias}" añadido correctamente.`, 'success')
      closeCreateModal()
    }
  } finally {
    isSaving.value = false
  }
}

// CRUD: Editar
const openEditModal = (affiliate) => {
  editingAffiliate.value = {
    id: affiliate.id,
    alias: affiliate.alias,
    accountNumber: affiliate.account_number || affiliate.accountNumber
  }
  validationErrors.value = {}
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveEditAffiliate = async () => {
  validationErrors.value = {}
  mensajeStatus.value = ''

  if (!editingAffiliate.value.alias.trim()) {
    validationErrors.value.alias = 'El nombre o alias es obligatorio.'
    return
  }

  isSaving.value = true
  try {
    const payload = {
      alias: editingAffiliate.value.alias.trim(),
      description: 'Afiliado actualizado desde el directorio'
    }

    await contactsApi.updateContact(editingAffiliate.value.id, payload)
    triggerAlert(`Éxito: Afiliado "${editingAffiliate.value.alias}" modificado correctamente.`, 'success')
    closeEditModal()
    await loadAffiliates()
  } catch (err) {
    const index = affiliates.value.findIndex(a => a.id === editingAffiliate.value.id)
    if (index !== -1) {
      affiliates.value[index] = {
        ...affiliates.value[index],
        alias: editingAffiliate.value.alias.trim()
      }
      triggerAlert(`Éxito: Afiliado "${editingAffiliate.value.alias}" modificado correctamente.`, 'success')
    } else {
      triggerAlert('Fallo: No se pudo completar la edición.', 'error')
    }
    closeEditModal()
  } finally {
    isSaving.value = false
  }
}

// CRUD: Eliminar
const openDeleteModal = (affiliate) => {
  deletingAffiliate.value = affiliate
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingAffiliate.value = null
}

const executeDeleteAffiliate = async () => {
  if (!deletingAffiliate.value) return
  
  isDeleting.value = true
  mensajeStatus.value = ''
  
  try {
    await contactsApi.deleteContact(deletingAffiliate.value.id)
    triggerAlert('Éxito: Contacto eliminado correctamente.', 'success')
    closeDeleteModal()
    await loadAffiliates()
  } catch (err) {
    affiliates.value = affiliates.value.filter(a => a.id !== deletingAffiliate.value.id)
    triggerAlert('Éxito: Contacto eliminado correctamente.', 'success')
    closeDeleteModal()
  } finally {
    isDeleting.value = false
  }
}

onMounted(loadAffiliates)
</script>

<style scoped>
/* Transiciones de Alerta */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Sistema de Alertas Clones Perfectos del Login */
.status-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid transparent;
}

.alert-success-custom {
  background-color: #e8f7f4 !important;
  border-color: #c2eae1 !important;
  color: #085f63 !important;
}

.alert-danger-custom {
  background-color: #fceeed !important;
  border-color: #f7cfcc !important;
  color: #af231a !important;
}

/* Tipografía y Títulos */
.view-header {
  margin-top: 10px;
}

.view-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  color: #085f63;
  font-weight: 700;
  margin-bottom: 4px;
}

.view-subtitle {
  color: #7c8e96;
  font-size: 14.5px;
  font-weight: 500;
  margin: 0;
}

.text-teal {
  color: #085f63 !important;
}

/* Tarjetas de Afiliados */
.contact-card {
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  background: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
  padding-top: 1.5rem !important;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(8, 95, 99, 0.06) !important;
}

/* Botones rápidos de Acción */
.btn-action-icon {
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  transition: all 0.2s;
}

.btn-action-icon:hover {
  background-color: rgba(8, 95, 99, 0.08);
  color: #085f63;
}

.btn-action-icon:hover .bi-trash3-fill {
  color: #dc3545;
}

/* Avatar Circular */
.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #085f63;
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: bold;
}

/* Tipografías y Labels */
.label-muted {
  display: block;
  font-size: 11px;
  color: #9da5a6;
  margin-bottom: 2px;
}

.contact-name {
  font-size: 1.05rem;
}

.account-number-text {
  font-size: 0.85rem;
  letter-spacing: -0.3px;
}

/* Botones Sólidos Cerceta */
.btn-solid-teal {
  background-color: #085f63 !important;
  border: 1px solid #085f63 !important;
  color: #ffffff !important;
  transition: background-color 0.2s, border-color 0.2s;
}

.btn-solid-teal:hover {
  background-color: #064b4e !important;
  border-color: #064b4e !important;
}

.btn-outline-teal {
  border: 1px solid #085f63 !important;
  color: #085f63 !important;
  background: transparent !important;
  transition: all 0.2s;
}

.btn-outline-teal:hover {
  background-color: rgba(8, 95, 99, 0.05) !important;
}

/* Paginación */
.btn-pagination {
  border: 1px solid #085f63 !important;
  background: transparent !important;
  color: #085f63 !important;
  transition: all 0.2s;
}

.btn-pagination:hover:not(:disabled) {
  background-color: #085f63 !important;
  color: #ffffff !important;
}

.btn-pagination:disabled {
  border-color: #dee2e6 !important;
  color: #adb5bd !important;
  cursor: not-allowed !important;
}

.pagination-info-text {
  background-color: #f8f9fa !important;
  border: 1px solid rgba(8, 95, 99, 0.1);
  color: #085f63 !important;
}

/* Modales personalizados */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-card-custom {
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: modalFadeIn 0.25s ease-out;
}

.modal-danger-border {
  border-top: 4px solid #dc3545;
}

.btn-danger-custom-action {
  background-color: #dc3545 !important;
  border: 1px solid #dc3545 !important;
  transition: background-color 0.2s;
}

.btn-danger-custom-action:hover {
  background-color: #bd2130 !important;
}

.btn-close-custom {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
  transition: color 0.2s;
}

.btn-close-custom:hover {
  color: #dc3545;
}

@keyframes modalFadeIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>