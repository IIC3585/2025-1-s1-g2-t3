// src/stores/useCurrencyStore.ts
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    fromCurrency: 'CLP',
    toCurrency: 'USD',
    amount: 0,
    exchangeRate: 1,
    currencies: ['USD', 'CLP', 'MXN', 'EUR', 'ARS'] as string[],
    extraConversions: [] as string[]
  }),

  getters: {
    convertedAmount(state): string {
      if (state.fromCurrency === state.toCurrency) return `${state.amount}`
      return (state.amount * state.exchangeRate).toFixed(2)
    }
  },

  actions: {
    async fetchRate(from: string, to: string) {
      // Aquí puedes usar tu API real
      // Esta parte es solo un ejemplo fijo
      this.exchangeRate = Math.random() * (1.5 - 0.5) + 0.5
    },

    convertExtra(currency: string): string {
      if (currency === this.fromCurrency) return `${this.amount}`
      return (this.amount * this.exchangeRate).toFixed(2)
    },

    swapCurrencies() {
      const temp = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = temp
    },

    addExtraConversion() {
      const defaultCurrency = this.currencies.find(c => c !== this.fromCurrency && c !== this.toCurrency && !this.extraConversions.includes(c))
      this.extraConversions.push(defaultCurrency || this.currencies[0])
    },

    removeExtraConversion(index: number) {
      this.extraConversions.splice(index, 1)
    }
  }
})
