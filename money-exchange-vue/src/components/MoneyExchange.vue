<script setup lang="ts">
import { ref, onMounted, watch} from 'vue'
import CurrencySelector from './CurrencySelector.vue'

const fromCurrency = ref('CLP')
const toCurrency = ref('USD')
const amount = ref(0)
const convertedAmount = ref(0)

const currencies = ref(['USD', 'CLP', 'MXN', 'EUR', 'ARS']) // Aqui deberia existir el llamado a la API o algo asi

const exchangeRate = ref(1.9) // Obtener el tipo de cambio de la API

const fetchCurrencies = async () => {}

const fetchRate = async (from, to) => {}

const convertAmount = () => {
  if (fromCurrency.value === toCurrency.value) {
    convertedAmount.value = amount.value
  } else {
    convertedAmount.value = (amount.value * exchangeRate.value).toFixed(2)
  }
}

const swapCurrencies = () => {
  const temp = fromCurrency.value
  fromCurrency.value = toCurrency.value
  toCurrency.value = temp
}


const extraConversions = ref<string[]>([])

const addExtraConversion = () => {
  // Agrega una moneda por defecto distinta si es posible
  const defaultCurrency = currencies.value.find(c => c !== toCurrency.value && c !== fromCurrency.value)
  extraConversions.value.push(defaultCurrency || currencies.value[0])
}

const convertExtra = (currency: string): string => {
  if (currency === fromCurrency.value) return `${amount.value}`
  // Simulación simple usando exchangeRate, deberías usar otra lógica/API en producción
  return (amount.value * exchangeRate.value).toFixed(2)
}

watch([fromCurrency, toCurrency, amount], () => {
  convertAmount()
})

onMounted(() => {
  fetchRate(fromCurrency.value, toCurrency.value)
})
</script>

<template>
  <div class="bg-gradient-to-br flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <!-- Título -->
      <h1 class="text-2xl font-bold text-gray-800 text-center">
        🌍 Conversor de Monedas
      </h1>

      <!-- Contenedor de conversión -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Resultado -->
        <div class="text-xl font-medium text-gray-700 whitespace-nowrap">
          💰 {{ amount }} {{ fromCurrency }} = <span class="font-semibold text-green-600">{{ convertedAmount }} {{ toCurrency }}</span>
        </div>

        <!-- Controles -->
        <div class="flex items-center gap-2 flex-wrap justify-end">
          <!-- Monto -->
          <input
            v-model.number="amount"
            type="number"
            min="0"
            class="w-24 px-3 py-2 border rounded-xl text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <!-- Moneda origen -->

          <CurrencySelector
            v-model="fromCurrency"
            :currencies="currencies"
            placeholder="Moneda Origen"
            />

          <!-- Botón intercambio -->
          <button
            @click="swapCurrencies"
            class="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full shadow-sm transition"
          >
            ↔️
          </button>

          <!-- Moneda destino -->

          <CurrencySelector
            v-model="toCurrency"
            :currencies="currencies"
            placeholder="Moneda Destino"
            />
        </div>
      </div>
      <!-- Boton para agregar conversiones extras usando las que estan -->
        <!-- Conversiones extra -->
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
            {{ amount }} {{ fromCurrency }} = <span class="font-semibold text-blue-600">{{ convertExtra(currency) }} {{ currency }}</span>
            </span>

            <!-- Eliminate Extra Currency -->
            <button
            @click="extraConversions.splice(index, 1)"
            class="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full shadow-sm transition"
            >
            ❌
            </button>

        </div>
        </div>

        <!-- Botón para agregar conversiones extras -->
        <div class="flex justify-center">
        <button
            @click="addExtraConversion"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-2xl"
        >
            Agregar conversiones extras
        </button>
        </div>     

    </div>
  </div>
</template>
