<template>
  <div class="border-b-2 border-slate-100 p-2">
    <SearchBar />
  </div>
  <div class="m-auto max-w-4xl relative">
    <SearchResult />
  </div>
</template>

<script setup>
import SearchBar from "../components/SearchBar.vue";
import SearchResult from "../components/SearchResult.vue";
</script>

<style></style>
