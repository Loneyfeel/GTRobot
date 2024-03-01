import { useQuery } from 'react-query';
import { fetchDataAndUpdateLocalStorage } from '../helps/dataHelps';
import {useEffect, useState} from "react";

export function useFetchDataAndUpdateLocalStorage() {

    const [userDataLoading, setUserDataLoading] = useState(true)

    const { isLoading: isUserDataLoading } = useQuery('userData', () => fetchDataAndUpdateLocalStorage(), {
        refetchOnMount: false, // Отключить повторный запрос при монтировании
        refetchOnWindowFocus: false, // Отключить повторный запрос при фокусировке на окне
    });
    useEffect(() => {
        if (!isUserDataLoading) {
            setUserDataLoading(false);
        }
    },[isUserDataLoading])
    return userDataLoading
}
