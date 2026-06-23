<template>
  <div class="private-layout-wrapper">
    <!-- Barra Lateral (Sidebar) -->
    <aside class="sidebar">
      <div class="sidebar-top">
        <!-- Tarjeta de Logo del Banco -->
        <div class="brand-logo-card">
          <router-link to="/movimientos">
            <img :src="logoBanco" alt="Banco Universitario Logo" class="brand-logo" />
          </router-link>
        </div>

        <!-- Menú de Navegación -->
        <nav class="sidebar-nav">
          <a href="#" class="nav-menu-item" @click.prevent>
            <span class="nav-icon"><i class="bi bi-grid"></i></span>
            <span class="nav-text">Inicio</span>
          </a>

          <a href="#" class="nav-menu-item" @click.prevent>
            <span class="nav-icon"><i class="bi bi-send"></i></span>
            <span class="nav-text">Transferencias</span>
          </a>

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

          <a href="#" class="nav-menu-item" @click.prevent>
            <span class="nav-icon"><i class="bi bi-person"></i></span>
            <span class="nav-text">Mi Perfil</span>
          </a>
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

/* Main Content Area Styling */
.main-content {
  flex-grow: 1;
  margin-left: 280px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  background-color: #f7fbfb;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 991px) {
  .sidebar {
    width: 80px;
    align-items: center;
  }
  
  .sidebar-top {
    padding: 0 10px;
    align-items: center;
  }

  .brand-logo-card {
    padding: 10px;
    border-radius: 12px;
  }
  
  .brand-logo {
    height: 24px;
  }

  .nav-text, .logout-text {
    display: none;
  }

  .nav-menu-item {
    padding: 12px;
    justify-content: center;
    border-radius: 10px;
  }

  .btn-logout {
    padding: 12px;
    justify-content: center;
    width: auto;
    margin: 0 auto;
  }

  .sidebar-footer {
    padding: 0 10px;
    width: 100%;
  }

  .main-content {
    margin-left: 80px;
  }
}

@media (max-width: 576px) {
  .sidebar {
    width: 60px;
  }
  .main-content {
    margin-left: 60px;
    padding: 10px;
  }
  .nav-menu-item {
    padding: 8px;
  }
  .nav-icon {
    font-size: 16px;
  }
}
</style>
