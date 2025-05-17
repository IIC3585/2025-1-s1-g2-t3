<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount  } from 'vue'

const props = defineProps<{
  modelValue: string
  currencies: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const input = ref('')
const showList = ref(false)
const rootEl = ref<HTMLElement | null>(null)

watch(() => props.modelValue, (val) => {
  input.value = val
})

watch(input, (val) => {
  if (props.currencies.includes(val.toUpperCase())) {
    emit('update:modelValue', val.toUpperCase())
  }
})

const filteredCurrencies = computed(() =>
  props.currencies.filter((c) =>
    c.toLowerCase().includes(input.value.toLowerCase())
  )
)

const selectCurrency = (currency: string) => {
  emit('update:modelValue', currency)
  input.value = currency
  showList.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) {
    showList.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

</script>

<template>
  <div class="relative w-36" ref="rootEl">
    <input
      v-model="input"
      @focus="showList = true"
      type="text"
      :placeholder="placeholder"
      class="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <ul
      v-if="showList && filteredCurrencies.length"
      class="absolute z-10 mt-1 bg-white border rounded-md shadow w-full max-h-40 overflow-auto"
    >
      <li
        v-for="currency in filteredCurrencies"
        :key="currency"
        @mousedown.prevent="selectCurrency(currency)"
        class="px-3 py-2 hover:bg-blue-100 cursor-pointer"
      >
        {{ currency }}
      </li>
    </ul>
  </div>
</template>