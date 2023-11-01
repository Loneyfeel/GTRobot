import style from './table.module.sass'
import React, { useState } from 'react'
import TablePages from "./TablePages"
import {DownOutlined, UpOutlined} from "@ant-design/icons"
import {ButtonAnimation} from '../../../shared/ButtonAnimation/ButtonAnimation.js'

const TableComponent = ({ data }) => {
    const [sortKey, setSortKey] = useState('ticker')
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10 // Количество видимых строк

    // Функция для изменения порядка сортировки и ключа сортировки
    const toggleSortOrder = (key) => {
        if (key === sortKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortOrder('asc')
            setSortKey(key)
        }
    }
    // Сортировка данных
    const sortedData = data.slice() // Создаем копию массива
    sortedData.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1
        if (a[sortKey] < b[sortKey]) return -1 * order
        if (a[sortKey] > b[sortKey]) return 1 * order
        return 0
    })

    // Отображение данных для текущей страницы
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = sortedData.slice(startIndex, endIndex)

    //Для анимации нажатия
    const { handleClickAnim } = ButtonAnimation();

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th onClick={() => toggleSortOrder('name')}>
                        <div className={style.animation} onClick={handleClickAnim}></div>
                        <p>Монета</p>
                        <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='name'/>
                    </th>
                    <th onClick={() => toggleSortOrder('power')}>
                        <div className={style.animation} onClick={handleClickAnim}></div>
                        <p>Сила</p>
                        <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='power'/>
                    </th>
                    <th onClick={() => toggleSortOrder('price')}>
                        <div className={style.animation} onClick={handleClickAnim}></div>
                        <p>Цена</p>
                        <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='price'/>
                    </th>
                    <th onClick={() => toggleSortOrder('density')}>
                        <div className={style.animation} onClick={handleClickAnim}></div>
                        <p>Плотн</p>
                        <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='density'/>
                    </th>
                    {/*<th onClick={() => toggleSortOrder('quantity')}>*/}
                    {/*    <p>Монет</p>*/}
                    {/*    <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='quantity'/>*/}
                    {/*</th>*/}
                    {/*<th onClick={() => toggleSortOrder('change')}>*/}
                    {/*    <p>Изм %</p>*/}
                    {/*    <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='change'/>*/}
                    {/*</th>*/}
                    <th onClick={() => toggleSortOrder('distance')}>
                        <div className={style.animation} onClick={handleClickAnim}></div>
                        <p>Расст %</p>
                        <Arrow sortKey={sortKey} sortOrder={sortOrder} checkSort='distance'/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((item, index) => (
                    <tr key={index}>
                        <td><p className={item.isRandomBoolean ? style.name_green : style.name_red}>{item.name}</p></td>
                        <td><p>{item.power}</p></td>
                        <td><p>{item.price}</p></td>
                        <td><p className={`${style.right}
                           ${
                            item.density >= 5000000
                                ? style.density_red
                                : item.density >= 2000000
                                    ? style.density_orange
                                    : item.density >= 1000000
                                        ? style.density_yellow
                                        : item.density >= 200000
                                            ? style.density_brown
                                            : ""
                            }
                        `}
                        >{formatNumber(item.density)}</p></td>
                        {/*<td><p className={style.right}>{formatNumber(item.quantity)}</p></td>*/}
                        {/*<td><p className={style.right}>{item.change}%</p></td>*/}
                        <td><p className={style.right}>{item.distance}%</p></td>
                    </tr>
                ))}
                </tbody>
                <TablePages currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage}
                            data={data}/>
            </table>
        </>
    )
}

export default TableComponent

//функция проверки в какой позиции сортировка и рендер стрелки
function Arrow({sortKey, sortOrder, checkSort}){
    return(
        <div className={style.arrow}>
            {sortKey === checkSort && sortOrder === 'asc' ? (
                <UpOutlined />
            ) : (
                <DownOutlined />
            )}
        </div>
    )
}
// сокращение цифр
function formatNumber(number) {
    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
        return `${(number / 1000).toFixed(0)}K`;
    } else {
        return number;
    }
}