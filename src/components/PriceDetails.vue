<template>
  <div
    v-if="data.purchasePrice === undefined && data.renewalPrice === undefined"
    class="text-xs md:text-sm"
  >
    Unavailable
  </div>
  <div v-else class="flex flex-col">
    <span class="font-semibold text-emerald-400 text-xl">
      {{ data?.purchasePrice ? `$${data.purchasePrice}` : "" }}
    </span>
    <span
      v-if="data?.renewalPrice !== data?.purchasePrice"
      class="text-gray-500 text-xs md:text-sm"
    >
      Renewal: {{ `$${data.renewalPrice}` }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});
</script>

<style></style>
