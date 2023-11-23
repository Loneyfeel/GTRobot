
import React, {useEffect, useState} from 'react'
import TableComponent from "./TableComponents/index.js";
import {formatWordToNumber} from "./TableComponents/helps/FormatNumber/FormatNumber.js";
import axios from "axios";


const proxy = 'https://corsproxy.io/?'

const Screener = () => {
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.post(`/api/screener`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                const apiData = response.data;
                const dataWithFormattedCD = apiData.map(item => ({
                    ...item,
                    cd: formatWordToNumber(item.cd),
                }));
                setData(dataWithFormattedCD);
            } else {
                console.error('Ошибка при получении данных');
            }
        } catch (error) {
            console.error('Ошибка при получении данных: ', error);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <TableComponent data={data}/>
        </>
    )
}

export default Screener