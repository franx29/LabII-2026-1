<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-person fs-2 text-teal"></i>
        <h1 class="view-title m-0">Mi Perfil</h1>
      </div>
      <p class="view-subtitle">Gestiona tu información personal y configuración</p>
    </header>

    <!-- Estado de Error Global -->
    <div v-if="errorMsg" class="alert alert-danger-custom d-flex align-items-center gap-2 mb-4" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <div>{{ errorMsg }}</div>
    </div>

    <!-- Spinner de Carga -->
    <div v-if="isLoading" class="loader-container d-flex flex-column justify-content-center align-items-center py-5">
      <div class="spinner-border text-teal mb-3" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted">Cargando tu perfil...</p>
    </div>

    <!-- Contenido de Perfil -->
    <div v-else class="profile-content">
      <!-- Tarjeta Superior del Perfil (Resumen) -->
      <div class="profile-header-card rounded-4 p-4 mb-4 text-white position-relative overflow-hidden shadow-sm">
        <div class="profile-card-bg-decoration">
          <i class="bi bi-person-fill"></i>
        </div>
        <div class="position-relative z-3 d-flex align-items-center gap-3 gap-sm-4">
          <div class="profile-avatar-wrapper rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-person-fill fs-2"></i>
          </div>
          <div>
            <h2 class="profile-user-name mb-1">{{ user?.first_name }} {{ user?.last_name }}</h2>
            <span class="profile-client-since text-white-50 d-block">{{ formatRegistrationDate(user?.created_at) }}</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Datos Personales (Expande a toda la pantalla en Grid) -->
      <div class="card card-form-panel border-0 shadow-sm rounded-4 p-4 mb-4">
        <h3 class="panel-title d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-person-badge text-teal"></i> Datos Personales
        </h3>
        
        <div class="row g-4">
          <!-- Nombre Completo -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="nombreCompleto">Nombre Completo</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-person"></i></span>
              <input
                id="nombreCompleto"
                type="text"
                class="form-control px-input"
                :value="user ? `${user.first_name} ${user.last_name}` : ''"
                disabled
              />
            </div>
          </div>

          <!-- Correo Electrónico -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="correoElectronico">Correo Electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-envelope"></i></span>
              <input
                id="correoElectronico"
                type="email"
                class="form-control px-input"
                :value="user?.email || ''"
                disabled
              />
            </div>
          </div>

          <!-- Número de Cuenta -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="numeroCuenta">Número de Cuenta</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-credit-card"></i></span>
              <input
                id="numeroCuenta"
                type="text"
                class="form-control px-input font-monospace"
                :value="formatAccountNumber(user?.account_number)"
                disabled
              />
            </div>
          </div>

          <!-- Teléfono -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="telefono">Teléfono</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-telephone"></i></span>
              <input
                id="telefono"
                type="text"
                class="form-control px-input"
                :value="user?.phone_number || ''"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="mt-4 pt-2">
          <p class="notice-text mb-0">
            <i class="bi bi-info-circle me-1"></i>
            * Para modificar tus datos personales, contacta a servicio al cliente
          </p>
        </div>
      </div>

      <!-- Tarjeta de Cambiar Contraseña (Expande a toda la pantalla) -->
      <div class="card card-form-panel border-0 shadow-sm rounded-4 p-4 mb-4">
        <h3 class="panel-title d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-shield-lock text-teal"></i> Cambiar Contraseña
        </h3>

        <!-- Mensajes del formulario de cambio de contraseña -->
        <Transition name="fade">
          <div 
            v-if="changePasswordMsg" 
            class="alert mb-4 d-flex align-items-center gap-2"
            :class="changePasswordType === 'success' ? 'alert-success-custom' : 'alert-danger-custom'"
            role="alert"
          >
            <i :class="changePasswordType === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
            <div>{{ changePasswordMsg }}</div>
          </div>
        </Transition>

        <form @submit.prevent="handleSavePassword" class="row g-4">
          <!-- Datos para Autocompletado del Navegador (Evita popups molestos de guardado) -->
          <input
            type="text"
            name="username"
            :value="user?.email || ''"
            style="display: none;"
            autocomplete="username"
          />

          <!-- Contraseña Actual -->
          <div class="col-12">
            <label class="input-label" for="contrasenaActual">Contraseña Actual</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-lock"></i></span>
              <input
                id="contrasenaActual"
                v-model="oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                class="form-control px-input pe-5"
                placeholder="Ingresa tu contraseña actual"
                :disabled="isSaving"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="btn-toggle-password"
                @click="showOldPassword = !showOldPassword"
                :title="showOldPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <i class="bi" :class="showOldPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
            <span v-if="formErrors.oldPassword" class="error-feedback d-block">{{ formErrors.oldPassword }}</span>
          </div>

          <!-- Nueva Contraseña -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="nuevaContrasena">Nueva Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-lock"></i></span>
              <input
                id="nuevaContrasena"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                class="form-control px-input pe-5"
                placeholder="Ingresa tu nueva contraseña"
                :disabled="isSaving"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="btn-toggle-password"
                @click="showNewPassword = !showNewPassword"
                :title="showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <i class="bi" :class="showNewPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
            <span v-if="formErrors.newPassword" class="error-feedback d-block">{{ formErrors.newPassword }}</span>
          </div>

          <!-- Confirmar Contraseña -->
          <div class="col-12 col-md-6">
            <label class="input-label" for="confirmarContrasena">Confirmar Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-lock"></i></span>
              <input
                id="confirmarContrasena"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control px-input pe-5"
                placeholder="Confirma tu nueva contraseña"
                :disabled="isSaving"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="btn-toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
                :title="showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <i class="bi" :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </button>
            </div>
            <span v-if="formErrors.confirmPassword" class="error-feedback d-block">{{ formErrors.confirmPassword }}</span>
          </div>

          <!-- Botón de Envío -->
          <div class="col-12 d-flex justify-content-end mt-4">
            <button
              type="submit"
              class="btn btn-teal rounded-3 px-5 py-2 w-100"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isSaving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import userApi from '@/api/user'
