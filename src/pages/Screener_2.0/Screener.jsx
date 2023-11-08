
import React, {useEffect, useState} from 'react'
import TableComponent from "./TableComponents/index.js";
import {formatWordToNumber} from "./TableComponents/helps/FormatNumber/FormatNumber.js";


const proxy = 'https://corsproxy.io/?'

const Screener = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${proxy}https://gtrobot.ngrok.dev/api/screener`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    const apiData = await response.json()
                    // Применить formatWordToNumber к полю cd в каждом элементе массива, тк
                    const dataWithFormattedCD = apiData.map(item => {
                        const cd = formatWordToNumber(item.cd)
                        return {...item, cd}
                    })
                    // Обновить состояние setData с данными, в которых cd уже отформатирован
                    setData(dataWithFormattedCD)
                } else {
                    console.error('Ошибка при получении данных')
                }
            } catch (error) {
                console.error('Ошибка при получении данных: ', error)
            }
        }

        fetchData()
        // Установка интервала для обновления данных каждые 5 секунд
        const intervalId = setInterval(fetchData, 5000)
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId)
    }, [])
    return (
        <>
            <TableComponent data={data}/>
        </>
    )
}

export default Screener