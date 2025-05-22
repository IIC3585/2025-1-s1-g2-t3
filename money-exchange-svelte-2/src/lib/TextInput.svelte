<script lang="ts">
  export let label = "Escribe algo";
  export let placeholder = "Ingresa texto...";
  export let value = "";
  export let onInput = (e: Event) => {};
</script>

<div class="mb-4">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  <input
    type="text"
    class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder={placeholder}
    bind:value
    on:input={onInput}
  />
</div>
