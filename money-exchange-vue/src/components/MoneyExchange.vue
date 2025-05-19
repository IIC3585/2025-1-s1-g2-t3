<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import CurrencySelector from './CurrencySelector.vue'

const currencyStore = useCurrencyStore()
const {
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  currencies,
  extraConversions
} = storeToRefs(currencyStore)

watch([fromCurrency, toCurrency, amount], () => {
  currencyStore.fetchRate(fromCurrency.value, toCurrency.value)
})

onMounted(() => {
  currencyStore.fetchRate(fromCurrency.value, toCurrency.value)
})
</script>

<template>
  <div class="bg-gradient-to-br flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">
        🌍 Conversor de Monedas
      </h1>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-xl font-medium text-gray-700 whitespace-nowrap">
          💰 {{ amount }} {{ fromCurrency }} =
          <span class="font-semibold text-green-600">{{ convertedAmount }} {{ toCurrency }}</span>
        </div>

        <div class="flex items-center gap-2 flex-wrap justify-end">
          <input
            v-model.number="amount"
            type="number"
            min="0"
            class="w-24 px-3 py-2 border rounded-xl text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <CurrencySelector
            v-model="fromCurrency"
            :currencies="currencies"
            placeholder="Moneda Origen"
          />

          <button
            @click="currencyStore.swapCurrencies"
            class="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full shadow-sm transition"
          >
            ↔️
          </button>

          <CurrencySelector
            v-model="toCurrency"
            :currencies="currencies"
            placeholder="Moneda Destino"
          />
        </div>
      </div>

      <div v-if="extraConversions.length" class="flex flex-col gap-2">
        <div
          v-for="(currency, index) in extraConversions"
          :key="index"
          class="flex items-center gap-3 justify-center"
        >
          <CurrencySelector
            v-model="extraConversions[index]"
            :currencies="currencies"
          />

          <span class="text-gray-700">
            {{ amount }} {{ fromCurrency }} =
            <span class="font-semibold text-blue-600">{{ currencyStore.convertExtra(currency) }} {{ currency }}</span>
          </span>

          <button
            @click="currencyStore.removeExtraConversion(index)"
            class="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full shadow-sm transition"
          >
            ❌
          </button>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="currencyStore.addExtraConversion"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-2xl"
        >
          Agregar conversiones extras
        </button>
      </div>
    </div>
  </div>
</template>
