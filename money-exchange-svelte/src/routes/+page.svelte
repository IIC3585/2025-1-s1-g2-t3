<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  import {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    currencies,
    extraConversions,
    fetchRate
  } from '../stores/useCurrencyStore'
//   import CurrencySelector from '../components/CurrencySelector.svelte'

import CurrencySelector from '../routes/components/CurrencySelector.svelte'

console.log('currencies', currencies)

  $: fetchRate($fromCurrency, $toCurrency)

  onMount(() => {
    fetchRate($fromCurrency, $toCurrency)
  })
</script>

<div class="flex flex-col items-center gap-6 p-6">
  <div class="flex gap-4">
    <CurrencySelector bind:modelValue={$fromCurrency} {$currencies} placeholder="From" />
    <CurrencySelector bind:modelValue={$toCurrency} {$currencies} placeholder="To" />
  </div>

  <input
    type="number"
    bind:value={$amount}
    min="0"
    class="px-4 py-2 border rounded-xl shadow"
  />

  <p class="text-lg">
    {{$amount}} {{$fromCurrency}} = <strong>{{$convertedAmount}} {{$toCurrency}}</strong>
  </p>

  <div class="grid grid-cols-2 gap-2">
    {#each Object.entries($extraConversions) as [currency, value]}
      <div class="p-2 border rounded-xl shadow text-sm">
        {{$amount}} {{$fromCurrency}} = {value} {currency}
      </div>
    {/each}
  </div>
</div>
