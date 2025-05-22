<script lang="ts">
    import { onMount } from 'svelte';
    import { getExchangeRate } from '$lib/api/exchangeRate';

    export let amount = 500;
    export let from = 'CLP';
    export let to = 'USD';

    let rate = 0;
    let result = '';
    let resultColor = 'text-green-600';

    const currencies = ['CLP', 'USD', 'EUR', 'ARS', 'MXN'];

    async function fetchRate() {
    rate = await getExchangeRate(from, to);
    calculate();
    }

    function calculate() {
    const converted = from === to ? amount : amount * rate;
    result = converted.toFixed(2);
    resultColor = from === to ? 'text-blue-500' : 'text-green-600';
    }

    // Cargar al iniciar
    onMount(fetchRate);

    // Reactividad: si cambia moneda o monto, recarga
    $: if (from && to && amount >= 0) {
    fetchRate();
    }

</script>

<div class="bg-white shadow-md rounded-xl p-6 space-y-4 w-full max-w-xl mx-auto">
  <h1 class="text-2xl font-bold text-center flex items-center justify-center gap-2">
    🌍 Conversor de Monedas
  </h1>

  <div class="text-lg text-center font-semibold">
    💰 {amount} {from} = 
    <span class={resultColor}>{result} {to}</span>
  </div>

  <div class="flex items-center justify-center gap-2 flex-wrap">
    <input
      type="number"
      bind:value={amount}
      class="px-4 py-2 border rounded-md shadow-sm w-24 text-center"
    />
    
    <select bind:value={from} class="px-3 py-2 border rounded-md shadow-sm">
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>

    <div class="text-xl">➡️</div>

    <select bind:value={to} class="px-3 py-2 border rounded-md shadow-sm">
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </div>

  <div class="space-y-2">
    {#each ['USD', 'CLP', 'USD'] as extraTo}
      <div class="flex items-center gap-2 justify-center">
        <select class="px-3 py-2 border rounded-md shadow-sm">
          <option>{extraTo}</option>
        </select>
        <span>{amount} {from} = <span class={resultColor}>{result} {extraTo}</span></span>
      </div>
    {/each}
  </div>

  <div class="text-center">
    <button class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold">
      Agregar conversiones extras
    </button>
  </div>
</div>
