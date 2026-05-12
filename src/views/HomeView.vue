<template>
  <main class="home-page">
    <HomeHeader />
  </main>
</template>

<script setup>
import HomeHeader from '@/components/HomeHeader.vue'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.home-page {
  background: #f7f9f9;
  min-height: 100vh;
}
</style>