//The function `InrCurrency` formats a given amount as Indian Rupee currency with Indian Rupee symbol (₹).
export const InrCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount)
}
