export function formatPrice(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export function formatNumber(n) {
  return n.toLocaleString("en-US");
}

// "1 item" / "2 items"
export function plural(n, word) {
  return `${formatNumber(n)} ${word}${n === 1 ? "" : "s"}`;
}

export const FREE_SHIPPING_LIMIT = 150;
export const SHIPPING_COST = 8;

export function calcTotals(items) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function gradientFor(hue) {
  return `linear-gradient(135deg, hsl(${hue} 90% 94%), hsl(${hue + 35} 85% 82%))`;
}
