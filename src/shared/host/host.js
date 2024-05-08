const proxy = "https://corsproxy.io/?";
// export const host = `${proxy}https://grandtrade.space`
export const host = process.env.NODE_ENV === 'production' ? `` : `${proxy}https://e882-31-31-26-125.ngrok-free.app`;