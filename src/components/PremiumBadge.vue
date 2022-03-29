<template>
  <span
    v-if="props.data?.premium"
    class="bg-amber-400 text-white text-xs uppercase ml-2 px-2 py-1 font-medium tracking-widest rounded"
  >
    Premium
  </span>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});
</script>

<style></style>
