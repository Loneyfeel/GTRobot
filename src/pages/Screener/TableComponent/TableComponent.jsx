import style from './tableComponent.module.sass'

import React, {useState} from 'react'
import ScreenTable from "./Table/index.js";

const TableComponent = ({ data }) => {
    return (
        <>
            <table className={style.table}>
                <ScreenTable
                    data={data}
                />
            </table>
        </>
    )
}

export default TableComponent

