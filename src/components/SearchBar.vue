<template>
  <div class="m-auto flex flex-col max-w-4xl">
    <div class="w-full flex-1 flex items-center">
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
      <Popover v-slot="{ open }" class="relative">
        <PopoverButton
          :class="
            open
              ? 'bg-slate-300'
              : ' bg-slate-200 hover:bg-slate-300 text-opacity-90 text-gray-500'
          "
          class="transition ease-in-out inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-xl font-medium group hover:text-opacity-100 focus:outline-none focus:ring focus:ring-inset focus:ring-gray-300"
        >
          TLDs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </PopoverButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute z-10 w-screen max-w-3xl px-4 my-3 transform -translate-x-1/2 left-1/2"
          >
            <div
              class="overflow-auto h-72 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 grid gap-1 grid-cols-4 bg-white p-4"
            >
              <div
                v-for="(item, i) in searchStore._tlds"
                :key="i"
                @click="handleTLDSelect(item)"
                class="transition ease-in-out relative p-3 border border-transparent hover:cursor-pointer hover:border-gray-200 rounded-lg"
                :class="[
                  isTLDSelected(item)
                    ? 'bg-slate-100 hover:bg-slate-100 text-indigo-700'
                    : 'hover:bg-slate-50 ',
                ]"
              >
                <p class="text-sm font-semibold">
                  {{ item }}
                </p>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>

      <Popover v-slot="{ open }" class="relative">
        <PopoverButton
          :class="
            open
              ? 'bg-slate-300'
              : ' bg-slate-200 hover:bg-slate-300 text-opacity-90 text-gray-500'
          "
          class="transition ease-in-out inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-xl font-medium group hover:text-opacity-100 focus:outline-none focus:ring focus:ring-inset focus:ring-gray-300"
        >
          Bulk Groups
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </PopoverButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute z-10 w-screen max-w-3xl px-4 my-3 transform md:-translate-x-1/2 md:left-1/2"
          >
            <div
              class="overflow-auto h-72 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 grid gap-1 grid-cols-2 bg-white p-4"
            >
              <div
                v-for="(item, i) in searchStore._bulkGroups"
                :key="i"
                @click="handleBulkGroupSelect(item)"
                class="transition ease-in-out relative p-3 border border-transparent hover:cursor-pointer hover:border-gray-200 rounded-lg"
                :class="[
                  isBulkGroupSelected(item)
                    ? 'bg-slate-100 hover:bg-slate-100 '
                    : 'hover:bg-slate-50 ',
                ]"
              >
                <p class="text-sm font-semibold text-indigo-700">
                  {{ item.title }}
                </p>
                <p class="text-sm">
                  {{ truncateGroupItems(item) }}
                </p>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
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
    <div class="mt-4">
      <div v-if="uniqueSelectedTLDs.length > 0" class="m-1 font-medium text-sm">
        {{ uniqueSelectedTLDs.length }} Selected TLD/s:
      </div>
      <div class="flex items-center flex-wrap">
        <div
          v-for="(tld, t) in uniqueSelectedTLDs"
          :key="t"
          class="transition ease-in-out text-sm px-3 py-1 m-1 rounded bg-indigo-100 text-indigo-600 font-semibold text-center truncate flex items-center space-x-2"
        >
          <span> {{ tld }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "../stores/search";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";

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

    if (searchStore.results.length === 0) {
      searchStore.load(inputSearch.value);
    }
  }
}

const { selectedTLDs, selectedBulkGroup, uniqueSelectedTLDs } =
  storeToRefs(searchStore);

function isTLDSelected(value) {
  return uniqueSelectedTLDs.value.find((el) => el === value) ? true : false;
}

function handleTLDSelect(value) {
  if (!isTLDSelected(value)) {
    selectedTLDs.value.push(value);
    return;
  }
  handleTLDDeselect(value);
}

function handleTLDDeselect(value) {
  const selectedTLDUpdated = selectedTLDs.value.filter((el) => el !== value);
  selectedTLDs.value = selectedTLDUpdated;
}

function truncateGroupItems(bulkGroup) {
  if (bulkGroup.items.length > 6) {
    let items = bulkGroup.items.filter((item, g) => g <= 5);

    items.push("any many more...");
    return items.join(", ");
  }

  return bulkGroup.items.join(", ");
}

function isBulkGroupSelected(value) {
  return selectedBulkGroup.value.find((el) => el.title === value.title)
    ? true
    : false;
}

function handleBulkGroupSelect(value) {
  if (!isBulkGroupSelected(value)) {
    selectedBulkGroup.value.push(value);
    return;
  }
  handleBulkGroupDeselect(value);
}

function handleBulkGroupDeselect(value) {
  const selectedBulkGroupUpdated = selectedBulkGroup.value.filter(
    (el) => el.title !== value.title
  );
  selectedBulkGroup.value = selectedBulkGroupUpdated;
}

onMounted(() => {
  useTriggerInputSearchFocus();
  useShowInputSearchValue();
});
</script>

<style></style>
