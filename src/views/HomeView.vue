<template>
  <div class="flex items-center flex-col space-y-2 md:space-y-6 mt-10 md:mt-20">
    <div
      class="flex-shrink text-center text-5xl font-bold pb-4 tracking-tighter"
    >
      Start your domain name search
    </div>
    <div class="w-full px-4">
      <SearchBar />
    </div>

    <div class="flex-shrink text-center font-medium p-4">
      TinyURL now provides you a platform to find the domain that suits you.
    </div>
  </div>
</template>

<script setup>
import SearchBar from "../components/SearchBar.vue";
</script>

<style></style>
