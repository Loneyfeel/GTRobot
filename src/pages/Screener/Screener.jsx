import style from './screener.module.sass'
import React, {useEffect, useState} from 'react'
import TableComponent from "./TableComponent"
import {formatWordToNumber} from "./TableComponent/helps/FormatNumber/FormatNumber.js"

const proxy = 'https://corsproxy.io/?'

const Screener = () => {
    // состояние для хранения данных, полученных из API
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
                        return { ...item, cd }
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

    console.log(data)
    return (
        <>
            <div className={style.screener}>
                <TableComponent data={data}/>
            </div>
        </>
    )
}

export default Screener