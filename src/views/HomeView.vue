<template>
  <PublicLayout>
    
    <ObjetivosSection />
    <ServiciosSection />
    <ContactoSection />

  </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue'
import ObjetivosSection from '@/components/ObjetivosSection.vue'
import ServiciosSection from '@/components/ServiciosSection.vue'
import ContactoSection from '@/components/ContactoSection.vue'
</script>
