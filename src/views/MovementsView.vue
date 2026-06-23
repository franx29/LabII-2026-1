<template>
  <PrivateLayout>
    <!-- Cabecera de la Vista -->
    <header class="view-header mb-4">
      <h1 class="view-title">Historial de Movimientos</h1>
      <p class="view-subtitle">Visualiza todas tus transacciones</p>
    </header>

    <!-- Estado de Error -->
    <div v-if="errorMsg" class="alert alert-danger-custom d-flex align-items-center gap-2 mb-4" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <div>{{ errorMsg }}</div>
    </div>

    <!-- Filtros de Búsqueda -->
    <div class="filter-section d-flex align-items-center gap-2 mb-4" v-if="!isLoading && !errorMsg">
      <span class="filter-label">
        <i class="bi bi-funnel"></i> Filtrar por:
      </span>
      <button 
        class="filter-btn" 
        :class="{ active: filterType === 'todos' }" 
        @click="filterType = 'todos'"
      >
        Todos
      </button>
      <button 
        class="filter-btn" 
        :class="{ active: filterType === 'ingresos' }" 
        @click="filterType = 'ingresos'"
      >
        Ingresos
      </button>
      <button 
        class="filter-btn" 
        :class="{ active: filterType === 'egresos' }" 
        @click="filterType = 'egresos'"
      >
        Egresos
      </button>
    </div>

    <!-- Estado de Carga -->
    <div v-if="isLoading" class="loader-container d-flex flex-column justify-content-center align-items-center py-5">
      <div class="spinner-border text-teal mb-3" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted">Obteniendo movimientos...</p>
    </div>

    <!-- Tabla de Movimientos -->
    <div v-else-if="!errorMsg" class="table-card card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-header-custom">
            <tr>
              <th scope="col" class="py-3 px-4">Fecha</th>
              <th scope="col" class="py-3 px-4">Descripción</th>
              <th scope="col" class="py-3 px-4">Cuenta</th>
              <th scope="col" class="py-3 px-4 text-end">Monto</th>
              <th scope="col" class="py-3 px-4 text-end">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movement in movements" :key="movement.id">
              <td class="px-4 py-3 text-nowrap">
                {{ formatDate(movement.created_at) }}
              </td>
              <td class="px-4 py-3">
                {{ movement.description }}
              </td>
              <td class="px-4 py-3 text-muted font-monospace">
                {{ movement.account_number }}
              </td>
              <td class="px-4 py-3 text-end font-monospace" :class="movement.multiplier === 1 ? 'text-income' : 'text-expense'">
                {{ formatAmount(movement.amount, movement.multiplier) }}
              </td>
              <td class="px-4 py-3 text-end font-monospace">
                {{ formatBalance(movement.balance) }}
              </td>
            </tr>
            <tr v-if="movements.length === 0">
              <td colspan="5" class="empty-state">
                <i class="bi bi-wallet2 empty-icon d-block"></i>
                No se encontraron transacciones en esta categoría.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Paginación -->
    <div 
      v-if="!isLoading && !errorMsg && totalCount > 0" 
      class="pagination-section d-flex flex-column align-items-center mt-4"
    >
      <div class="d-flex align-items-center gap-2">
        <button 
          class="btn-pagination" 
          :disabled="currentPage === 1" 
          @click="currentPage--"
        >
          <i class="bi bi-chevron-left"></i> Anterior
        </button>
        
        <span class="page-indicator">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        
        <button 
          class="btn-pagination" 
          :disabled="currentPage === totalPages" 
          @click="currentPage++"
        >
          Siguiente <i class="bi bi-chevron-right"></i>
        </button>
      </div>
      
      <span class="showing-text mt-2">
        Mostrando {{ movements.length }} de {{ totalCount }} transacciones
      </span>
    </div>
  </PrivateLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import movementsApi from '@/api/movements'

const router = useRouter()

// Estados reactivos
const movements = ref([])
const isLoading = ref(true)
const errorMsg = ref('')
const filterType = ref('todos') // 'todos', 'ingresos', 'egresos'
const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = ref(1)
const totalCount = ref(0)

// Cargar movimientos desde la API con parámetros
const fetchMovements = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const params = {
      page: currentPage.value,
      page_size: itemsPerPage
    }
    // Agregar multiplier solo si se aplica filtro
    if (filterType.value === 'ingresos') {
      params.multiplier = 1
    } else if (filterType.value === 'egresos') {
      params.multiplier = -1
    }

    const response = await movementsApi.getMovements(params)
    movements.value = response.data.data || []
    
    // Obtener valores de paginación desde cabeceras HTTP de respuesta
    totalPages.value = parseInt(response.headers['x-pagination-page-count']) || 1
    totalCount.value = parseInt(response.headers['x-pagination-total-count']) || movements.value.length
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = error.response?.data?.message || 'Error al conectar con el servidor para obtener los movimientos.'
    }
  } finally {
    isLoading.value = false
  }
}

// Formatear Fecha (YYYY-MM-DD)
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return dateStr.substring(0, 10)
}

// Formatear Monto según multiplier (+Bs. X.XX o Bs. -X.XX)
const formatAmount = (amount, multiplier) => {
  const value = (amount / 100).toFixed(2)
  return multiplier === 1 ? `+Bs. ${value}` : `Bs. -${value}`
}

// Formatear Balance (Bs. X.XX)
const formatBalance = (balance) => {
  const value = (balance / 100).toFixed(2)
  return `Bs. ${value}`
}

// Al cambiar el filtro, reiniciar la página a 1 y consultar de nuevo
watch(filterType, () => {
  currentPage.value = 1
  fetchMovements()
})

// Al cambiar la página, consultar de nuevo
watch(currentPage, () => {
  fetchMovements()
})

// Cargar información al montar la vista
onMounted(() => {
  fetchMovements()
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

/* Sección de Filtros */
.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #4e5d65;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.filter-btn {
  background-color: #f1f5f5;
  color: #4e5d65;
  border: none;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  background-color: #e2ebeb;
  color: #085f63;
}

.filter-btn.active {
  background-color: #085f63;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(8, 95, 99, 0.15);
}

/* Tarjeta y Tabla */
.table-card {
  border-radius: 16px !important;
  border: 1px solid rgba(8, 95, 99, 0.08) !important;
  background-color: #ffffff;
}

.table-header-custom {
  background-color: #085f63 !important;
}

.table-header-custom th {
  color: #ffffff !important;
  font-family: 'Montserrat Alternates', sans-serif !important;
  font-weight: 600;
  font-size: 14.5px;
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
  padding: 16px 24px;
  font-size: 14px;
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

/* Paginación */
.btn-pagination {
  background: transparent;
  border: 1.5px solid #085f63;
  color: #085f63;
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 14.5px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-pagination:hover:not(:disabled) {
  background-color: rgba(8, 95, 99, 0.05);
}

.btn-pagination:disabled {
  border-color: #d4dfdf;
  color: #a4b4bc;
  cursor: not-allowed;
}

.page-indicator {
  background-color: #f1f5f5;
  color: #334148;
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 14.5px;
  font-weight: 600;
}

.showing-text {
  font-size: 13px;
  color: #7c8e96;
  font-weight: 500;
}

/* Loader y Error */
.loader-container {
  min-height: 200px;
}

.text-teal {
  color: #085f63;
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

/* Estado Vacío */
.empty-state {
  text-align: center;
  padding: 64px !important;
  color: #7c8e96;
  font-weight: 500;
}

.empty-icon {
  font-size: 44px;
  color: #b0caca;
  margin-bottom: 12px;
}
</style>
