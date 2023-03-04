// Genera 10000 números aleatorios en un rango de 1 a 20
const randomNumbers = Array.from({length: 10000}, () => Math.floor(Math.random() * 20) + 1);

// Crea un objeto que contenga la cantidad de veces que cada número salió
const counts = {};
randomNumbers.forEach(number => {
    counts[number] = (counts[number] || 0) + 1;
});

// Imprime los resultados en la consola
console.log(counts);
