<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoBanco from '@/assets/logo-no-background.png'
import authApi from '@/api/auth'

const router = useRouter()

// Variables reactivas generales
const step = ref(1) // 1: Correo, 2: Código de seguridad, 3: Nueva contraseña
const email = ref('')
const errorEmail = ref('')
const isLoading = ref(false)

// Variables reactivas para el paso 2 (Código de Verificación)
const recoveryCode = ref('')
const errorRecoveryCode = ref('')

// Variables reactivas para el paso 3 (Nueva Contraseña)
const newPassword = ref('')
const confirmPassword = ref('')
const errorNewPassword = ref('')
const errorConfirmPassword = ref('')
const mostrarNewPassword = ref(false)
const mostrarConfirmPassword = ref(false)

// Mensajes de alerta generales
const mensajeStatus = ref('')
const mensajeTipo = ref('')

// Expresión regular para validar formato de correo electrónico
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// --- PASO 1: LÓGICA DE VALIDACIÓN Y ENVÍO DE CORREO ---
const validarEmail = () => {
  if (!email.value.trim()) {
    errorEmail.value = 'El correo electrónico es obligatorio.'
  } else if (!regexCorreo.test(email.value)) {
    errorEmail.value = 'Ingresa un formato de correo electrónico válido (ejemplo@dominio.com).'
  } else {
    errorEmail.value = ''
  }
}

const enviarCodigo = async () => {
  validarEmail()
  if (errorEmail.value) return

  isLoading.value = true
  mensajeStatus.value = ''
  mensajeTipo.value = ''

  try {
    // Intentar llamar al backend real
    await authApi.forgotPassword(email.value.trim())
    
    // Si la llamada tiene éxito (200 OK), avanzamos al Paso 2
    step.value = 2
  } catch (error) {
    console.error('API error (forgotPassword):', error)
    const errorMsg = error.response?.data?.message || error.message || 'Error al conectar con el servidor.'
    mensajeStatus.value = `Fallo: ${errorMsg}`
    mensajeTipo.value = 'error'
  } finally {
    isLoading.value = false
  }
}

// --- PASO 2: LÓGICA DE VERIFICACIÓN DE CÓDIGO ---
const validarRecoveryCode = () => {
  if (!recoveryCode.value.trim()) {
    errorRecoveryCode.value = 'El código de seguridad es obligatorio.'
  } else if (!/^\d{6}$/.test(recoveryCode.value.trim())) {
    errorRecoveryCode.value = 'El código debe constar de 6 dígitos numéricos.'
  } else {
    errorRecoveryCode.value = ''
  }
}

const verificarCodigo = () => {
  validarRecoveryCode()
  if (errorRecoveryCode.value) return

  isLoading.value = true
  mensajeStatus.value = ''
  mensajeTipo.value = ''

  // La validación real del código ocurrirá en el paso 3 al llamar a /reset-password,
  // por lo que aquí simplemente avanzamos al paso 3 de forma fluida.
  setTimeout(() => {
    isLoading.value = false
    step.value = 3
  }, 500)
}

// --- PASO 3: LÓGICA DE RESTABLECIMIENTO ---
const validarNewPassword = () => {
  if (!newPassword.value) {
    errorNewPassword.value = 'La contraseña es obligatoria.'
  } else if (newPassword.value.length < 8) {
    errorNewPassword.value = 'La contraseña debe tener al menos 8 caracteres.'
  } else if (newPassword.value.length > 16) {
    errorNewPassword.value = 'La contraseña no puede exceder los 16 caracteres.'
  } else {
    errorNewPassword.value = ''
  }
}

const validarConfirmPassword = () => {
  if (!confirmPassword.value) {
    errorConfirmPassword.value = 'Debes confirmar la contraseña.'
  } else if (newPassword.value !== confirmPassword.value) {
    errorConfirmPassword.value = 'Las contraseñas no coinciden.'
  } else {
    errorConfirmPassword.value = ''
  }
}

