<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
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

const automaticExtraConversions = computed(() =>
  currencies.value.filter(c => c !== toCurrency.value)
)
// watch([fromCurrency, toCurrency, amount], () => {
//   currencyStore.fetchRate(fromCurrency.value, toCurrency.value)
// })

watch([fromCurrency, toCurrency, amount], ([newFrom, newTo, newAmount], [oldFrom, oldTo, oldAmount]) => {
  if (newFrom && newTo && (newFrom !== oldFrom || newTo !== oldTo || newAmount !== oldAmount)) {
    currencyStore.fetchRate(newFrom, newTo)
    currencyStore.updateAllExtraConversions(fromCurrency.value, amount.value)
  }
})

onMounted(() => {
  currencyStore.fetchRate(fromCurrency.value, toCurrency.value)
  currencyStore.updateAllExtraConversions(fromCurrency.value, amount.value)
})
</script>

<template>
  <div class="bg-gradient-to-br flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">
        🌍 Conversor de Monedas
      </h1>

      <div class="flex flex-col gap-4 items-center justify-center">
        <div class="text-xl font-medium text-gray-700 text-center">
          💰 {{ amount }} {{ fromCurrency }} =
          <span class="font-semibold text-green-600">
            {{ convertedAmount }} {{ toCurrency }}
          </span>
        </div>

        <div class="flex items-center gap-2 flex-wrap justify-center">
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

      <div v-if="extraConversions.length" class="flex flex-col gap-2 mt-4">
        <div
          v-for="(currency, index) in extraConversions"
          :key="currency"
          class="text-center text-gray-700"
        >
          {{ amount }} {{ fromCurrency }} =
          <span class="font-semibold text-blue-600">
            {{ currencyStore.convertExtra(currency) }} {{ currency }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <template>
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
      </div> -->
      <!-- <div v-if="extraConversions.length" class="flex flex-col gap-2">
      <div
        v-for="(conversion, index) in extraConversions"
        :key="conversion.to"
        class="flex items-center gap-3 justify-center"
      >
        <span class="text-gray-700">
          {{ amount }} {{ fromCurrency }} =
          <span class="font-semibold text-blue-600">
            {{ conversion.result }} {{ conversion.to }}
          </span>
        </span>
      </div>
    </div>

      <div class="flex justify-center">

      </div>
    </div>
  </div>
</template> --> 
