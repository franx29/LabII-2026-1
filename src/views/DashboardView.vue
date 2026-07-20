<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4">
      <h1 class="view-title">Inicio</h1>
      <p class="view-subtitle" v-if="user">Bienvenido de vuelta, {{ user.first_name }} {{ user.last_name }}</p>
      <p class="view-subtitle" v-else>Cargando información del usuario...</p>
    </header>

    <!-- Estado de Error Global -->
    <div v-if="errorMsg" class="alert alert-danger-custom d-flex align-items-center gap-2 mb-4" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <div>{{ errorMsg }}</div>
    </div>

    <!-- Esqueleto de Carga (Skeleton Loader) -->
    <div v-if="isLoading" class="dashboard-skeleton">
      <!-- Tarjeta de Balance -->
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="skeleton-loader skeleton-text mb-2" style="width: 150px; height: 14px;"></div>
        <div class="skeleton-loader skeleton-text mb-4" style="width: 250px; height: 38px;"></div>
        <div class="d-flex justify-content-between align-items-end mt-2">
          <div class="w-50">
            <div class="skeleton-loader skeleton-text mb-2" style="width: 120px; height: 12px;"></div>
            <div class="skeleton-loader skeleton-text" style="width: 80%; height: 20px; margin-bottom: 0;"></div>
          </div>
          <div class="skeleton-loader skeleton-button" style="width: 80px; height: 32px; border-radius: 10px;"></div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-4" v-for="i in 3" :key="i">
          <div class="card border-0 shadow-sm rounded-4 p-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important; height: 96px;">
            <div class="d-flex align-items-center gap-3">
              <div class="skeleton-loader" style="width: 46px; height: 46px; border-radius: 8px;"></div>
              <div class="w-50">
                <div class="skeleton-loader skeleton-text mb-2" style="width: 90%; height: 16px;"></div>
                <div class="skeleton-loader skeleton-text" style="width: 60%; height: 12px; margin-bottom: 0;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BCV Rates Card -->
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="skeleton-loader skeleton-text mb-3" style="width: 220px; height: 20px;"></div>
        <div class="row g-3">
          <div class="col-12 col-sm-6" v-for="i in 2" :key="i">
            <div class="p-3 rounded-3 d-flex align-items-center gap-3" style="background-color: #f8fafb; border: 1px solid #edf2f2;">
              <div class="skeleton-loader skeleton-circle" style="width: 40px; height: 40px;"></div>
              <div class="w-50">
                <div class="skeleton-loader skeleton-text mb-2" style="width: 40px; height: 12px;"></div>
                <div class="skeleton-loader skeleton-text" style="width: 100px; height: 18px; margin-bottom: 0;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Card -->
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4" style="background-color: #ffffff; border: 1px solid rgba(8, 95, 99, 0.08) !important;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="skeleton-loader skeleton-text" style="width: 180px; height: 20px; margin-bottom: 0;"></div>
          <div class="skeleton-loader skeleton-button" style="width: 80px; height: 28px; border-radius: 8px;"></div>
        </div>
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th v-for="i in 3" :key="i" class="border-0">
                  <div class="skeleton-loader skeleton-text mx-auto" style="width: 60px; height: 14px;"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in 3" :key="row">
                <td v-for="col in 3" :key="col" class="py-3 border-light">
                  <div class="skeleton-loader skeleton-text mx-auto" style="width: 70%; height: 14px; margin-bottom: 0;"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="dashboard-content">
      <!-- Tarjeta de Balance Principal -->
      <div class="balance-card rounded-4 p-4 mb-4 text-white position-relative overflow-hidden shadow-sm">
        <div class="balance-card-bg-decoration">
          <i class="bi bi-graph-up-arrow"></i>
        </div>
        <div class="position-relative z-3">
          <span class="balance-label text-white-50 d-block mb-1">Balance Disponible</span>
          <h2 class="balance-amount mb-4 font-monospace">Bs. {{ formatNumber(balance) }}</h2>
          
          <div class="account-info-container d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3">
            <div>
              <span class="account-label text-white-50 d-block mb-1">Tu número de cuenta</span>
              <span class="account-number font-monospace fs-5">{{ formatAccountNumber(user?.account_number) }}</span>
            </div>
            <button class="btn btn-copy-account d-flex align-items-center gap-2" @click="copyAccount">
              <i class="bi" :class="copied ? 'bi-check-lg' : 'bi-copy'"></i>
              <span>{{ copied ? 'Copiado' : 'Copiar' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Botones de Acción Rápida -->
      <div class="row g-3 mb-4">
        <!-- Transferir -->
        <div class="col-12 col-md-4">
          <div class="action-card rounded-4 p-4 text-white d-flex align-items-center gap-3 shadow-sm h-100">
            <div class="action-icon-wrapper rounded-3">
              <i class="bi bi-arrow-up-right"></i>
            </div>
            <div>
              <h3 class="action-title m-0">Transferir</h3>
              <p class="action-description text-white-50 m-0">Enviar fondos a cuentas</p>
            </div>
          </div>
        </div>
        
        <!-- Ver Movimientos -->
        <div class="col-12 col-md-4">
          <router-link to="/movimientos" class="action-card rounded-4 p-4 text-white d-flex align-items-center gap-3 shadow-sm h-100 text-decoration-none">
            <div class="action-icon-wrapper rounded-3">
              <i class="bi bi-arrow-down-left"></i>
            </div>
            <div>
              <h3 class="action-title m-0">Ver Movimientos</h3>
              <p class="action-description text-white-50 m-0">Ver historial detallado</p>
            </div>
          </router-link>
        </div>

        <!-- Ver Afiliados -->
        <div class="col-12 col-md-4">
          <div class="action-card rounded-4 p-4 text-white d-flex align-items-center gap-3 shadow-sm h-100">
            <div class="action-icon-wrapper rounded-3">
              <i class="bi bi-people"></i>
            </div>
            <div>
              <h3 class="action-title m-0">Ver Afiliados</h3>
              <p class="action-description text-white-50 m-0">Gestionar tus contactos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tasas de Cambio BCV -->
      <div class="bcv-rates-card card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h4 class="bcv-title d-flex align-items-center gap-2 mb-3">
          <i class="bi bi-graph-up text-teal"></i> Tasas de Cambio BCV (Hoy)
        </h4>
        <div class="row g-3">
          <!-- Tasa USD -->
          <div class="col-12 col-sm-6">
            <div class="rate-box d-flex align-items-center gap-3 p-3 rounded-3">
              <div class="rate-icon usd rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-currency-dollar"></i>
              </div>
              <div>
                <span class="rate-label text-muted d-block">USD</span>
                <span class="rate-value font-monospace" v-if="rates.usd !== null">Bs. {{ rates.usd.toFixed(2) }}</span>
                <span class="rate-value font-monospace text-muted" v-else>Cargando...</span>
              </div>
            </div>
          </div>

          <!-- Tasa EUR -->
          <div class="col-12 col-sm-6">
            <div class="rate-box d-flex align-items-center gap-3 p-3 rounded-3">
              <div class="rate-icon eur rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-currency-euro"></i>
              </div>
              <div>
                <span class="rate-label text-muted d-block">EUR</span>
                <span class="rate-value font-monospace" v-if="rates.eur !== null">Bs. {{ rates.eur.toFixed(2) }}</span>
                <span class="rate-value font-monospace text-muted" v-else>Cargando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transacciones Recientes -->
      <div class="recent-transactions-card card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div class="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
          <h4 class="card-title text-teal m-0">Transacciones Recientes</h4>
          <router-link to="/movimientos" class="btn btn-sm btn-outline-teal rounded-3 px-3">Ver Todo</router-link>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-header-custom">
              <tr>
                <th scope="col" class="py-3 px-4 text-center">Fecha</th>
                <th scope="col" class="py-3 px-4 text-center">Descripción</th>
                <th scope="col" class="py-3 px-4 text-center">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movement in recentMovements" :key="movement.id">
                <td class="px-4 py-3 text-center text-nowrap">
                  {{ formatDate(movement.created_at) }}
                </td>
                <td class="px-4 py-3 text-center">
                  {{ movement.description }}
                </td>
                <td class="px-4 py-3 text-center font-monospace" :class="movement.multiplier === 1 ? 'text-income' : 'text-expense'">
                  {{ formatAmount(movement.amount, movement.multiplier) }}
                </td>
              </tr>
              <tr v-if="recentMovements.length === 0">
                <td colspan="3" class="empty-state text-center py-5">
                  <i class="bi bi-wallet2 empty-icon d-block mb-2"></i>
                  No se encontraron transacciones recientes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import userApi from '@/api/user'
import movementsApi from '@/api/movements'

const router = useRouter()

// Estados reactivos
const user = ref(null)
const balance = ref(0)
const recentMovements = ref([])
const isLoading = ref(true)
const copied = ref(false)
const errorMsg = ref('')

const rates = ref({
  usd: 36.45, // Fallback default value from screenshot
  eur: 39.87  // Fallback default value from screenshot
})

// Formatear Fecha (YYYY-MM-DD)
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return dateStr.substring(0, 10)
}

// Formatear Número a 2 decimales
const formatNumber = (num) => {
  return Number(num).toFixed(2)
}

// Formatear Monto (+Bs. X.XX o -Bs. X.XX)
const formatAmount = (amount, multiplier) => {
  const value = Number(amount).toFixed(2)
  return multiplier === 1 ? `+Bs. ${value}` : `-Bs. ${value}`
}

// Formatear número de cuenta con guiones (XXXX-XXXX-XXXX-XXXX-XXXX)
const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '-'
  return accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4-$5')
}

