<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MoneyExchange from './components/MoneyExchange.vue'
</script>

<template>
  <div class="min-h-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
    <header class="py-6 shadow-md bg-white">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-800 text-center">💱 Money Exchange</h1>
      </div>
    </header>

    <main class="flex items-center justify-center h-full w-full">
      <MoneyExchange />
    </main>
  </div>
</template>

<style scoped>
</style>