import authApi from '@/api/auth'

const router = useRouter()

// Estados reactivos generales
const user = ref(null)
const isLoading = ref(true)
const errorMsg = ref('')

// Estados reactivos para cambio de contraseña
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isSaving = ref(false)
const changePasswordMsg = ref('')
const changePasswordType = ref('')

const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const formErrors = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Cargar información del usuario
const fetchUserData = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const res = await userApi.whoami()
    user.value = res.data.data
  } catch (err) {
    console.error('Error al cargar datos de perfil:', err)
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = err.response?.data?.message || 'Error al conectar con el servidor para obtener los datos de perfil.'
    }
  } finally {
    isLoading.value = false
  }
}

// Formatear fecha de registro: "Enero 2024"
const formatRegistrationDate = (dateStr) => {
  if (!dateStr) return 'Cliente desde Enero 2024'
  try {
    const date = new Date(dateStr)
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `Cliente desde ${month} ${year}`
  } catch (e) {
    return 'Cliente desde Enero 2024'
  }
}

// Formatear número de cuenta con guiones (XXXX-XXXX-XXXX-XXXX-XXXX)
const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '-'
  return accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4-$5')
}

// Validaciones locales
const validatePasswordForm = () => {
  let hasErrors = false
  formErrors.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  if (!oldPassword.value) {
    formErrors.value.oldPassword = 'La contraseña actual es obligatoria.'
    hasErrors = true
  }

  if (!newPassword.value) {
    formErrors.value.newPassword = 'La nueva contraseña es obligatoria.'
    hasErrors = true
  } else if (newPassword.value.length < 6) {
    formErrors.value.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres.'
    hasErrors = true
  }

  if (!confirmPassword.value) {
    formErrors.value.confirmPassword = 'Debes confirmar tu nueva contraseña.'
    hasErrors = true
  } else if (newPassword.value !== confirmPassword.value) {
    formErrors.value.confirmPassword = 'Las contraseñas no coinciden.'
    hasErrors = true
  }

  return !hasErrors
}

