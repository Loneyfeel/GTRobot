import {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import { checkUserExists } from '../helps/dataHelps.js';
import { testData } from "../testData/testData.js";

export function useUserExists() {
    const [isLoading, setIsLoading] = useState(true);
    const [isUserExists, setIsUserExists] = useState(testData.userExits); // Используйте начальное значение из testData

    const { data: userData, isLoading: userExistsLoading } = useQuery('userExists', checkUserExists, {
        refetchOnMount: false, // Отключить повторный запрос при монтировании
        refetchOnWindowFocus: false, // Отключить повторный запрос при фокусировке на окне
    });

    useEffect(() => {
        if (!userExistsLoading) {
            setIsLoading(false);
            setIsUserExists(userData || testData.userExits); // Используйте данные из ответа сервера, если они определены, в противном случае используйте начальное значение из testData
        }
    }, [userExistsLoading, userData]);

    return { isUserExists, isLoading, setIsUserExists };
}