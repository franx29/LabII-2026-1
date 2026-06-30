<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoBanco from '@/assets/logo-no-background.png'
import authApi from '@/api/auth'

const router = useRouter()

const nombre = ref('')
const apellido = ref('')
const tipoDoc = ref('V')
const numeroDoc = ref('')
const email = ref('')
const fechaNacimiento = ref('')
const telefono = ref('')
const password = ref('')
const confirmPassword = ref('')

const mostrarPassword = ref(false)
const mostrarConfirmPassword = ref(false)

const fechaNacInputRef = ref(null)
const abrirDatePicker = () => {
  if (fechaNacInputRef.value) {
    try {
      fechaNacInputRef.value.showPicker()
    } catch (e) {
      fechaNacInputRef.value.focus()
    }
  }
}

const errors = ref({
  nombre: '',
  apellido: '',
  cedulaRif: '',
  email: '',
  fechaNacimiento: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const mensajeStatus = ref('')
const mensajeTipo = ref('')
const isLoading = ref(false)

const validarNombre = () => {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  if (!nombre.value.trim()) {
    errors.value.nombre = 'El nombre es obligatorio.'
  } else if (!regex.test(nombre.value)) {
    errors.value.nombre = 'El nombre solo debe contener letras.'
  } else if (nombre.value.trim().length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres.'
  } else {
    errors.value.nombre = ''
  }
}

const validarApellido = () => {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  if (!apellido.value.trim()) {
    errors.value.apellido = 'El apellido es obligatorio.'
  } else if (!regex.test(apellido.value)) {
    errors.value.apellido = 'El apellido solo debe contener letras.'
  } else if (apellido.value.trim().length < 2) {
    errors.value.apellido = 'El apellido debe tener al menos 2 caracteres.'
  } else {
    errors.value.apellido = ''
  }
}

const formatNumeroDoc = () => {
  let val = numeroDoc.value.replace(/[^0-9-]/g, '')
  if (tipoDoc.value === 'V' || tipoDoc.value === 'E') {
    val = val.replace(/-/g, '')
  }
  numeroDoc.value = val
}

const validarCedulaRif = () => {
  formatNumeroDoc()
  const val = numeroDoc.value.trim()
  if (!val) {
    errors.value.cedulaRif = 'El número de documento es obligatorio.'
    return
  }

  const isCedula = tipoDoc.value === 'V' || tipoDoc.value === 'E'
  if (isCedula) {
    const regex = /^\d{7,9}$/
    if (!regex.test(val)) {
      errors.value.cedulaRif = 'La cédula debe contener solo números (7 a 9 dígitos).'
    } else {
      errors.value.cedulaRif = ''
    }
  } else {
    const regex = /^\d{7,9}(-\d)?$/
    if (!regex.test(val)) {
      errors.value.cedulaRif = 'Formato inválido. Ej: 12345678-9 o 12345678.'
    } else {
      errors.value.cedulaRif = ''
    }
  }
}

const validarEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = 'El correo electrónico es obligatorio.'
  } else if (!regex.test(email.value)) {
    errors.value.email = 'Ingresa un correo electrónico válido (correo@ejemplo.com).'
  } else {
    errors.value.email = ''
  }
}

const validarFechaNacimiento = () => {
  if (!fechaNacimiento.value) {
    errors.value.fechaNacimiento = 'La fecha de nacimiento es obligatoria.'
    return
  }

  const fechaSeleccionada = new Date(fechaNacimiento.value)
  const hoy = new Date()
  
  if (fechaSeleccionada > hoy) {
    errors.value.fechaNacimiento = 'La fecha de nacimiento no puede ser del futuro.'
    return
  }

  let edad = hoy.getFullYear() - fechaSeleccionada.getFullYear()
  const mes = hoy.getMonth() - fechaSeleccionada.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaSeleccionada.getDate())) {
    edad--
  }

  if (edad < 18) {
    errors.value.fechaNacimiento = 'Debes ser mayor de edad (18 años) para registrarte.'
  } else {
    errors.value.fechaNacimiento = ''
  }
}