// Copiar número de cuenta al portapapeles
const copyAccount = async () => {
  if (!user.value?.account_number) return
  try {
    await navigator.clipboard.writeText(user.value.account_number)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar el número de cuenta:', err)
  }
}

// Obtener tasas de cambio reales del BCV de dolarapi.com
const fetchBcvRates = async () => {
  try {
    const [usdRes, eurRes] = await Promise.all([
      axios.get('https://ve.dolarapi.com/v1/dolares/oficial'),
      axios.get('https://ve.dolarapi.com/v1/euros/oficial')
    ])
    
    if (usdRes.data && usdRes.data.promedio) {
      rates.value.usd = usdRes.data.promedio
    }
    if (eurRes.data && eurRes.data.promedio) {
      rates.value.eur = eurRes.data.promedio
    }
  } catch (err) {
    console.warn('Error al obtener tasas de cambio de DolarApi. Usando tasas por defecto.', err)
  }
}

// Cargar información completa del dashboard
const fetchDashboardData = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    // 1. Obtener datos del usuario
    const userRes = await userApi.whoami()
    user.value = userRes.data.data

    // 2. Obtener saldo disponible
    const balanceRes = await userApi.getBalance()
    balance.value = balanceRes.data.data?.balance || 0

    // 3. Obtener últimas 5 transacciones
    const movementsRes = await movementsApi.getMovements({
      page: 1,
      page_size: 5
    })
    recentMovements.value = movementsRes.data.data || []

    // 4. Obtener tasas de cambio
    await fetchBcvRates()
  } catch (err) {
    console.error('Error al cargar datos del dashboard:', err)
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = err.response?.data?.message || 'Error al conectar con el servidor para obtener los datos de la cuenta.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
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

/* Loader y Error */
.loader-container {
  min-height: 300px;
}

.text-teal {
  color: #085f63;
}

.btn-outline-teal {
  color: #085f63;
  border-color: #085f63;
}

.btn-outline-teal:hover {
  background-color: #085f63;
  color: #ffffff;
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

/* Tarjeta de Balance Principal */
.balance-card {
  background: linear-gradient(135deg, #085f63 0%, #129a90 100%);
  border: 1px solid rgba(73, 190, 183, 0.15);
}

.balance-card-bg-decoration {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  font-size: 160px;
  color: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  line-height: 1;
}

.balance-label {
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.8) !important;
}

.balance-amount {
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #ffffff !important;
}

.account-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.8) !important;
}

