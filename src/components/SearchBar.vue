<template>
  <div class="m-auto flex items-center max-w-2xl">
    <div class="flex-1 flex">
      <label
        for="search-input"
        class="hidden md:block absolute self-center px-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </label>
      <input
        required
        id="search-input"
        ref="refSearch"
        v-model="inputSearch"
        @keyup.enter="useRouteToSearchView"
        type="text"
        placeholder="Type a domain name or search term"
        class="w-full transition ease-in-out focus:outline-none focus:ring focus:ring-inset focus:ring-emerald-200 bg-slate-100 text-lg md:text-xl px-6 py-3 md:pl-16 md:pr-8 md:py-4 rounded-l-xl"
      />
    </div>
    <button
      type="button"
      class="transition ease-in-out focus:outline-none focus:ring focus:ring-inset focus:ring-emerald-200 hover:bg-emerald-500 active:bg-emerald-600 bg-emerald-400 px-6 py-3 md:px-8 md:py-4 text-white rounded-r-xl text-xl font-medium"
      @click="useRouteToSearchView"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-white block md:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span class="hidden md:block">Search</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "../stores/search";

const router = useRouter();
const route = useRoute();
const searchStore = useSearchStore();

const inputSearch = ref();
const refSearch = ref();

function useRouteToSearchView() {
  if (!inputSearch.value) return;

  searchStore.load(inputSearch.value);

  router.push({
    path: "/search-view",
    query: {
      searchKeyword: inputSearch.value,
    },
  });
}

function useTriggerInputSearchFocus() {
  refSearch.value.focus();
}

function useShowInputSearchValue() {
  let keyword = route.query?.searchKeyword;
  if (keyword) {
    inputSearch.value = keyword;
  }
}

onMounted(() => {
  useTriggerInputSearchFocus();
  useShowInputSearchValue();
});
</script>

<style></style>