const validarTelefono = () => {
  const regex = /^\+?[\d\s-]{10,16}$/
  if (!telefono.value.trim()) {
    errors.value.telefono = 'El teléfono es obligatorio.'
  } else if (!regex.test(telefono.value)) {
    errors.value.telefono = 'Formato inválido. Ej: +58 412 1234567 o 04121234567.'
  } else {
    errors.value.telefono = ''
  }
}

const validarPassword = () => {
  if (!password.value) {
    errors.value.password = 'La contraseña es obligatoria.'
  } else if (password.value.length < 6) {
    errors.value.password = 'Debe tener al menos 6 caracteres.'
  } else {
    errors.value.password = ''
  }
  if (confirmPassword.value) {
    validarConfirmPassword()
  }
}

const validarConfirmPassword = () => {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Es necesario confirmar la contraseña.'
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden.'
  } else {
    errors.value.confirmPassword = ''
  }
}

const submitRegister = async () => {
  validarNombre()
  validarApellido()
  validarCedulaRif()
  validarEmail()
  validarFechaNacimiento()
  validarTelefono()
  validarPassword()
  validarConfirmPassword()

  const tieneErrores = Object.values(errors.value).some(err => err !== '')
  if (tieneErrores) {
    mensajeStatus.value = 'Fallo: Por favor corrige los errores del formulario.'
    mensajeTipo.value = 'error'
    return
  }

  isLoading.value = true
  mensajeStatus.value = ''
  mensajeTipo.value = ''

  const docNumber = `${tipoDoc.value}${numeroDoc.value.replace(/-/g, '').trim()}`
  const formattedBirthDate = fechaNacimiento.value ? `${fechaNacimiento.value}T00:00:00.000Z` : ''

  const userData = {
    first_name: nombre.value.trim(),
    last_name: apellido.value.trim(),
    document_number: docNumber,
    birth_date: formattedBirthDate,
    phone_number: telefono.value.trim(),
    email: email.value.trim(),
    password: password.value
  }

  try {
    const response = await authApi.register(userData)

    mensajeStatus.value = `Exito: ${response.data.message || 'Registro completado con éxito.'}`
    mensajeTipo.value = 'success'

    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (error) {
    console.error('Error al registrar usuario:', error)
    
    const errorMsg = error.response?.data?.message || error.message || 'No se pudo registrar el usuario en el servidor.'
    mensajeStatus.value = `Fallo: ${errorMsg}`
    mensajeTipo.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page-wrapper">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="register-container">
      <div class="brand-logo-card">
        <a href="/">
          <img :src="logoBanco" alt="Banco Universitario Logo" class="brand-logo" /></a>
      </div>

      <header class="register-header">
        <h1>Crear Nueva Cuenta</h1>
        <p class="subtitle">Completa el formulario para registrarte</p>
      </header>

      <div class="register-card">
        
        <Transition name="fade">
          <div 
            v-if="mensajeStatus" 
            class="status-alert" 
            :class="mensajeTipo === 'success' ? 'alert-success-custom' : 'alert-danger-custom'"
          >
            <i :class="mensajeTipo === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
            <span>{{ mensajeStatus }}</span>
          </div>
        </Transition>

        <form class="register-form" @submit.prevent="submitRegister">
          
          <div class="row g-3">
            
            <div class="col-md-6 col-12 input-group">
              <label for="nombre">Nombre</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.nombre }">
                <span class="input-icon"><i class="bi bi-person"></i></span>
                <input 
                  id="nombre"
                  v-model="nombre"
                  type="text" 
                  placeholder="Ingresa tu nombre"
                  @blur="validarNombre"
                  :disabled="isLoading"
                />
              </div>
              <span v-if="errors.nombre" class="error-message">{{ errors.nombre }}</span>
            </div>

            <div class="col-md-6 col-12 input-group">
              <label for="apellido">Apellido</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.apellido }">
                <span class="input-icon"><i class="bi bi-person"></i></span>
                <input 
                  id="apellido"
                  v-model="apellido"
                  type="text" 
                  placeholder="Ingresa tu apellido"
                  @blur="validarApellido"
                  :disabled="isLoading"
                />
              </div>
              <span v-if="errors.apellido" class="error-message">{{ errors.apellido }}</span>
            </div>

            <div class="col-12 input-group">
              <label for="cedula">Cédula / RIF</label>
              <div class="d-flex gap-2">
                <div class="select-wrapper">
                  <select 
                    v-model="tipoDoc" 
                    class="form-select doc-select"
                    :disabled="isLoading"
                    @change="validarCedulaRif"
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                    <option value="P">P</option>
                  </select>
                </div>
                <div class="input-wrapper flex-grow-1" :class="{ 'input-error-border': errors.cedulaRif }">
                  <span class="input-icon"><i class="bi bi-card-text"></i></span>
                  <input 
                    id="cedula"
                    v-model="numeroDoc"
                    type="text" 
                    placeholder="Ej: 26141319 o 12345678-9"
                    @blur="validarCedulaRif"
                    @input="formatNumeroDoc"
                    :disabled="isLoading"
                  />
                </div>
              </div>
              <span v-if="errors.cedulaRif" class="error-message">{{ errors.cedulaRif }}</span>
            </div>

            <div class="col-12 input-group">
              <label for="email">Correo Electrónico</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.email }">
                <span class="input-icon"><i class="bi bi-envelope"></i></span>
                <input 
                  id="email"
                  v-model="email"
                  type="email" 
                  placeholder="correo@ejemplo.com"
                  @blur="validarEmail"
                  :disabled="isLoading"
                />
              </div>
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="col-md-6 col-12 input-group">
              <label for="fechaNac">Fecha de Nacimiento</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.fechaNacimiento }">
                <input 
                  id="fechaNac"
                  ref="fechaNacInputRef"
                  v-model="fechaNacimiento"
                  type="date" 
                  @blur="validarFechaNacimiento"
                  :disabled="isLoading"
                  class="date-input-native"
                />
              </div>
              <span v-if="errors.fechaNacimiento" class="error-message">{{ errors.fechaNacimiento }}</span>
            </div>

            <div class="col-md-6 col-12 input-group">
              <label for="telefono">Teléfono</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.telefono }">
                <span class="input-icon"><i class="bi bi-telephone"></i></span>
                <input 
                  id="telefono"
                  v-model="telefono"
                  type="text" 
                  placeholder="Ej: +58 412 1234567"
                  @blur="validarTelefono"
                  :disabled="isLoading"
                />
              </div>
              <span v-if="errors.telefono" class="error-message">{{ errors.telefono }}</span>
            </div>

            <div class="col-md-6 col-12 input-group">
              <label for="password">Contraseña</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.password }">
                <span class="input-icon"><i class="bi bi-lock"></i></span>
                <input 
                  id="password"
                  v-model="password"
                  :type="mostrarPassword ? 'text' : 'password'" 
                  placeholder="Crea una contraseña segura"
                  @blur="validarPassword"
                  :disabled="isLoading"
                />
                <span class="toggle-password" @click="mostrarPassword = !mostrarPassword">
                  <i :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>

            <div class="col-md-6 col-12 input-group">
              <label for="confirmPassword">Confirmar Contraseña</label>
              <div class="input-wrapper" :class="{ 'input-error-border': errors.confirmPassword }">
                <span class="input-icon"><i class="bi bi-lock"></i></span>
                <input 
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="mostrarConfirmPassword ? 'text' : 'password'" 
                  placeholder="Confirma tu contraseña"
                  @blur="validarConfirmPassword"
                  :disabled="isLoading"
                />
                <span class="toggle-password" @click="mostrarConfirmPassword = !mostrarConfirmPassword">
                  <i :class="mostrarConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>
              <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
            </div>

          </div>

          <button type="submit" class="btn-submit mt-3" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Registrando...' : 'Finalizar Registro' }}
          </button>
        </form>

        <div class="register-footer-links">
          <p>¿Ya tienes cuenta? <router-link to="/login" class="link-highlight">Inicia sesión</router-link></p>
        </div>
      </div>

      <router-link to="/" class="back-link">
        <i class="bi bi-arrow-left"></i> Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.auth-page-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fbfb;
  overflow: hidden;
  padding: 40px 20px;
  z-index: 1;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.35;
  pointer-events: none;
  z-index: -1;
}

