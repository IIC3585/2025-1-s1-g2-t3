<script lang="ts">
  import TextInput from '$lib/TextInput.svelte';
  import CurrencyConverter from '$lib/CurrencyConverter.svelte';
  let inputValue = "";
</script>

<main class="p-6">
  <h1 class="text-2xl font-bold mb-4">Ejemplo de Input con Tailwind</h1>
  <TextInput
    label="Nombre"
    placeholder="Ingresa tu nombre"
    bind:value={inputValue}
  />
  <p class="mt-4 text-gray-600">Valor actual: {inputValue}</p>

  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-100 p-6">
    <CurrencyConverter />
  </div>
</main>
