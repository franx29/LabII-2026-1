<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoBanco from '@/assets/logo-no-background.png'
import authApi from '@/api/auth'

const router = useRouter()
const route = useRoute()

// Variables reactivas
const correo = ref('')
const password = ref('')
const errorCorreo = ref('')
const errorPassword = ref('')
const mostrarPassword = ref(false)

const mensajeStatus = ref('')
const mensajeTipo = ref('')
const isLoading = ref(false)

const validarCorreo = () => {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!correo.value.trim()) {
    errorCorreo.value = 'El correo electrónico es obligatorio.'
  } else if (!regexCorreo.test(correo.value)) {
    errorCorreo.value = 'Ingresa un formato de correo electrónico válido (ejemplo@dominio.com).'
  } else {
    errorCorreo.value = ''
  }
}

const validarPassword = () => {
  if (!password.value) {
    errorPassword.value = 'La contraseña es obligatoria.'
  } else if (password.value.length < 6) {
    errorPassword.value = 'La contraseña debe tener al menos 6 caracteres.'
  } else {
    errorPassword.value = ''
  }
}

const submitLogin = async () => {
  validarCorreo()
  validarPassword()

  if (errorCorreo.value || errorPassword.value) {
    mensajeStatus.value = 'Fallo: Por favor corrige los errores del formulario.'
    mensajeTipo.value = 'error'
    return
  }

  isLoading.value = true
  mensajeStatus.value = ''
  mensajeTipo.value = ''

  try {
    const response = await authApi.login({
      email: correo.value.trim(),
      password: password.value
    })

    const token = response.data?.data?.jwt
    if (token) {
      localStorage.setItem('token', token)
      mensajeStatus.value = 'Éxito: Sesión iniciada correctamente.'
      mensajeTipo.value = 'success'

      setTimeout(() => {
        router.push('/inicio')
      }, 1000)
    } else {
      mensajeStatus.value = 'Fallo: No se recibió un token válido del servidor.'
      mensajeTipo.value = 'error'
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    const errorMsg = error.response?.data?.message || error.message || 'Error al conectar con el servidor.'
    mensajeStatus.value = `Fallo: ${errorMsg}`
    mensajeTipo.value = 'error'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.query.email) {
    correo.value = route.query.email
  }
})
</script>

<template>
  <div class="auth-page-wrapper">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="login-container">
      <header class="login-header">
        <div class="brand-logo-card">
          <a href="/">
            <img :src="logoBanco" alt="Banco Universitario Logo" class="brand-logo" />
          </a>
        </div>
        <h1>Iniciar Sesión</h1>
        <p class="subtitle">Banca en Línea</p>
      </header>

      <div class="login-card">
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

        <form class="login-form" @submit.prevent="submitLogin">
          
          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorCorreo }">
              <span class="input-icon">
                <i class="bi bi-person"></i>
              </span>
              <input 
                id="email" 
                v-model="correo"
                type="text" 
                placeholder="Ingresa Correo Electronico"
                @blur="validarCorreo"
              />
            </div>
            <span v-if="errorCorreo" class="error-message">{{ errorCorreo }}</span>
          </div>

          <div class="input-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper" :class="{ 'input-error-border': errorPassword }">
              <span class="input-icon">
                <i class="bi bi-lock"></i>
              </span>
              <input 
                id="password" 
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'" 
                placeholder="Ingresa tu contraseña"
                @blur="validarPassword"
              />
              <span class="toggle-password" @click="mostrarPassword = !mostrarPassword">
                <i :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </span>
            </div>
            <span v-if="errorPassword" class="error-message">{{ errorPassword }}</span>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>
        <div class="login-footer-links">
          <p class="signup-link">
            ¿No tienes cuenta? <router-link to="/register" class="link-highlight">Regístrate aquí</router-link>
          </p>
          <hr class="divider">
          <p class="recover-link">
            ¿Olvidaste tu clave? <router-link to="/recover" class="link-highlight">Recuperar</router-link>
          </p>
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

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.8s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h1 {
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

.login-card {
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
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
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

.login-form {
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
  padding: 14px;
  background: linear-gradient(135deg, #49beb7, #085f63);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.15);
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(8, 95, 99, 0.25);
  background: linear-gradient(135deg, #42b2ab, #075255);
}

.btn-submit:active {
  transform: translateY(0);
}

.login-footer-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  font-size: 13.5px;
}

.login-footer-links p {
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

.divider {
  width: 100%;
  border: 0;
  border-top: 1px solid rgba(8, 95, 99, 0.08);
  margin: 14px 0;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .login-card {
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
  .login-card {
    padding: 24px 16px;
    border-radius: 12px;
  }
  .login-header h1 {
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