.orb-1 {
  width: 380px;
  height: 380px;
  background-color: #49beb7;
  top: -120px;
  left: -80px;
}

.orb-2 {
  width: 450px;
  height: 450px;
  background-color: #085f63;
  bottom: -150px;
  right: -100px;
}

.orb-3 {
  width: 320px;
  height: 320px;
  background-color: #d8f3f1;
  top: 35%;
  left: 65%;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 520px;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.8s ease-out;
}

.brand-logo-card {
  background: #ffffff;
  padding: 12px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.04);
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(73, 190, 183, 0.08);
}

.brand-logo {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.register-header {
  text-align: center;
  margin-bottom: 24px;
}

.register-header h1 {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 24px;
  color: #085f63;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 13.5px;
  color: #7c8e96;
  font-weight: 500;
  margin: 0;
}

.register-card {
  background-color: #f6f8fb;
  width: 100%;
  padding: 36px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.05);
  border: 1px solid rgba(73, 190, 183, 0.1);
  display: flex;
  flex-direction: column;
}

.status-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
}

.alert-success-custom {
  background-color: #e6f7f4;
  color: #0a6b5c;
  border: 1px solid rgba(10, 107, 92, 0.15);
}

.alert-danger-custom {
  background-color: #fdf2f2;
  color: #9b1c1c;
  border: 1px solid rgba(155, 28, 28, 0.15);
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 12.5px;
  font-weight: 500;
  color: #4e5d65;
  margin-bottom: 6px;
  text-align: left;
}

