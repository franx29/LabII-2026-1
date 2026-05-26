<template>
  <PublicLayout>
    <HomeHeader />
    <HomeHero />
    <HomeBenefitsFlip />
    <Nosotros />
    <ObjetivosSection />
    <ServiciosSection />
     <SecuritySection />
    <ContactoSection />

    <CTASection />
    <FooterSection />
  </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue'

import HomeHeader from '@/components/HomeHeader.vue'
import HomeHero from '@/components/HomeHero.vue'
import HomeBenefitsFlip from '@/components/HomeBenefitsFlip.vue'
import Nosotros from '@/components/Nosotros.vue'
import ObjetivosSection from '@/components/ObjetivosSection.vue'
import ServiciosSection from '@/components/ServiciosSection.vue'
import ContactoSection from '@/components/ContactoSection.vue'

import SecuritySection from '@/components/SecuritySection.vue'
import CTASection from '@/components/CTASection.vue'  
import FooterSection from '@/components/FooterSection.vue'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>