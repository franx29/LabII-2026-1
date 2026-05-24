<template>
  <article
    class="flip-card"
    :class="{ 'is-open': isOpen, 'is-featured': featured }"
    @mouseenter="handleMouseEnter"
    @click="toggleCard"
  >
    <div class="flip-card-inner">
      <!-- FRONT -->
      <div class="flip-face flip-front">
        <div class="card-top">
          <div class="icon-box">
            <slot name="icon"><span>{{ icon }}</span></slot>
          </div>
        </div>

        <div class="card-middle">
          <h3 class="card-title">{{ title }}</h3>
        </div>

        <div class="card-bottom">
          <button class="arrow-btn" type="button" @click.stop="toggleCard">
            →
          </button>
        </div>
      </div>

      <!-- BACK -->
      <div class="flip-face flip-back">
        <div class="card-top">
          <div class="icon-box">
            <slot name="icon"><span>{{ icon }}</span></slot>
          </div>
        </div>

        <div class="card-middle">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-text">{{ description }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  icon: {
    type: String,
    default: '✦'
  },
  title: {
    type: String,
    default: 'Título'
  },
  description: {
    type: String,
    default: 'Descripción breve.'
  },
  featured: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

function toggleCard() {
  isOpen.value = true
}

function handleMouseEnter() {
  isOpen.value = true
}
</script>

<style scoped>
.flip-card {
  perspective: 1200px;
  min-height: 260px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 260px;
  transform-style: preserve-3d;
  transition: transform 0.7s ease;
}

.flip-card.is-open .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.8rem;
  border-radius: 24px;
  backface-visibility: hidden;
  overflow: hidden;
}

.flip-front {
  background: #ffffff;
  border: 1px solid #d5dee0;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
}

.flip-back {
  transform: rotateY(180deg);
  background: #125f63;
  color: #ffffff;
  border: none;
  box-shadow: 0 18px 34px rgba(8, 95, 99, 0.22);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: #edf7f7;
  color: #49beb7;
  font-size: var(--bs-h3-font-size);
  font-weight: var(--bs-headings-font-weight);
}

.flip-back .icon-box {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
}

.card-middle {
  margin-top: 1rem;
}

.card-title {
  margin: 0;
  font-size: 16px;
  line-height: 1.35;
  font-weight: var(--bs-headings-font-weight);
  color: #085f63;
}

.flip-back .card-title {
  color: #ffffff;
}

.card-text {
  margin: 0.95rem 0 0;
  font-size: 14px;
  line-height: var(--bs-body-line-height);
  color: rgba(255, 255, 255, 0.92);
  max-width: 100%;
}

.card-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.arrow-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #edf7f7;
  color: #49beb7;
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-headings-font-weight);
  transition: transform 0.2s ease, background 0.2s ease;
}

.arrow-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 991.98px) {
  .flip-card,
  .flip-card-inner {
    min-height: 240px;
  }

  .flip-face {
    padding: 1.5rem;
    border-radius: 22px;
  }

  .card-title {
    font-size: var(--bs-h4-font-size);
  }

  .card-text {
    font-size: var(--bs-body-font-size);
  }
}

@media (max-width: 575.98px) {
  .flip-card,
  .flip-card-inner {
    min-height: 220px;
  }

  .flip-face {
    padding: 1.3rem;
    border-radius: 20px;
  }

  .icon-box {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    font-size: var(--bs-h4-font-size);
  }

  .card-title {
    font-size: var(--bs-h4-font-size);
  }

  .card-text {
    font-size: var(--bs-body-font-size);
    line-height: 1.5;
  }

  .arrow-btn {
    width: 32px;
    height: 32px;
    font-size: var(--bs-body-font-size);
  }
}
</style>