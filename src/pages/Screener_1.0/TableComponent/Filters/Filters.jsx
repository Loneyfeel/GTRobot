import './filter.sass'
import React, { useState, useEffect, useRef } from "react"
import {formatNumber} from '../helps/FormatNumber/FormatNumber.js'

const Filters = ({
                     data,
                     nameFilter,
                     razFilter,
                     cdFilter,
                     dalFilter,
                     setNameFilter,
                     setRazFilter,
                     setCdFilter,
                     setDalFilter
                 }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isNameListOpen, setIsNameListOpen] = useState(false)
    const [isRazListOpen, setIsRazListOpen] = useState(false)
    const [isCdListOpen, setIsCdListOpen] = useState(false)
    const [isDalListOpen, setIsDalListOpen] = useState(false)

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value)
        setSearchTerm(event.target.value)
        setIsNameListOpen(true);
    }

    useEffect(() => {
        // Фильтруем элементы списка по введенному тексту
        const results = data.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
    }, [searchTerm, data])

    //значения фильтров
    const filters = {
        name: data.map((item) => item.name),
        raz: ['', 3, 5, 10, 20],
        cd: ['', 100000, 250000, 500000, 1000000, 2000000, 3000000],
        dal: ['', 0.5, 1, 1.5, 2, 3],
    };
    //меняем список на "открыт"
    const handleNameInputFocus = () => {
        setIsNameListOpen(true)
    }
    const handleRazInputFocus = () => {
        setIsRazListOpen(true)
    }
    const handleCdInputFocus = () => {
        setIsCdListOpen(true)
    }
    const handleDalInputFocus = () => {
        setIsDalListOpen(true)
    }

    //переменные для проверки нажатия вне списка
    const inputRef = useRef(null)
    const nameOptionsRef = useRef(null)
    const razDropdownRef = useRef(null)
    const cdDropdownRef = useRef(null)
    const dalDropdownRef = useRef(null)

    useEffect(() => {
        // Добавьте обработчик события click на document
        const handleDocumentClick = (event) => {
            if (
                inputRef.current && !inputRef.current.contains(event.target) &&
                nameOptionsRef.current && !nameOptionsRef.current.contains(event.target)
            ) {
                setIsNameListOpen(false);
            }
            if (razDropdownRef.current && !razDropdownRef.current.contains(event.target)) {
                setIsRazListOpen(false);
            }
            if (cdDropdownRef.current && !cdDropdownRef.current.contains(event.target)) {
                setIsCdListOpen(false);
            }
            if (dalDropdownRef.current && !dalDropdownRef.current.contains(event.target)) {
                setIsDalListOpen(false);
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            // удалим обработчик события click при размонтировании компонента
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [inputRef, razDropdownRef, cdDropdownRef, dalDropdownRef, nameOptionsRef])
    const filteredData = data.filter((coin, index) => index % 2 === 0)

    return (
        <div className="table__filters">
            <input
                ref={inputRef}
                type="text"
                placeholder="BTC"
                value={nameFilter}
                onChange={handleNameFilterChange}
                onFocus={handleNameInputFocus}
                onBlur={handleNameInputFocus}
            />
            {isNameListOpen && searchResults.length > 0 && (
                <ul className="dropdown-list name_list" ref={nameOptionsRef}>
                    {filteredData.map((coin) => (
                        <li className="name_lislt__li"
                            key={coin.id}
                            onClick={() => {
                                setNameFilter(coin.name);
                                setIsNameListOpen(false);
                            }}
                        >
                            {coin.name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="custom-dropdown" ref={razDropdownRef}>
                <div
                    className={`dropdown-header ${isRazListOpen ? "open" : ""} custom-dropdown__raz`}
                    onClick={handleRazInputFocus}
                >
                    {razFilter ? razFilter : "▼"}
                </div>
                {isRazListOpen && (
                    <ul className="dropdown-list raz_list">
                        {filters.raz.map((value) => (
                            <li className="raz_lislt__li"
                                key={value}
                                onClick={() => {
                                    setRazFilter(value);
                                    setIsRazListOpen(false);
                                }}
                            >
                                {value}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="custom-dropdown cd" ref={cdDropdownRef}>
                <div
                    className={`dropdown-header ${isCdListOpen ? "open" : ""}`}
                    onClick={handleCdInputFocus}
                >
                    {cdFilter ? cdFilter : "▼"}
                </div>
                {isCdListOpen && (
                    <ul className="dropdown-list cd_list">
                        {filters.cd.map((value) => (
                            <li
                                key={value}
                                onClick={() => {
                                    setCdFilter(value);
                                    setIsCdListOpen(false);
                                }}
                            >
                                {formatNumber((value))}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="custom-dropdown" ref={dalDropdownRef}>
                <div
                    className={`dropdown-header ${isDalListOpen ? "open" : ""}`}
                    onClick={handleDalInputFocus}
                >
                    {dalFilter ? `${dalFilter}%` : "▼"}
                </div>
                {isDalListOpen && (
                    <ul className="dropdown-list dal_list">
                        {filters.dal.map((value) => (
                            <li
                                key={value}
                                onClick={() => {
                                    setDalFilter(value);
                                    setIsDalListOpen(false);
                                }}
                            >
                                {`${value}%`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Filters