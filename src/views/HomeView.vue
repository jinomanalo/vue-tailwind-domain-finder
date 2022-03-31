<template>
  <div class="flex items-center flex-col mt-5 md:mt-10">
    <div
      class="flex-shrink text-center text-5xl font-bold pb-2 tracking-tighter"
    >
      Start your domain name search
    </div>

    <div class="flex-shrink text-center font-medium text-gray-600">
      TinyURL now provides you a platform to find the domain that suits you.
    </div>
    <div class="w-full px-4 mt-8">
      <SearchBar />
    </div>
  </div>
</template>

<script setup>
import SearchBar from "../components/SearchBar.vue";
</script>

<style></style>
