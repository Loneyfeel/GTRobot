import React, { useState } from "react"
import Filters from "../TableComponent/Filters"
import Table from "../TableComponent/Table"
import Pagination from "../TableComponent/Pagination"
import Pages from "./Pages/index.js"
import MiniTVwidget from './Mini-TVwidget/'
import Chart from "../TradingViewWidget/TradingViewWidget.jsx"
import style from './tableComponent.module.sass'

const TableComponent = ({ data }) => {
    const [nameFilter, setNameFilter] = useState("")
    const [razFilter, setRazFilter] = useState("")
    const [cdFilter, setCdFilter] = useState("")
    const [dalFilter, setDalFilter] = useState("")
    const [sorting, setSorting] = useState({ field: "", order: "" })
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // состояние для отображения/скрытия MiniTVwidget
    const [isMiniTVwidgetVisible, setIsMiniTVwidgetVisible] = useState(false)

    // Состояние для хранения выбранного символа
    const [selectedSymbol, setSelectedSymbol] = useState("")

    // Функция для открытия MiniTVwidget и передачи выбранного символа
    const openMiniTVwidget = (symbol) => {
        setSelectedSymbol(symbol);
        setIsMiniTVwidgetVisible(true);
    };

    // Функция для закрытия MiniTVwidget
    const closeMiniTVwidget = () => {
        setIsMiniTVwidgetVisible(false)
    };

    //фильтрация
    const filteredData = data
        .filter((item) => item.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .filter((item) => razFilter === "" || item.raz >= razFilter)
        .filter((item) => cdFilter === "" || item.cd >= cdFilter)
        .filter((item) => dalFilter === "" || item.dal >= dalFilter)

    filteredData.sort((a, b) => {
        if (sorting.field !== "") {
            const order = sorting.order === "asc" ? 1 : -1
            return (a[sorting.field] - b[sorting.field]) * order
        }
        return 0;
    })

    // Общее количество строк после фильтрации
    const totalRows = filteredData.length

    return (
        <>
            <Chart />
            <div className={style.mini_TVwidget}>
                {isMiniTVwidgetVisible && (
                    <MiniTVwidget
                        symbol={selectedSymbol}
                        onClose={closeMiniTVwidget}
                    />
                )}
            </div>
            <div className={style.table}>
                <div className={style.table__header}>
                    <div className={style.table__title}>
                        <div className={style.title}>
                            <p>Скринер плотностей на бирже Binance</p>
                        </div>
                        <div className={style.pagination}>
                            <Pagination
                                page={page}
                                setPage={setPage}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                totalRows={totalRows}
                            />
                        </div>
                    </div>
                </div>
                <Filters
                    data={data}
                    nameFilter={nameFilter}
                    razFilter={razFilter}
                    cdFilter={cdFilter}
                    dalFilter={dalFilter}
                    setNameFilter={setNameFilter}
                    setRazFilter={setRazFilter}
                    setCdFilter={setCdFilter}
                    setDalFilter={setDalFilter}
                />
                <Table
                    data={filteredData}
                    sorting={sorting}
                    setSorting={setSorting}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    openMiniTVwidget={openMiniTVwidget}
                    onClose={closeMiniTVwidget}
                />
                <Pages
                    data={filteredData}
                    currentPage={page}
                    setCurrentPage={setPage}
                    rowsPerPage={rowsPerPage}
                    totalRows={totalRows}
                />
            </div>
        </>
    );
}

export default TableComponent;
