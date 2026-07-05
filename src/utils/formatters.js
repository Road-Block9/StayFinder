export function formatCurrency(value) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return 'Price unavailable';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPriceNumber(value) {
  const price = Number(value);
  return Number.isNaN(price) ? 0 : price;
}

export function getShortDescription(description, length = 145) {
  if (!description) {
    return 'A comfortable stay with thoughtful service and easy access to the city.';
  }

  return description.length > length ? `${description.slice(0, length).trim()}...` : description;
}
