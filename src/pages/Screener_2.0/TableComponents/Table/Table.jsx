import React, {useEffect, useState} from "react"
import { formatNumber } from '../helps/FormatNumber/FormatNumber.js'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table'
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {TableSortLabel, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

const TableC = ({ filteredData, page, rowsPerPage, orderBy, setOrderBy, order, setOrder }) => {
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

    return (
        <>
        <TableContainer component={Paper}
                        sx={{
                            overflow: "hidden",
                        }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button
                                id="reset_sorting"
                                variant="contained"
                                color="secondary"
                                onClick={() => resetSorting()}
                                disabled={!isSortingActive}
                            >
                                Сбросить сортировку
                            </Button>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleSort('name')}
                            >
                                Монета
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'raz'}
                                direction={orderBy === 'raz' ? order : 'asc'}
                                onClick={() => handleSort('raz')}
                            >
                                Сила
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'price'}
                                direction={orderBy === 'price' ? order : 'asc'}
                                onClick={() => handleSort('price')}
                            >
                                Цена
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'cd'}
                                direction={orderBy === 'cd' ? order : 'asc'}
                                onClick={() => handleSort('cd')}
                            >
                                Плотн
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'dal'}
                                direction={orderBy === 'dal' ? order : 'asc'}
                                onClick={() => handleSort('dal')}
                            >
                                Расст
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
                        <TableRow
                            key={item.id}
                        >
                            <TableCell></TableCell>
                            <TableCell

                            >
                                <Typography
                                    style={{ backgroundColor: item.id === `${item.name}_ask` ? 'red' : 'green' }}
                                    p={0}
                                    textAlign="center"
                                >
                                    {item.name}
                                </Typography>
                            </TableCell>
                            <TableCell>{item.raz}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.cd}</TableCell>
                            {/*<p*/}
                            {/*    className={`${*/}
                            {/*        item.cd >= 5000000*/}
                            {/*            ? "density_red"*/}
                            {/*            : item.cd >= 2000000*/}
                            {/*                ? "density_orange"*/}
                            {/*                : item.cd >= 1000000*/}
                            {/*                    ? "density_yellow"*/}
                            {/*                    : item.cd >= 200000*/}
                            {/*                        ? "density_brown"*/}
                            {/*                        : ""*/}
                            {/*    }`}*/}
                            {/*>*/}
                            {/*    {formatNumber(item.cd)}*/}
                            {/*</p>*/}
                            <TableCell>{item.dal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default TableC
