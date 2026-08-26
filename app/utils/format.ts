export function formatPercent(value: number | string) {
    const num = Number(value);
    // shows "10%" for 10.0000, "12.5%" for 12.5000, "12.53%" for 12.532
    return `${parseFloat(num.toFixed(2))}%`;
}