// Guardar nueva contraseña
const handleSavePassword = async () => {
  changePasswordMsg.value = ''
  changePasswordType.value = ''
  
  if (!validatePasswordForm()) {
    return
  }

  isSaving.value = true
  try {
    const res = await authApi.updatePasswordDirect(oldPassword.value, newPassword.value)
    changePasswordMsg.value = res.data.message || 'Contraseña actualizada con éxito.'
    changePasswordType.value = 'success'
    
    // Limpiar campos en caso de éxito
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    // Obtener el correo electrónico para pre-cargar en el login
    const emailToPrefill = user.value?.email

    // Cerrar sesión y redirigir con un retardo de 2 segundos
    localStorage.removeItem('token')
    setTimeout(() => {
      router.push({ path: '/login', query: { email: emailToPrefill } })
    }, 2000)
  } catch (err) {
    console.error('Error al actualizar contraseña:', err)
    changePasswordMsg.value = err.response?.data?.message || 'Error al cambiar la contraseña. Asegúrate de ingresar tu contraseña actual correcta.'
    changePasswordType.value = 'error'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchUserData()
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
}

.view-subtitle {
  color: #7c8e96;
  font-size: 14.5px;
  font-weight: 500;
  margin: 0;
  margin-top: 4px;
}

.loader-container {
  min-height: 300px;
}

.text-teal {
  color: #085f63;
}

/* Tarjeta superior del perfil */
.profile-header-card {
  background: linear-gradient(135deg, #085f63 0%, #129a90 100%);
  border: 1px solid rgba(73, 190, 183, 0.15);
}

.profile-card-bg-decoration {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  font-size: 160px;
  color: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  line-height: 1;
}

.profile-avatar-wrapper {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.25);
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  color: #ffffff;
}

.profile-user-name {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff !important;
}

.profile-client-since {
  font-size: 14px;
  font-weight: 500;
}

/* Paneles de datos y formularios */
.card-form-panel {
  background-color: #ffffff;
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.02) !important;
}

.panel-title {
  color: #085f63;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat Alternates', sans-serif !important;
}

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
  background-color: #ffffff;
}

.form-control:focus {
  border-color: #49beb7;
  box-shadow: 0 0 0 0.25rem rgba(73, 190, 183, 0.12);
  outline: 0;
}

.form-control:disabled {
  background-color: #f8fafb;
  color: #7c8e96;
  border-color: #edf2f2;
  opacity: 0.95;
}

.input-label {
  font-size: 13.5px;
  font-weight: 600;
  color: #4f5e66;
  margin-bottom: 6px;
}

.notice-text {
  font-size: 12.5px;
  color: #7c8e96;
  font-style: italic;
}

/* Botones */
.btn-teal {
  background-color: #085f63;
  color: #ffffff;
  border: 1px solid #085f63;
  font-weight: 600;
  padding: 10px 14px;
  transition: all 0.2s ease;
}

.btn-teal:hover:not(:disabled) {
  background-color: #129a90;
  border-color: #129a90;
}

/* Alertas personalizadas */
.alert-danger-custom {
  background-color: #fdf2f2;
  color: #9b1c1c;
  border: 1px solid rgba(155, 28, 28, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14.5px;
  font-weight: 500;
}

.alert-success-custom {
  background-color: #f3faf7;
  color: #03543f;
  border: 1px solid rgba(3, 84, 63, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14.5px;
  font-weight: 500;
}

.error-feedback {
  font-size: 12px;
  color: #dc3545;
  margin-top: 4px;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsividad para pantallas medianas/pequeñas */
@media (max-width: 768px) {
  .profile-avatar-wrapper {
    width: 60px;
    height: 60px;
  }
  .profile-user-name {
    font-size: 20px;
  }
}

/* Botón para ver/ocultar contraseñas */
.btn-toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7c8e96;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: color 0.2s ease;
}

.btn-toggle-password:hover {
  color: #085f63;
}

.pe-5 {
  padding-right: 48px !important;
}
</style>
