<script setup>
import { onBeforeMount } from "vue";
import { useSearchStore } from "./stores/search";
import TopNavbarVue from "./components/TopNavbar.vue";

const searchStore = useSearchStore();
onBeforeMount(() => {
  searchStore.getUserLocation();
});
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
