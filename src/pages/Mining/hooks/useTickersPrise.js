import { useQuery } from 'react-query';
import {fetchTickersPricesAndUpdateLocalStorage} from "../helps/dataHelps.js";

export function useTickersPrice (){
    // Используем useQuery для отправки запроса
    const { data: tickersPrice } = useQuery('miningTickersPrice', fetchTickersPricesAndUpdateLocalStorage, {
        refetchOnMount: false, // Отключить повторный запрос при монтировании
        refetchOnWindowFocus: false, // Отключить повторный запрос при фокусировке на окне
    });
}
