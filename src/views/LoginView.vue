<template>

  <PublicLayout>

    <HomeHeader />
    <Ingreso />

  </PublicLayout>
</template>

<script setup>
    import PublicLayout from '@/layouts/PublicLayout.vue'

    import HomeHeader from '@/components/HomeHeader.vue'
    import Ingreso from '@/components/Ingreso.vue'

</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>