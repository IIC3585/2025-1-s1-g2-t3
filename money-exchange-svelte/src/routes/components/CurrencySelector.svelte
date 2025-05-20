<!-- src/components/CurrencySelector.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import { tick } from 'svelte'

  export let modelValue: string
  export let currencies: string[] = []
  export let placeholder: string = ''

  const dispatch = createEventDispatcher()
  let input = modelValue
  let showList = false
  let rootEl: HTMLElement

  $: if (input !== modelValue && currencies.includes(input.toUpperCase())) {
    dispatch('update:modelValue', input.toUpperCase())
  }

  $: filteredCurrencies = currencies.filter((c) =>
    c.toLowerCase().includes(input.toLowerCase())
  )

  function selectCurrency(currency: string) {
    input = currency
    dispatch('update:modelValue', currency)
    showList = false
  }

  function handleClickOutside(event: MouseEvent) {
    if (!rootEl.contains(event.target as Node)) {
      showList = false
    }
  }

  onMount(() => {
    window.addEventListener('click', handleClickOutside)
  })

  onDestroy(() => {
    window.removeEventListener('click', handleClickOutside)
  })

  $: modelValue = input // keep sync
</script>

<div class="relative w-36" bind:this={rootEl}>
  <input
    type="text"
    bind:value={input}
    on:focus={() => (showList = true)}
    placeholder={placeholder}
    class="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  {#if showList && filteredCurrencies.length}
    <ul class="absolute z-10 mt-1 bg-white border rounded-md shadow w-full max-h-40 overflow-auto">
      {#each filteredCurrencies as currency}
        <li>
            <button
                type="button"
                on:mousedown|preventDefault={() => selectCurrency(currency)}
                class="w-full text-left px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
                {currency}
            </button>
        </li>

      {/each}
    </ul>
  {/if}
</div>
