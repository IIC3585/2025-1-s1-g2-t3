// src/stores/useCurrencyStore.ts
import { defineStore } from 'pinia'
import { getExchangeRate } from './useExchangeRate.ts'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    fromCurrency: 'CLP',
    toCurrency: 'USD',
    amount: 0,
    exchangeRate: 1,
    currencies: ['USD', 'CLP', 'MXN', 'EUR', 'ARS'] as string[],
    extraConversions: [] as string[],
    extraRates: {} as Record<string, number>

  }),

  getters: {
    convertedAmount(state): string {
      if (state.fromCurrency === state.toCurrency) return `${state.amount}`
      return (state.amount * state.exchangeRate).toFixed(2)
    }
  },

  actions: {
    async fetchRate(from: string, to: string) {
      const rate = await getExchangeRate(from, to)
      console.log(`Tasa solicitada de ${this.fromCurrency} a ${to}:`, rate)
      if (!isNaN(rate)) {
        this.exchangeRate = rate
      } else {
        console.warn(`No se pudo obtener la tasa entre ${from} y ${to}`)
        this.exchangeRate = 1
      }
      //this.exchangeRate = Math.random() * (1.5 - 0.5) + 0.5
    },

    async fetchExtraRate(to: string) {
      if (!this.fromCurrency || !to) return
      const rate = await getExchangeRate(this.fromCurrency, to)
      if (!isNaN(rate)) {
        this.extraRates[to] = rate
      } else {
        console.warn(`No se pudo obtener la tasa entre ${this.fromCurrency} y ${to}`)
      }
    },

    // convertExtra(currency: string): string {
    //   // if (currency === this.fromCurrency) return `${this.amount}`
    //   // return (this.amount * this.exchangeRate).toFixed(2)
    //   if (currency === this.fromCurrency) return `${this.amount}`
    //   const rate = this.extraRates[currency]
    //   if (!rate) return '...'
    //   return (this.amount * rate).toFixed(2)
    // },
    convertExtra(to: string): string {
      const rate = this.extraRates[to]
      if (rate === undefined) return '...'
      return (this.amount * rate).toFixed(2)
    },

    swapCurrencies() {
      const temp = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = temp
    },

    async addExtraConversion() {
      // const defaultCurrency = this.currencies.find(c => c !== this.fromCurrency && c !== this.toCurrency && !this.extraConversions.includes(c))
      // this.extraConversions.push(defaultCurrency || this.currencies[0])
        const defaultCurrency = this.currencies.find(c => 
        c !== this.fromCurrency &&
        c !== this.toCurrency &&
        !this.extraConversions.includes(c)
      )

      const newCurrency = defaultCurrency || this.currencies[0]

      if (!this.extraConversions.includes(newCurrency)) {
        this.extraConversions.push(newCurrency)
        await this.fetchExtraRate(newCurrency)
      }
    },

    async updateAllExtraConversions(from: string, amount: number) {
      this.extraConversions = []
      for (const to of this.currencies) {
        if (to !== this.toCurrency && to !== this.fromCurrency) {
          const rate = await getExchangeRate(from, to)
          if (!isNaN(rate)) {
            this.extraRates[to] = rate
            this.extraConversions.push(to)}
           } else {
          // También mostramos la misma moneda para referencia
          this.extraRates[to] = 1
          this.extraConversions.push(to)
        }
      }
    },

    removeExtraConversion(index: number) {
      this.extraConversions.splice(index, 1)
    }
  }
})
