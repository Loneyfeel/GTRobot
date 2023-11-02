export const data = Array.from({ length: 250 }, (_, index) => ({
    name: `Na${index + 1}`,
    raz: Math.floor(Math.random() * 150) + 1,
    price: parseFloat((Math.random() * 50000).toFixed(2)),
    сd: Math.floor(Math.random() * 19990001) + 1000,
    dal: parseFloat((Math.random() * 10).toFixed(2)),
    // isRandomBoolean: Math.random() < 0.5,
}));