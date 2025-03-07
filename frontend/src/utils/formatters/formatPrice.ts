export function formatPrice(amount: number, showZeroAsNumber:boolean = false){
    const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    });

    if(amount === 0 && !showZeroAsNumber) return "Free";
    return formatter.format(amount);
}