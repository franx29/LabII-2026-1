<template>
  <div class="private-layout-wrapper">
    <!-- Barra Lateral (Sidebar) -->
    <aside class="sidebar">
      <div class="sidebar-top">
        <!-- Tarjeta de Logo del Banco -->
        <div class="brand-logo-card">
          <router-link to="/inicio">
            <img :src="logoBanco" alt="Banco Universitario Logo" class="brand-logo" />
          </router-link>
        </div>

        <!-- Menú de Navegación -->
        <nav class="sidebar-nav">
          <router-link 
            to="/inicio" 
            class="nav-menu-item" 
            :class="{ active: isActive('/inicio') }"
          >
            <span class="nav-icon"><i class="bi bi-grid"></i></span>
            <span class="nav-text">Inicio</span>
          </router-link>

          <router-link 
            to="/transferencias" 
            class="nav-menu-item" 
            :class="{ active: isActive('/transferencias') || isActive('/transferencias/comprobante') }"
          >
            <span class="nav-icon"><i class="bi bi-send"></i></span>
            <span class="nav-text">Transferencias</span>
          </router-link>

          <a href="#" class="nav-menu-item" @click.prevent>
            <span class="nav-icon"><i class="bi bi-people"></i></span>
            <span class="nav-text">Afiliados</span>
          </a>

          <!-- Movimientos is highlighted based on route -->
          <router-link 
            to="/movimientos" 
            class="nav-menu-item" 
            :class="{ active: isActive('/movimientos') }"
          >
            <span class="nav-icon"><i class="bi bi-arrow-left-right"></i></span>
            <span class="nav-text">Movimientos</span>
          </router-link>

          <router-link 
            to="/perfil" 
            class="nav-menu-item" 
            :class="{ active: isActive('/perfil') }"
          >
            <span class="nav-icon"><i class="bi bi-person"></i></span>
            <span class="nav-text">Mi Perfil</span>
          </router-link>
        </nav>
      </div>

      <!-- Footer del Sidebar con Cerrar Sesión -->
      <div class="sidebar-footer">
        <button class="btn-logout" @click="logout">
          <span class="logout-icon"><i class="bi bi-box-arrow-right"></i></span>
          <span class="logout-text">Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Contenido Principal -->
    <main class="main-content">
      <div class="container-fluid py-4 px-md-4 px-2">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import logoBanco from '@/assets/logo-no-background.png'

const router = useRouter()
const route = useRoute()

// Verifica si la ruta dada es la ruta activa actual
const isActive = (path) => {
  return route.path === path
}

// Lógica de logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.private-layout-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f7fbfb;
  overflow-x: hidden;
}

/* Sidebar Styling */
.sidebar {
  width: 280px;
  background-color: #085f63;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 24px 0;
  box-shadow: 4px 0 15px rgba(8, 95, 99, 0.05);
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 20px;
}

/* Brand Logo Card */
.brand-logo-card {
  background: #ffffff;
  padding: 12px 14px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(8, 95, 99, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(73, 190, 183, 0.08);
  transition: transform 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.brand-logo-card:hover {
  transform: translateY(-1px);
}

.brand-logo {
  max-width: 100%;
  height: 38px;
  width: auto;
  object-fit: contain;
}

/* Navigation Items */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.25s ease;
  cursor: pointer;
  background: transparent;
}

.nav-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: #ffffff;
}

.nav-menu-item.active {
  background-color: #49beb7;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(73, 190, 183, 0.2);
}

.nav-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.nav-text {
  letter-spacing: 0.2px;
}

/* Sidebar Footer & Logout */
.sidebar-footer {
  padding: 0 20px;
}

.btn-logout {
  width: 100%;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
  font-size: 14.5px;
  font-weight: 500;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-logout:hover {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ff8080;
}

.logout-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.logout-text {
  letter-spacing: 0.2px;
}

.main-content {
  flex-grow: 1;
  margin-left: 280px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  background-color: #f7fbfb;
  min-width: 0;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 991px) {
  /* Mover el sidebar al fondo de la pantalla como barra de navegación inferior */
  .sidebar {
    width: 100% !important;
    height: 68px !important;
    position: fixed !important;
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    flex-direction: row !important;
    padding: 0 !important;
    box-shadow: 0 -4px 20px rgba(8, 95, 99, 0.08) !important;
    display: grid !important;
    grid-template-columns: 5fr 1fr !important;
    align-items: center !important;
    border-top: 1px solid rgba(73, 190, 183, 0.15) !important;
  }

  .sidebar-top {
    padding: 0 !important;
    flex-direction: row !important;
    width: 100% !important;
    gap: 0 !important;
  }

  .brand-logo-card {
    display: none !important;
  }

  .sidebar-nav {
    display: grid !important;
    grid-template-columns: repeat(5, 1fr) !important;
    width: 100% !important;
    gap: 0 !important;
  }

  .nav-menu-item {
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 4px !important;
    padding: 8px 0 !important;
    border-radius: 0 !important;
    color: rgba(255, 255, 255, 0.7) !important;
    background: transparent !important;
  }

  .nav-menu-item:hover {
    background-color: transparent !important;
    color: #ffffff !important;
  }

  .nav-menu-item.active {
    color: #49beb7 !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .nav-icon {
    font-size: 20px !important;
  }

  .nav-text {
    display: block !important;
    font-size: 10px !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
    text-align: center !important;
  }

  /* Footer / Logout */
  .sidebar-footer {
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
  }

  .btn-logout {
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 4px !important;
    padding: 8px 0 !important;
    border-radius: 0 !important;
    color: rgba(255, 255, 255, 0.7) !important;
    background: transparent !important;
    text-align: center !important;
    width: 100% !important;
  }

  .btn-logout:hover {
    background-color: transparent !important;
    color: #ff8080 !important;
  }

  .logout-icon {
    font-size: 20px !important;
  }

  .logout-text {
    display: block !important;
    font-size: 10px !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
    text-align: center !important;
  }

  /* Ajustar contenido principal */
  .main-content {
    margin-left: 0 !important;
    padding-bottom: 80px !important;
  }
}

@media (max-width: 576px) {
  .sidebar {
    height: 60px !important;
  }
  .nav-icon, .logout-icon {
    font-size: 18px !important;
  }
  .nav-text, .logout-text {
    font-size: 9px !important;
  }
  .main-content {
    padding-bottom: 72px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}
</style>
