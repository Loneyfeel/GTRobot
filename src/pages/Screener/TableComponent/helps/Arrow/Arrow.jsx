//функция проверки в какой позиции сортировка и рендер стрелки
import style from './arrow.module.sass';
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import React from "react";

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
export default Arrow