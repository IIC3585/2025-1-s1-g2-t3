<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">💱 Conversor de Monedas</h1>

    <div class="flex gap-2 mb-4">
      <input v-model.number="amount" type="number" class="border px-4 py-2 rounded w-24" />
      <select v-model="from" class="border px-2 py-2 rounded">
        <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
      </select>
      <span class="text-xl">➡️</span>
      <select v-model="to" class="border px-2 py-2 rounded">
        <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="text-lg font-semibold">
      {{ amount }} {{ from }} = <span class="text-green-600">{{ result }} {{ to }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getExchangeRate } from '@/stores/useExchangeRate';

const currencies = ['CLP', 'USD', 'EUR', 'ARS', 'MXN'];
const amount = ref(500);
const from = ref('CLP');
const to = ref('USD');
const rate = ref<number>(1);
const result = ref('0.00');

async function updateRate() {
  if (from.value === to.value) {
    rate.value = 1;
  } else {
    rate.value = await getExchangeRate(from.value, to.value);
  }
  result.value = (amount.value * rate.value).toFixed(2);
}

// Recalcula cuando cambian valores
watch([amount, from, to], updateRate, { immediate: true });
</script>
