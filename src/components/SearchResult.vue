<template>
  <!-- Loading State -->
  <div
    v-if="searchStore.loadingState"
    class="absolute top-10 w-full flex justify-center"
  >
    <!-- Spinner -->
    <svg
      class="animate-spin h-8 w-8 md:h-10 md:w-10 text-slate-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>

  <!-- Main Result -->
  <div
    :class="[
      searchStore.loadingState ? 'animate-pulse blur-lg cursor-progress' : '',
    ]"
  >
    <div
      v-if="searchStore.results.length > 0 && exactMatchAvailability"
      class="mt-5 mx-3 px-3 py-3 bg-red-600 rounded-xl text-lg flex items-center text-red-200 font-medium space-x-2"
    >
      <div class="bg-red-700 p-2 rounded-xl text-red-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <span>
        Oops!
        <span class="font-semibold text-white">
          {{ searchStore.exactMatch.domainName }}
        </span>
        is taken
      </span>
    </div>

    <div
      v-if="searchStore.results.length > 0"
      class="transition ease-in-out flex flex-col mb-20 mt-8 mx-4 space-y-8"
    >
      <!-- Featured Domain -->
      <div
        v-if="featuredDomain !== undefined"
        class="flex items-center rounded-xl border border-emerald-200 ring ring-offset-2 ring-emerald-200 shadow-sm px-8 py-8"
      >
        <div class="flex-1 flex flex-col">
          <span
            class="flex items-center space-x-1 text-xs uppercase font-bold tracking-widest text-blue-500"
          >
            <span>Featured Domain</span>

            <!-- Badge Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="text-2xl md:text-3xl font-extrabold flex items-center">
            {{ featuredDomain.domainName }}
            <PremiumBadge :data="featuredDomain" />
          </span>
        </div>
        <div class="text-right">
          <div class="flex flex-col">
            <PriceDetails :data="featuredDomain" />
          </div>
        </div>
      </div>

      <!-- Main List  -->
      <div class="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div
          v-for="(item, i) in customSorting"
          :key="i"
          class="transition ease-in-out border-b border-slate-200 last:border-0 text-xl space hover:bg-slate-100 grid grid-cols-2 px-5 py-6 md:px-8 md:py-7"
          :class="[
            item.purchasePrice === undefined && item.renewalPrice === undefined
              ? 'text-gray-300'
              : 'text-gray-700',
          ]"
        >
          <!-- Domain Name -->
          <div class="flex-1 flex items-center font-bold">
            <span>{{ item.domainName }}</span>
            <PremiumBadge :data="item" />
          </div>

          <!-- Price Details -->
          <div class="text-right">
            <PriceDetails :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSearchStore } from "../stores/search";

import PremiumBadge from "./PremiumBadge.vue";
import PriceDetails from "./PriceDetails.vue";

const searchStore = useSearchStore();
const featuredDomain = computed(() => searchStore.featuredDomain);
const customSorting = computed(() => searchStore.customSorting);
const exactMatchAvailability = computed(() => {
  let result = false;

  if (Object.keys(searchStore.exactMatch).length > 0) {
    if (!searchStore.exactMatch?.purchasePrice && !searchStore?.renewalPrice) {
      result = true;
    }
  }

  return result;
});
</script>

<style></style>
