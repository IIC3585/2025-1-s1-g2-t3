import { writable } from 'svelte/store'

export const fromCurrency = writable('USD')
export const toCurrency = writable('CLP')
export const amount = writable(1)
export const convertedAmount = writable(0)
export const currencies = writable(['USD', 'CLP', 'EUR', 'BTC']) // Ejemplo
export const extraConversions = writable<Record<string, number>>({})

export const fetchRate = async (from: string, to: string) => {
  // tu lógica de fetch aquí
  // Ejemplo de tasa fija
  return Math.random() * (1.5 - 0.5) + 0.5
}
