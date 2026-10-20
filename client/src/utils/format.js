// The old site header showed the Italian date of the day, the same line lives
// in the new header as a small nod to the original shop site.
export function formatItalianDate(date = new Date()) {
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Money is always shown in euro with Italian formatting, for example "90 €".
const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatEuro(value) {
  return euro.format(value);
}
