import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchDataAndUpdateLocalStorageInSession } from '../helps/dataHelps';
import { testData } from '../testData/testData.js';
import { useLocalStorage } from '@uidotdev/usehooks';

export function useFetchDataAndUpdateLocalStorage() {
    const { data: userData = testData.userData } = useQuery('userData', fetchDataAndUpdateLocalStorageInSession, {
        refetchOnMount: false, // Отключить повторный запрос при монтировании
        refetchOnWindowFocus: false, // Отключить повторный запрос при фокусировке на окне
    });
    const [, setValue] = useLocalStorage('miningUserData', userData);

    useEffect(() => {
        setValue(userData);
    }, [userData, setValue]);

    return userData;
}