const restablecerContrasena = async () => {
  validarNewPassword()
  validarConfirmPassword()

  if (errorNewPassword.value || errorConfirmPassword.value) return

  isLoading.value = true
  mensajeStatus.value = ''
  mensajeTipo.value = ''

  // Llamar al endpoint público real /reset-password utilizando el código de recuperación ingresado
  try {
    await authApi.resetPassword(email.value.trim(), recoveryCode.value.trim(), newPassword.value)
    
    mensajeStatus.value = 'Éxito: Contraseña restablecida correctamente.'
    mensajeTipo.value = 'success'
    
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    console.error('API error (resetPassword):', error)
    
    // Si falló en la API, mostramos el error real del backend
    const errorMsg = error.response?.data?.message || error.message || 'Error al restablecer la contraseña.'
    mensajeStatus.value = `Fallo: ${errorMsg}`
    mensajeTipo.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const volverAlLogin = () => {
  router.push('/login')
}

const volverPasoAnterior = () => {
  mensajeStatus.value = ''
  mensajeTipo.value = ''
  if (step.value === 3) {
    step.value = 2
  } else if (step.value === 2) {
    step.value = 1
  }
}
</script>

<template>
  <div class="auth-page-wrapper">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="recover-container">
      <!-- Tarjeta con Logo del Banco -->
      <div class="brand-logo-card">
        <a href="/">
          <img :src="logoBanco" alt="Banco Universitario Logo" class="brand-logo" />
        </a>
      </div>

      <!-- Cabecera de la sección -->
      <header class="recover-header">
        <h1>Recuperar Cuenta</h1>
        <p class="subtitle">Banca en Línea</p>
      </header>

      <!-- Tarjeta del Formulario -->
      <div class="recover-card">
        
        <!-- Banner de alerta de estado -->
        <Transition name="fade">
          <div 
            v-if="mensajeStatus" 
            class="status-alert" 
            :class="mensajeTipo === 'success' ? 'alert-success-custom' : 'alert-danger-custom'"
          >
            <div class="d-flex align-items-start gap-2">
              <i :class="mensajeTipo === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
              <span class="alert-text">{{ mensajeStatus }}</span>
            </div>
          </div>
        </Transition>

        <!-- --- PASO 1: Ingreso de Correo --- -->
        <form v-if="step === 1" class="recover-form" @submit.prevent="enviarCodigo">
          <p class="step-instruction">
            Ingresa tu correo para recibir un código de seguridad.
          </p>

          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorEmail }">
              <span class="input-icon">
                <i class="bi bi-envelope"></i>
              </span>
              <input 
                id="email" 
                v-model="email"
                type="text" 
                placeholder="ejemplo@correo.com"
                @blur="validarEmail"
                :disabled="isLoading"
              />
            </div>
            <span v-if="errorEmail" class="error-message">{{ errorEmail }}</span>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Enviando...' : 'Enviar Código' }}
          </button>
        </form>

        <!-- --- PASO 2: Código de Verificación --- -->
        <form v-else-if="step === 2" class="recover-form" @submit.prevent="verificarCodigo">
          <p class="step-instruction">
            Hemos enviado un código de seguridad de 6 dígitos a tu correo electrónico. Por favor, ingrésalo a continuación para verificar tu cuenta.
          </p>
          <div class="alert-info-custom d-flex align-items-start gap-2 mb-4">
            <i class="bi bi-info-circle-fill text-info-icon"></i>
            <span class="alert-info-text">
              <strong>Nota:</strong> Si no ves el correo en tu bandeja de entrada principal, asegúrate de revisar la carpeta de <strong>Correo no deseado (Spam)</strong>.
            </span>
          </div>

          <div class="input-group">
            <label for="recoveryCode">Código de Seguridad</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorRecoveryCode }">
              <span class="input-icon">
                <i class="bi bi-shield-check"></i>
              </span>
              <input 
                id="recoveryCode" 
                v-model="recoveryCode"
                type="text" 
                placeholder="Ej. 123456"
                maxlength="6"
                @blur="validarRecoveryCode"
                :disabled="isLoading"
              />
            </div>
            <span v-if="errorRecoveryCode" class="error-message">{{ errorRecoveryCode }}</span>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Verificar Código
          </button>
        </form>

        <!-- --- PASO 3: Nueva Contraseña --- -->
        <form v-else-if="step === 3" class="recover-form" @submit.prevent="restablecerContrasena">
          <p class="step-instruction">
            Crea una nueva contraseña segura para tu cuenta.
          </p>

          <div class="input-group">
            <label for="newPassword">Nueva Contraseña</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorNewPassword }">
              <span class="input-icon">
                <i class="bi bi-lock"></i>
              </span>
              <input 
                id="newPassword" 
                v-model="newPassword"
                :type="mostrarNewPassword ? 'text' : 'password'" 
                placeholder="Mínimo 8 caracteres"
                @blur="validarNewPassword"
                :disabled="isLoading"
              />
              <span class="toggle-password" @click="mostrarNewPassword = !mostrarNewPassword">
                <i :class="mostrarNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </span>
            </div>
            <span v-if="errorNewPassword" class="error-message">{{ errorNewPassword }}</span>
          </div>

          <div class="input-group">
            <label for="confirmPassword">Confirmar Nueva Contraseña</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorConfirmPassword }">
              <span class="input-icon">
                <i class="bi bi-lock"></i>
              </span>
              <input 
                id="confirmPassword" 
                v-model="confirmPassword"
                :type="mostrarConfirmPassword ? 'text' : 'password'" 
                placeholder="Repite tu contraseña"
                @blur="validarConfirmPassword"
                :disabled="isLoading"
              />
              <span class="toggle-password" @click="mostrarConfirmPassword = !mostrarConfirmPassword">
                <i :class="mostrarConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </span>
            </div>
            <span v-if="errorConfirmPassword" class="error-message">{{ errorConfirmPassword }}</span>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Restablecer Contraseña
          </button>
        </form>

        <div class="recover-footer-links">
          <p class="login-link">
            ¿Recordaste tu clave? 
            <button class="btn-link-action font-semibold link-highlight" @click="volverAlLogin">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>

      <!-- Enlace para volver al paso anterior o al login -->
      <button 
        v-if="step > 1" 
        class="back-link btn-back-custom" 
        @click="volverPasoAnterior"
        :disabled="isLoading"
      >
        <i class="bi bi-arrow-left"></i> Volver al paso anterior
      </button>
      <button 
        v-else 
        class="back-link btn-back-custom" 
        @click="volverAlLogin"
        :disabled="isLoading"
      >
        <i class="bi bi-arrow-left"></i> Volver al inicio
      </button>
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
  transition: all 0.5s ease;
}

