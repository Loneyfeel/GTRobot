import style from './tablePages.module.sass'
import {ButtonAnimation} from "../../../../shared/ButtonAnimation/ButtonAnimation.js";
import React from "react";

const TablePages = ({currentPage, setCurrentPage, rowsPerPage, data}) => {
    const totalPages = Math.ceil(data.length / rowsPerPage)

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Максимальное количество видимых страниц
        const ellipsisThreshold = maxPagesToShow - 1; // Порог для показа многоточия

        if (totalPages <= maxPagesToShow) {
            // Если общее количество страниц меньше или равно максимальному числу страниц для отображения, то отобразить все страницы от 1 до totalPages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage <= ellipsisThreshold) {
            // Если текущая страница находится в левой части, ближе к началу, покажите первые maxPagesToShow страниц, затем многоточие, и последнюю страницу
            for (let i = 1; i <= maxPagesToShow; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - ellipsisThreshold + 1) {
            // Если текущая страница находится в правой части, ближе к концу, покажите первую страницу, затем многоточие, и последние maxPagesToShow страниц
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // В остальных случаях покажите первую страницу, многоточие, страницы рядом с текущей, затем многоточие, и последнюю страницу
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };
    const pageNumbers = generatePageNumbers()
    const handlePageClick = (page) => {
        if (page === '...') return; // Проверка на многоточие
        setCurrentPage(page)
    }
    //Для анимации нажатия
    const { handleClickAnim } = ButtonAnimation();
    return (
        <>
            <div className={style.pages}>
                <button
                    className={`${style.pages__button_prev}`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <div className={style.animation} onClick={handleClickAnim}></div>
                    Prev
                </button>
                <div className={style.table__pages}>
                    {pageNumbers.map((page, index) => (
                        <span
                            key={index}
                            onClick={() => handlePageClick(page)}>
                    <p className={`${page === currentPage ? style.current_page : ''}`}>{page}</p>
          </span>
                    ))}
                </div>
                <button
                    className={`${style.pages__button_next}`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <div className={style.animation} onClick={handleClickAnim}></div>
                    Next
                </button>
            </div>
        </>
    )
}

export default TablePages