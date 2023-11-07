import React from "react"
import { formatNumber } from '../helps/FormatNumber/FormatNumber.js'
import './table..sass'
import {ButtonAnimation} from '../../../../shared/ButtonAnimation/ButtonAnimation.js'
import BarChartIcon from '@mui/icons-material/BarChart'
import {useTranslation} from "react-i18next";

const Table = ({ data, sorting, setSorting, rowsPerPage, page, openMiniTVwidget, onClose }) => {
    const {handleClickAnim} = ButtonAnimation()
    //сортировка по убыванию/возрастанию
    const handleSort = (field) => {
        let order = "asc"
        if (sorting.field === field && sorting.order === "asc") {
            order = "desc"
        }
        setSorting({
            field: field,
            order: order,
        })
    }
    // Создаем копию данных для сортировки
    const sortedData = data.slice()
    if (sorting.field === "name") {
        sortedData.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            const comparison = nameA.localeCompare(nameB)
            return sorting.order === "asc" ? comparison : -comparison
        })
    } else if (sorting.field === "cd") {
        sortedData.sort((a, b) => {
            const aValue = parseFloat(a.cd)
            const bValue = parseFloat(b.cd)
            return sorting.order === "asc" ? aValue - bValue : bValue - aValue
        })
    }
    //стрелочка для сортировки
    const getSortIcon = (field) => {
        if (sorting.field === field) {
            return sorting.order === "asc" ? "▼" : "▲"
        }
        return ""
    }

    //локализация
    const {t, i18n} = useTranslation()

    return (
        <table>
            <thead>
            <tr>
                <th className="chart"></th>
                <th>
                    <span
                          onClick={() => handleSort("name")}
                          style={{cursor: "pointer"}}
                    >
                         <div className="animation" onClick={handleClickAnim}></div>
                        <p>{t('screener.table_header.name')} {getSortIcon("name")}</p>
                    </span>
                </th>
                <th className="power">
                        <span
                              onClick={() => handleSort("raz")}
                              style={{cursor: "pointer"}}
                        >
                            <div className="animation" onClick={handleClickAnim}></div>
                            <p>{t('screener.table_header.raz')} {getSortIcon("raz")}</p>
                        </span>
                </th>
                <th className="price">
                        <span
                              onClick={() => handleSort("price")}
                              style={{cursor: "pointer"}}
                        >
                            <div className="animation" onClick={handleClickAnim}></div>
                            <p>{t('screener.table_header.price')} {getSortIcon("price")}</p>
                        </span>
                </th>
                <th>
                        <span
                              onClick={() => handleSort("cd")}
                              style={{cursor: "pointer"}}
                        >
                            <div className="animation" onClick={handleClickAnim}></div>
                            <p>{t('screener.table_header.cd')} {getSortIcon("cd")}</p>
                        </span>
                </th>
                <th>
                        <span
                              onClick={() => handleSort("dal")}
                              style={{cursor: "pointer"}}
                        >
                            <div className="animation" onClick={handleClickAnim}></div>
                            <p>{t('screener.table_header.dal')} % {getSortIcon("dal")}</p>
                        </span>
                </th>
            </tr>
            </thead>
            <tbody>
            {rowsPerPage > 0
                ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <tr key={index}>
                        <td className="chart">
                            <div className="animation" onClick={handleClickAnim}>
                                <button className="mini_graph" onClick={() => {
                                    onClose()
                                    setTimeout(() => {
                                        openMiniTVwidget(`${item.name}USDT`); // Открывает новое окно после задержки
                                    }, 0);
                                }}>
                                    <BarChartIcon className="mini_graph_icon"/>
                                </button>
                            </div>
                        </td>
                        <td><p
                            className={`${item.id === `${item.name}_ask` ? "name_red" : "name_green"}`}
                        >{item.name}</p></td>
                        <td className="power"><p>{item.raz}</p></td>
                        <td className="price"><p>{item.price}</p></td>
                        <td>
                            <p
                                className={`${
                                    item.cd >= 5000000
                                        ? "density_red"
                                        : item.cd >= 2000000
                                            ? "density_orange"
                                            : item.cd >= 1000000
                                                ? "density_yellow"
                                                : item.cd >= 200000
                                                    ? "density_brown"
                                                    : ""
                                }`}
                            >
                                {formatNumber(item.cd)}
                            </p>
                        </td>
                        <td><p>{item.dal} %</p></td>
                    </tr>
                )) : ''}
            </tbody>
        </table>
    )
}

export default Table