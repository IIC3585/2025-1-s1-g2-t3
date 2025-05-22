export async function getExchangeRate(from: string, to: string): Promise<number> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (!res.ok) throw new Error('Error al obtener las tasas');
    
    const data = await res.json();
    return data.rates[to];
  } catch (err) {
    console.error('Error al consultar ExchangeRate API:', err);
    return NaN;
  }
}
