import { useQuery } from '@tanstack/react-query';
import { fetchTickersPricesAndUpdateLocalStorage } from "../helps/dataHelps.js";

export function useTickersPrice() {
    // Используем массив в качестве queryKey и возвращаемые данные из запроса
    const { data: tickersPrice } = useQuery({
        queryKey: ['miningTickersPrice'], // Используем массив в качестве queryKey
        queryFn: fetchTickersPricesAndUpdateLocalStorage,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    // Проверяем, что данные не равны undefined
    if (tickersPrice === undefined) {
        // Возвращаем null или другое значение, которое указывает на загрузку данных
        return null;
    }

    // Возвращаем полученные данные
    return tickersPrice;
}
