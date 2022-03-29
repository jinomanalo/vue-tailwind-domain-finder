<template>
  <div
    class="p-5 border-b-2 border-slate-100 flex items-center space-x-6 bg-white"
  >
    <!-- Branding -->
    <div
      @click="$router.push('/')"
      class="transition ease-in-out hover:cursor-pointer hover:text-emerald-400 text-emerald-500 font-brand text-2xl tracking-wide"
    >
      TinyURL
    </div>
    <div class="text-gray-300">|</div>
    <div class="font-semibold flex-1">Domain Finder</div>
    <a
      href="https://tinyurl.com/"
      class="hidden md:block transition ease-in-out font-semibold text-sm px-6 py-1 rounded-full text-gray-400 border-2 border-transparent hover:cursor-pointer hover:border-green-400 hover:text-green-500"
    >
      Go to our Website ->
    </a>
  </div>
</template>

<script setup></script>

<style></style>
