<script setup>
import TopNavbarVue from "./components/TopNavbar.vue";
</script>

<template>
  <div class="flex flex-col">
    <TopNavbarVue />

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<style></style>