.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #d4dfdf;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #49beb7;
  box-shadow: 0 0 0 3px rgba(73, 190, 183, 0.15);
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #8fa0a8;
  font-size: 18px;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.toggle-password {
  position: absolute;
  right: 14px;
  color: #8fa0a8;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #085f63;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-size: 13.5px;
  outline: none;
  color: #334148;
}

.input-wrapper input.date-input {
  padding-left: 14px;
  padding-right: 14px;
}

.input-wrapper input::placeholder {
  color: #a4b4bc;
}

.error-message {
  color: #dc2626;
  font-size: 11px;
  font-weight: 500;
  margin-top: 5px;
  text-align: left;
  animation: slideDown 0.2s ease;
}

.input-error-border {
  border-color: #dc2626 !important;
}

.input-error-border:focus-within {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

.btn-submit {
  width: 100%;
  padding: 13.5px;
  background: linear-gradient(135deg, #49beb7, #085f63);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.15);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(8, 95, 99, 0.25);
  background: linear-gradient(135deg, #42b2ab, #075255);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-footer-links {
  display: flex;
  justify-content: center;
  margin-top: 22px;
  font-size: 13px;
}

.register-footer-links p {
  margin: 0;
  color: #5d6e76;
}

.link-highlight {
  color: #49beb7;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link-highlight:hover {
  color: #085f63;
  text-decoration: underline;
}

.back-link {
  margin-top: 24px;
  font-size: 13.5px;
  color: #5d6e76;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  color: #085f63;
  transform: translateX(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.doc-select {
  width: 75px;
  min-width: 75px;
  padding: 12px 28px 12px 14px;
  border: 1px solid #d4dfdf;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  color: #085f63;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23085f63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.doc-select:focus {
  border-color: #49beb7;
  box-shadow: 0 0 0 3px rgba(73, 190, 183, 0.15);
}

.date-input-native {
  padding-left: 14px !important;
}

@media (max-width: 768px) {
  .register-card {
    padding: 30px 24px;
    border-radius: 16px;
  }
  .orb-1 {
    width: 250px;
    height: 250px;
  }
  .orb-2 {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 480px) {
  .auth-page-wrapper {
    padding: 20px 12px;
  }
  .register-card {
    padding: 24px 16px;
    border-radius: 12px;
  }
  .register-header h1 {
    font-size: 20px;
  }
  .subtitle {
    font-size: 12px;
  }
  .brand-logo-card {
    padding: 10px 20px;
    margin-bottom: 16px;
  }
}
</style>
