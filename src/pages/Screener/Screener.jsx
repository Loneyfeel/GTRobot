import style from './screener.module.sass'
import React, { useState } from 'react';
import TableComponent from "./TableComponent";
import {data} from './testData/data.js'
import Chart from "./TradingViewWidget/index.js";

const Screener = () => {
    return (
        <>
            <div className="screener">
                <Chart/>
                <TableComponent data={data}/>
            </div>
        </>
    );
};

export default Screener;