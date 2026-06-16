<script setup>
import { ref } from 'vue'

// Asegúrate de que coincida letra por letra (respetando la P mayúscula)
const mostrarPassword = ref(false)

// Variables reactivas
const correo = ref('')
const errorCorreo = ref('')

// Función que valida el formato al perder el foco (blur)
const validarCorreo = () => {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!correo.value.trim()) {
    errorCorreo.value = 'El correo electrónico es obligatorio.'
  } else if (!regexCorreo.test(correo.value)) {
    errorCorreo.value = 'Por favor, ingresa un formato de correo válido (ejemplo@dominio.com).'
  } else {
    errorCorreo.value = '' 
  }
}
</script>

<template>

  <body>
    <!-- Contenedor Principal (Flexbox Vertical) -->
    <div class="login-container">
        
        <!-- Encabezado de la simulación -->
        <header class="login-header">
            <h1>Banco Universitario</h1>
            <p class="subtitle">Banca en Línea</p>
        </header>

        <!-- Tarjeta del Formulario (Flexbox Vertical) -->
        <div class="login-card">
            <h2>Iniciar Sesión</h2>
            
            <!-- Formulario (Flexbox Vertical) -->
            <form class="login-form" onsubmit="return false;">
                
                <!-- Campo de E-mail (Flexbox Vertical) -->
               <div class="input-group">
                  <label for="username">Correo Electrónico</label>
                  <div class="input-wrapper" :class="{ 'input-error-border': errorCorreo }">
                    <span class="input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
    
                    <input 
                      v-model="correo"
                      type="text" 
                      id="username" 
                      placeholder="Ingresa tu Correo Electrónico"
                      @blur="validarCorreo"
                    >
                  </div>
  
                <!-- Contenedor del mensaje de error (Solo se muestra si errorCorreo tiene texto) -->
                  <span v-if="errorCorreo" class="error-message">{{ errorCorreo }}</span>
               </div>

                <!-- Campo de Clave de Acceso (Flexbox Vertical) -->
                <div class="input-group">
                 <label for="password">Clave de Acceso</label>
                 <div class="input-wrapper">
                   <span class="input-icon">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                   </span>

                   <input :type="mostrarPassword ? 'text' : 'password'" id="password" placeholder="Ingresa tu clave">
       
                    <span class="toggle-password" @click="mostrarPassword = !mostrarPassword">
                    <svg v-if="mostrarPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off w-5 h-5"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.574 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 8.637a3 3 0 0 1 3.277 3.277"></path><path d="M6.177 6.177A10.745 10.745 0 0 0 2.062 11.652a1 1 0 0 0 0 .696 10.746 10.746 0 0 0 12.065 6.561"></path><circle cx="12" cy="12" r="3"></circle><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-5 h-5"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </span>
                 </div>
                </div>

                <!-- Botón de Envío Simulado -->
                <button type="button" class="btn-submit">Ingresar</button>
            </form>

            <!-- Enlaces Inferiores (Flexbox Vertical) -->
            <div class="login-footer-links">
                <p> Ejemplo: Correo: 123@aol.com | Clave:123456 </p>
                <hr class="divider">
                <p>¿No posees una cuenta? <a href="#">Regístrate aquí</a></p>
                <hr class="divider">
                <p>¿Requieres asistencia? <a href="#">Recuperar</a></p>
            </div>
        </div>

        <a href="#" class="back-link">← Volver al inicio</a>
    </div>

  </body>
</template>
   <style scoped>
/* Estilos Generales y Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif !important; /* Fuerza la fuente en todos los elementos contenedores */
}

/* Asegura que los campos de formulario hereden correctamente la tipografía */
input, button, label, select, textarea {
    font-family: 'Montserrat', sans-serif !important;
}

/* El cuerpo usa Flexbox para centrar todo en la pantalla */
body {
    background-color: #f8fafc;
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center;     /* Centrado vertical */
    min-height: 100vh;
    color: #334155;
}

/* Contenedor Principal (Flexbox en columna) */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;     
    width: 100%;
    max-width: 440px;
    padding: 20px;
}

/* Encabezado */
.login-header {
    display: flex;
    flex-direction: column;
    align-items: center;     /* Centra el texto y subtítulo */
    text-align: center;
    margin-bottom: 24px;
}

.login-header h1 {
    font-size: 24px;
    color: #0d9488;
    font-weight: 700;
}

.login-header .subtitle {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 400;
}

/* Tarjeta del Formulario (Flexbox en columna) */
.login-card {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.login-card h2 {
    text-align: center;
    font-size: 22px;
    color: #111827;
    margin-bottom: 28px;
    font-weight: 600;
}

/* Mensaje de error abajo del input */
.error-message {
    color: #dc2626; /* Color rojo de advertencia */
    font-size: 11px;
    font-weight: 500;
    margin-top: 6px;
    text-align: left;
}

/* Clase dinámica para pintar el borde de rojo si la validación falla */
.input-error-border input {
    border-color: #dc2626 !important;
}

.input-error-border input:focus {
    box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08) !important;
}

/* Formulario (Flexbox en columna) */
.login-form {
    display: flex;
    flex-direction: column;
}

/* Grupo de Entrada (Flexbox en columna para Label e Input) */
.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.input-group label {
    font-size: 12px;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 8px;
}

/* Contenedor interno del Input (Flexbox en fila) */
.input-wrapper {
    display: flex;
    align-items: center;     /* Centra verticalmente los iconos con el input */
    position: relative;
    width: 100%;
}

/* Iconos posicionados de forma absoluta respecto al wrapper */
.input-icon {
    position: absolute;
    left: 14px;
    font-size: 16px;
    color: #9ca3af;
}

.toggle-password {
    position: absolute;
    right: 14px;
    cursor: pointer;
    font-size: 16px;
    color: #9ca3af;
}

/* Input con padding izquierdo para no encimarse con el icono */
.input-wrapper input {
    width: 100%;
    padding: 14px 40px 14px 44px; /* Mayor padding a los lados por los iconos */
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    color: #1f2937;
}

.input-wrapper input:focus {
    border-color: #0d9488;
}

/* Botón */
.btn-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #0d9488, #115e59);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    transition: opacity 0.2s;
}

.btn-submit:hover {
    opacity: 0.95;
}

/* Enlaces Inferiores (Flexbox en columna) */
.login-footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;     /* Centra los textos de enlaces */
    margin-top: 24px;
    font-size: 13px;
    color: #4b5563;
}

.login-footer-links a {
    color: #0d9488;
    text-decoration: none;
    font-weight: 500;
}

.login-footer-links a:hover {
    text-decoration: underline;
}

.divider {
    width: 100%;             /* Asegura que ocupe todo el ancho de la tarjeta */
    border: 0;
    border-top: 1px solid #e5e7eb;
    margin: 16px 0;
}

.back-link {
    margin-top: 20px;
    font-size: 13px;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
}

.back-link:hover {
    color: #374151;
}

</style> 