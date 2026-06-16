<template>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal de Acceso - Ejercicio UI Flexbox</title>
    <!-- Importación de la fuente Montserrat desde Google Fonts -->
    <link rel="preconnect" href="https://googleapis.com">
    <link rel="preconnect" href="https://gstatic.com" crossorigin>
    <link href="https://googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <!-- Contenedor Principal (Flexbox Vertical) -->
    <div class="login-container">
        
        <!-- Encabezado de la simulación -->
        <header class="login-header">
            <h1>Portal de Acceso</h1>
            <p class="subtitle">Servicios en Línea</p>
        </header>

        <!-- Tarjeta del Formulario (Flexbox Vertical) -->
        <div class="login-card">
            <h2>Iniciar Sesión</h2>
            
            <!-- Formulario (Flexbox Vertical) -->
            <form class="login-form" onsubmit="return false;">
                
                <!-- Campo de Identificador (Flexbox Vertical) -->
                <div class="input-group">
                    <label for="username">Identificador de Usuario</label>
                    <div class="input-wrapper">
                        <span class="input-icon">👤</span>
                        <input type="text" id="username" placeholder="Ingresa tu identificador">
                    </div>
                </div>

                <!-- Campo de Clave de Acceso (Flexbox Vertical) -->
                <div class="input-group">
                    <label for="password">Clave de Acceso</label>
                    <div class="input-wrapper">
                        <span class="input-icon">🔒</span>
                        <input type="password" id="password" placeholder="Ingresa tu clave">
                        <span class="toggle-password">👁️</span>
                    </div>
                </div>

                <!-- Botón de Envío Simulado -->
                <button type="button" class="btn-submit">Ingresar</button>
            </form>

            <!-- Enlaces Inferiores (Flexbox Vertical) -->
            <div class="login-footer-links">
                <p>¿No posees una cuenta? <a href="#">Regístrate aquí</a></p>
                <hr class="divider">
                <p>¿Requieres asistencia? <a href="#">Recuperar credenciales</a></p>
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
    font-family: 'Montserrat', sans-serif;
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
    align-items: center;     /* Alinea los hijos al centro horizontalmente */
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