.account-number {
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #ffffff !important;
}

.btn-copy-account {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 6px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-copy-account:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Botones de Acción Rápida */
.action-card {
  background: linear-gradient(135deg, #129a90 0%, #085f63 100%);
  border: 1px solid rgba(73, 190, 183, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  color: #ffffff !important;
}

.action-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(8, 95, 99, 0.15) !important;
}

.action-icon-wrapper {
  background-color: rgba(255, 255, 255, 0.12);
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  color: #ffffff !important;
}

.action-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff !important;
}

.action-description {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Tasas de Cambio BCV */
.bcv-rates-card {
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
}

.bcv-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 16px;
  font-weight: 600;
  color: #085f63;
}

.rate-box {
  background-color: #f8fafb;
  border: 1px solid #edf2f2;
  transition: background-color 0.2s ease;
}

.rate-box:hover {
  background-color: #f1f5f5;
}

.rate-icon {
  width: 44px;
  height: 44px;
  color: #085f63;
  font-size: 20px;
}

.rate-icon.usd {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754;
}

.rate-icon.eur {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.rate-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.rate-value {
  font-size: 18px;
  font-weight: 700;
  color: #334148;
}

/* Transacciones Recientes */
.recent-transactions-card {
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
}

.card-title {
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-size: 16px;
  font-weight: 600;
}

.table-header-custom {
  background-color: #085f63 !important;
}

.table-header-custom th {
  color: #ffffff !important;
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-weight: 600;
  font-size: 14px;
  border-bottom: none;
  background-color: transparent !important;
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8fafb;
}

.table td {
  padding: 14px 20px;
  font-size: 13.5px;
  color: #334148;
  font-weight: 500;
  border-bottom: 1px solid #edf2f2;
}

/* Colores para montos */
.text-income {
  color: #198754 !important;
  font-weight: 700;
}

.text-expense {
  color: #dc2626 !important;
  font-weight: 700;
}

.font-monospace {
  font-family: 'Montserrat Alternates', monospace !important;
}

.empty-state {
  color: #7c8e96;
  font-weight: 500;
}

.empty-icon {
  font-size: 32px;
  color: #b0caca;
}

@media (max-width: 768px) {
  .view-title {
    font-size: 24px;
  }
  .balance-amount {
    font-size: 32px;
  }
}

@media (max-width: 576px) {
  .view-title {
    font-size: 20px;
  }
  .view-subtitle {
    font-size: 13px;
  }
  .balance-amount {
    font-size: 26px;
  }
  .account-number {
    font-size: 15px !important;
  }
  .table td {
    padding: 10px 12px;
    font-size: 12.5px;
  }
}
</style>
