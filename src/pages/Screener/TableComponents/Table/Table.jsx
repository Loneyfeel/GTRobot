import React, {useEffect, useState} from "react"

import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, IconButton, TableSortLabel, Typography, TableBody, } from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BarChartIcon from '@mui/icons-material/BarChart';

import { formatNumber } from '../helps/FormatNumber/FormatNumber.js'
import HeaderTableCell from "./HeaderTableCell";
import ResetButton from "../Reset Buttons";
import BodyTableCell from "./BodyTableCell";

import {useTranslation} from "react-i18next";

const TableScreener = ({ filteredData, page, rowsPerPage, orderBy, setOrderBy, order, setOrder, openMiniTVwidget, onClose }) => {


    const [isSortingActive, setIsSortingActive] = useState(false);

    //нажатие сортировки
    const handleSort = (column) => {
        if (orderBy === column && order === 'asc') {
            setOrder('desc');
        } else {
            setOrder('asc');
        }
        setOrderBy(column);
        setIsSortingActive(true);
    };

    //сброс сортировки
    const resetSorting = () => {
        setOrder('asc');
        setOrderBy('');
        setIsSortingActive(false);
    };

    useEffect(() => {
        resetSorting(); // Сбрасываем сортировки при загрузке страницы
    }, []);

    //для определения фона плотности
    const getColorForCD = (cd) => {
        if (cd >= 5000000) {
            return "rgba(211, 47, 47, 0.8)";
        } else if (cd >= 2000000) {
            return "rgba(245, 124, 0, 0.8)";
        } else if (cd >= 1000000) {
            return "rgba(214, 202, 36, 0.8)";
        } else if (cd >= 200000) {
            return "rgba(203, 146, 66, 0.8)";
        } else {
            return "";
        }
    };
    //для определения фона плотности
    const getColorForDAL = (dal) => {
        if (dal >= 5) {
            return "rgba(45, 176, 25, 0.8)";
        } else if (dal >= 2) {
            return "rgba(224, 144, 22, 0.7)";
        } else if (dal >= 1) {
            return "rgba(224, 204, 22, 0.7)";
        } else if (dal >= 0) {
            return "rgba(88, 80, 28, 0.4)";
        } else {
            return "";
        }
    };

    const {t, i18n} = useTranslation()

    return (
        <>
            <TableContainer component={Paper}
                            sx={{
                                overflow: "hidden",
                                maxWidth: '100vw',
                                padding: '0',
                                borderRadius: '0',
                            }}
            >
                <Table
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '0',
                        minHeight: '50vh',
                    }}>
                    <TableHead
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <TableRow
                            sx={{
                                minWidth: '100vw',
                                height: '30px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'flex-start',
                            }}
                        >
                            <TableCell
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minWidth:'0',
                                    padding: '0',
                                    margin: '0 3px',
                                    width: '30px',
                                    height: '30px',
                                    borderBottom: 'none',
                                }}>
                                <ResetButton
                                    id={'reset_sorting'}
                                    onClick={() => resetSorting()}
                                    disabled={!isSortingActive}
                                    children={<RotateLeftIcon/>}
                                />
                            </TableCell>
                            <HeaderTableCell
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleSort('name')}
                                children={t('screener.table_header.name')}
                            />
                            <TableCell
                                sx={{
                                    minWidth:'60px',
                                    padding: '4px',
                                    paddingRight: '0',
                                    height: '30px',
                                    borderBottom: 'none',
                                    fontSize: '12px',
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'raz'}
                                    direction={orderBy === 'raz' ? order : 'asc'}
                                    onClick={() => handleSort('raz')}
                                    sx={{
                                        "&:focus":{
                                            color: 'var(--tg-theme-text-color)'
                                        },
                                        "&:hover":{
                                            color: 'var(--tg-theme-text-color)'
                                        },
                                        "&:active":{
                                            color: 'var(--tg-theme-text-color)'
                                        },
                                    }}
                                >
                                    {t('screener.table_header.raz')}
                                </TableSortLabel>
                            </TableCell>
                            <HeaderTableCell
                                active={orderBy === 'price'}
                                direction={orderBy === 'price' ? order : 'asc'}
                                onClick={() => handleSort('price')}
                                children={t('screener.table_header.price')}
                            />
                            <HeaderTableCell
                                active={orderBy === 'cd'}
                                direction={orderBy === 'cd' ? order : 'asc'}
                                onClick={() => handleSort('cd')}
                                children={t('screener.table_header.cd')}
                            />
                            <HeaderTableCell
                                active={orderBy === 'dal'}
                                direction={orderBy === 'dal' ? order : 'asc'}
                                onClick={() => handleSort('dal')}
                                children={t('screener.table_header.dal')}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
                            <TableRow
                                sx={{
                                    minWidth: '100vw',
                                    height: '30px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'flex-start',
                                    borderBottom: '1px solid var(--tg-theme-button-color)',
                                }}
                                key={item.id}
                            >
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minWidth:'0',
                                        padding: '0',
                                        margin: '0 3px',
                                        width: '30px',
                                        height: '30px',
                                        borderBottom: 'none',
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            minWidth:'0',
                                            padding: '0',
                                            width: '30px',
                                            color: 'primary.main'
                                        }}
                                        onClick={() => {
                                            onClose()
                                            setTimeout(() => {
                                                openMiniTVwidget(`${item.name}USDT`); // Открывает новое окно после задержки
                                            }, 0);
                                        }}>
                                        <BarChartIcon/>
                                    </IconButton>
                                </TableCell>
                                <BodyTableCell
                                    children={
                                        <Typography
                                            sx={{
                                                backgroundColor: item.id === `${item.name}_ask` ? 'rgba(227, 45, 45, 0.8)' : 'rgba(59, 196, 37, 0.8)',
                                                padding: '0 2px',
                                                fontSize: '14px'
                                            }}
                                            textAlign="left"
                                        >
                                            {item.name}
                                        </Typography>
                                    }
                                />
                                <TableCell
                                    sx={{
                                        minWidth:'60px',
                                        padding: '4px 7px',
                                        height: '30px',
                                        borderBottom: 'none',
                                        fontSize: '14px',
                                    }}
                                >
                                    {item.raz}
                                </TableCell>
                                <BodyTableCell
                                    children={item.price}
                                />
                                <BodyTableCell
                                    children={
                                        <Typography
                                            sx={{
                                                textAlign: 'right',
                                                fontSize: '12px',
                                                backgroundColor: getColorForCD(item.cd),
                                                padding: '0 2px'
                                            }}
                                        >
                                            {formatNumber(item.cd)}
                                        </Typography>
                                    }
                                />
                                <BodyTableCell
                                    children={
                                        <Typography
                                            sx={{
                                                textAlign: 'right',
                                                fontSize: '12px',
                                                backgroundColor: getColorForDAL(item.dal),
                                                padding: '0 2px'
                                            }}
                                        >
                                            {`${item.dal}%`}
                                        </Typography>
                                    }

                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableScreener
