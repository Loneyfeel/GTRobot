export const data = Array.from({ length: 250 }, (_, index) => ({
    name: `Na${index + 1}`,
    power: Math.floor(Math.random() * 150) + 1,
    price: parseFloat((Math.random() * 50000).toFixed(2)),
    density: Math.floor(Math.random() * 19990001) + 1000,
    quantity: Math.floor(Math.random() * 199900) + 100,
    change: Math.floor(Math.random() * 150) + 1,
    distance: parseFloat((Math.random() * 10).toFixed(2)),
    isRandomBoolean: Math.random() < 0.5,
}));