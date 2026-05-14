<template>
  <main class="home-page">
    <HomeHeader />
    <HomeHero />
    <HomeBenefitsFlip />  
  </main>
</template>

<script setup>
import HomeHeader from '@/components/HomeHeader.vue'
import HomeHero from '@/components/HomeHero.vue'
import HomeBenefitsFlip from '@/components/HomeBenefitsFlip.vue'
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