.orb-1 {
  width: 350px;
  height: 350px;
  background-color: #49beb7;
  top: -100px;
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
  width: 300px;
  height: 300px;
  background-color: #d8f3f1;
  top: 40%;
  left: 65%;
}

.recover-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.8s ease-out;
}

.recover-header {
  text-align: center;
  margin-bottom: 24px;
}

.recover-header h1 {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 24px;
  color: #085f63;
  font-weight: 700;
  margin-bottom: 6px;
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
  transition: transform 0.2s ease;
}

.brand-logo-card:hover {
  transform: translateY(-1px);
}

.brand-logo {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.subtitle {
  font-size: 13.5px;
  color: #7c8e96;
  font-weight: 500;
  margin: 0;
}

.recover-card {
  background-color: #f6f8fb;
  width: 100%;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(8, 95, 99, 0.05);
  border: 1px solid rgba(73, 190, 183, 0.1);
  display: flex;
  flex-direction: column;
}

.status-alert {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.alert-text {
  text-align: left;
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

.step-instruction {
  font-size: 13.5px;
  color: #5d6e76;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: center;
}

.recover-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-group label {
  font-size: 12.5px;
  font-weight: 500;
  color: #4e5d65;
  margin-bottom: 8px;
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
  padding: 13px 40px 13px 42px;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  color: #334148;
}

.input-wrapper input::placeholder {
  color: #a4b4bc;
}

.error-message {
  color: #dc2626;
  font-size: 11px;
  font-weight: 500;
  margin-top: 6px;
  text-align: left;
}

.input-error-border {
  border-color: #dc2626 !important;
}

.btn-submit {
  width: 100%;
  padding: 14px;
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

.recover-footer-links {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  font-size: 13px;
}

.recover-footer-links p {
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
  background: none;
  border: none;
  cursor: pointer;
}

.back-link:hover {
  color: #085f63;
  transform: translateX(-2px);
}

.btn-back-custom:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-link-action {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  color: #49beb7;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
}

.btn-link-action:hover:not(:disabled) {
  color: #085f63;
  text-decoration: underline;
}

.btn-link-action:disabled {
  color: #a4b4bc;
  cursor: not-allowed;
}

.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.timer-badge {
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.bg-teal-light {
  background-color: #e6f7f4;
  color: #0a6b5c;
  border: 1px solid rgba(10, 107, 92, 0.12);
}

.bg-red-light {
  background-color: #fdf2f2;
  color: #9b1c1c;
  border: 1px solid rgba(155, 28, 28, 0.12);
}

.text-muted {
  color: #7c8e96;
}

.text-sm {
  font-size: 12px;
}

.font-semibold {
  font-weight: 600;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loader Styles */
.loading-step-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.loader-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(73, 190, 183, 0.15);
  border-top-color: #49beb7;
  border-radius: 50%;
  animation: spin-loader 1s infinite linear;
  margin-bottom: 24px;
}

.loading-message {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #085f63;
  margin-bottom: 8px;
}

.loading-submessage {
  font-size: 0.9rem;
  color: #7c8e96;
}

@keyframes spin-loader {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert-info-custom {
  background-color: #f0f7ff;
  color: #0b57d0;
  border: 1px solid rgba(11, 87, 208, 0.15);
  display: flex;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.text-info-icon {
  color: #0b57d0;
  font-size: 16px;
}

.alert-info-text {
  text-align: left;
}

@media (max-width: 768px) {
  .recover-card {
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
  .recover-card {
    padding: 24px 16px;
    border-radius: 12px;
  }
  .recover-header h1 {
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
