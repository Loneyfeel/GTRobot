const proxy = "https://corsproxy.io/?";
// export const host = `${proxy}https://3bc2-62-221-71-173.ngrok-free.app`
// export const host = `${proxy}https://grandtrade.space`
export const host = process.env.NODE_ENV === 'production' ? '' : `${proxy}https://8564-62-221-71-173.ngrok-free.app`;