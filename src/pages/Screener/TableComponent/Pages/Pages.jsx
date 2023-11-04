import style from './pages.module.sass'
import { ButtonAnimation } from "../../../../shared/ButtonAnimation/ButtonAnimation.js"
import React, { useEffect } from "react"

const Pages = ({ data, currentPage, setCurrentPage, rowsPerPage }) => {
    const totalPages = Math.ceil(data.length / rowsPerPage)

    useEffect(() => {
        // проверка изменилось ли количество страниц в filteredData
        const newTotalPages = Math.ceil(data.length / rowsPerPage)
        if (newTotalPages < currentPage) {
            // Если текущая страница больше, чем newTotalPages нового filteredData, обновить currentPage
            setCurrentPage(newTotalPages-1)
        }
    }, [data, rowsPerPage])

    //генерация страниц
    const generatePageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5 // Максимальное количество видимых страниц
        const ellipsisThreshold = maxPagesToShow - 1 // Порог для показа многоточия

        if (totalPages <= maxPagesToShow) {
            // Если общее количество страниц меньше или равно максимальному числу страниц для отображения, то отобразить все страницы от 1 до totalPages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else if (currentPage <= ellipsisThreshold) {
            // Если текущая страница находится в левой части, ближе к началу, покажите первые maxPagesToShow страниц, затем многоточие, и последнюю страницу
            for (let i = 1; i <= maxPagesToShow; i++) {
                pageNumbers.push(i)
            }
            pageNumbers.push('...')
            pageNumbers.push(totalPages)
        } else if (currentPage >= totalPages - ellipsisThreshold + 1) {
            // Если текущая страница находится в правой части, ближе к концу, покажите первую страницу, затем многоточие, и последние maxPagesToShow страниц
            pageNumbers.push(1)
            pageNumbers.push('...')
            for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // В остальных случаях покажите первую страницу, многоточие, страницы рядом с текущей, затем многоточие, и последнюю страницу
            pageNumbers.push(1)
            pageNumbers.push('...')
            for (let i = currentPage - 1; i <= currentPage + 3; i++) {
                pageNumbers.push(i)
            }
            pageNumbers.push('...')
            pageNumbers.push(totalPages)
        }
        return pageNumbers
    }
    const pageNumbers = generatePageNumbers()

    //клик по странице
    const handlePageClick = (page) => {
        if (page === '...') {
            return; // Не выполнять ничего при клике на "..."
        }
        setCurrentPage(page - 1)
    }

    // Для анимации нажатия
    const { handleClickAnim } = ButtonAnimation()

    return (
        <>
            <div className={style.pages}>
                <button
                    className={`${style.pages__button_prev}`}
                    onClick={() => {
                        setCurrentPage(currentPage - 1)
                        setTimeout(() => {
                            window.scrollTo(0, document.documentElement.scrollHeight)
                        }, 0)
                    }}
                    disabled={currentPage === 0}
                >
                    <div className={style.animation} onClick={handleClickAnim}></div>
                    Пред
                </button>
                <div className={style.table__pages}>
                    {pageNumbers.map((page, index) => (
                        <span key={index} onClick={() =>
                            handlePageClick(page)
                        }>
                            <p className={`${page === currentPage + 1 ? style.current_page : ''}`}>{page === '...' ? '...' : page}</p>
                        </span>
                    ))}
                </div>
                <button
                    className={`${style.pages__button_next}`}
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                        window.scrollTo(0, document.documentElement.scrollHeight);
                    }}
                    disabled={currentPage === totalPages - 1}
                >
                    <div className={style.animation} onClick={handleClickAnim}></div>
                    След
                </button>
            </div>
        </>
    );
};

export default Pages;
