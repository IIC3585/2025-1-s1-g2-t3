<script lang="ts">
  import TextInput from '$lib/TextInput.svelte';
  import CurrencyConverter from '$lib/CurrencyConverter.svelte';
  let inputValue = "";
</script>

<main class="p-6">
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-100 p-6">
    <CurrencyConverter />
  </div>
</main>
