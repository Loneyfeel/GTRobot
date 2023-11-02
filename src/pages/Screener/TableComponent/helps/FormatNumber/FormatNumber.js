//Получение числового cd
export function formatWordToNumber(cd) {
    // Регулярное выражение для поиска числа и буквы в конце
    const regex = /(\d+)([KM])$/;
    // Используем регулярное выражение для извлечения числа и буквы
    const match = cd.match(regex);
    if (match) {
        const number = parseFloat(match[1]);
        const unit = match[2];
        // Преобразуем букву в множитель (K - 1000, M - 1000000)
        const multiplier = unit === 'K' ? 1000 : unit === 'M' ? 1000000 : 1;
        // Умножаем число на множитель
        return number * multiplier;
    }
    // Если совпадений не найдено, возвращаем исходное значение
    return parseFloat(cd);
}




// сокращение цифр
export function formatNumber(number) {
    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
        return `${(number / 1000).toFixed(0)}K`;
    } else {
        return number;
    }
}