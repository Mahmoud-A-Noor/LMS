
export function formatNumber(number: number, options?:  Intl.NumberFormatOptions){
    const formatter = new Intl.NumberFormat(undefined, options)
    return formatter.format(number)
}