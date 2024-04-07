import React, {useEffect, useState} from 'react';
import style from './chart.module.sass'
import Chart from 'react-apexcharts';
import {Backdrop, Box, CircularProgress} from "@mui/material";
import {host} from '../../../shared/host/host.js'
import {currentQueryId, initData} from '../../../shared/telegram/telegram.js'

import btcIcon from '../assets/btcIcon.svg'
import {useTranslation} from "react-i18next";
import axios from "axios";

const MenuChart = () => {
    const { t } = useTranslation();

    const [seriesData, setSeriesData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);

    const [backdropVisible, setBackdropVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedQueryId = localStorage.getItem('mainMenuQueryId');
                const market = 'BTCUSDT';
                const tickInterval = '1d';
                const url = `${host}/api/get-klines`;
                if (storedQueryId !== currentQueryId) {
                    const response = await axios.post(url, {
                        symbol: market,
                        interval: tickInterval,
                        initData: initData
                    });
                    localStorage.setItem('mainMenuQueryId', currentQueryId);
                    const data = response.data.data;
                    if (data) {
                        setBackdropVisible(false);
                        localStorage.setItem('chartData', JSON.stringify(data));
                    }
                }
                const chartData = JSON.parse(localStorage.getItem('chartData'))
                const chartDataSet = parseFloat(chartData[chartData.length - 1][4])

                setCurrentPrice(chartDataSet)

                const formattedData = chartData.map(item => ({
                    x: new Date(item[0]),
                    y: parseFloat(item[4])
                }));
                const lastFiveDaysData = formattedData.slice(-15);
                setSeriesData(lastFiveDaysData);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    setBackdropVisible(false);
                }, 1500);
            }
        };

        fetchData();
    }, []);

    // Данные для графика
    const series = [{
        data: seriesData,
    }];

    // Опции графика
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            toolbar: {
                show: false
            },
            zoom:{
                enabled: false
            },
        },
        tooltip: {
            enabled: false,
        },
        colors: ['#ffffff'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        xaxis: {
            type: 'datetime',
            tickPlacement: 'between',
            labels: {
                datetimeFormatter: {
                    year: 'YYYY',
                    month: 'MMM',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                },
                style: {
                    colors: 'rgba(255,255,255,1)',
                    fontSize: '12px',
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: '200'
                },
            },
            axisBorder: {
                show: true,
                color: 'rgba(231,231,231,0.05)',
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: 'rgba(231,231,231,0.05)',
            },
        },
        yaxis: {
            show: true,
            showAlways: false,
            showForNullSeries: true,
            seriesName: undefined,
            opposite: false,
            reversed: false,
            logarithmic: false,
            logBase: 10,
            tickAmount: 4,
            decimalsInFloat: 0,
            labels: {
                show: true,
                style: {
                    colors: 'rgba(255,255,255,0.5)',
                },
                formatter: (value) => {
                    if (Math.abs(value) >= 1000) {
                        return '$' + Math.abs(value / 1000).toFixed(0) + 'k';
                    }
                    return '$' + Math.abs(value);
                }
            },
        },
        grid: {
            show: true,
            borderColor: 'rgba(231,231,231,0.1)',
            strokeDashArray: 10,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        }
    };

    // Функция для форматирования баланса с заданным количеством знаков после запятой
    const formatNumber = (balance, digits) => {
        if (balance === undefined) {
            return ''; // Возвращаем пустую строку или другое значение по умолчанию
        }

        let formattedBalance = balance.toFixed(digits);
        if (formattedBalance.length > digits) {
            formattedBalance = formattedBalance.slice(0, digits);
        }
        return formattedBalance;
    };

    const [formatedCost, setFormatedCost] = useState('0.000000000');

    useEffect(() => {
        if (currentPrice !== null) {
            setFormatedCost(formatNumber(currentPrice, 9));
        }
    }, [currentPrice]);

    return (
        <>
            <Backdrop open={false} sx={{ zIndex: 9999, bgcolor: '#000' }}>
                <CircularProgress sx={{ color: '#fff' }} />
            </Backdrop>
            <Box className={style.chart}>
                <Box className={style.chart__title}>
                    <Box className={style.chart__title__text}>
                        {t("mining.pages.menu.withdraw.cost")}
                        <img src={btcIcon} alt={'btc'} className={style.chart__title__text_img}/>
                    </Box>
                    <Box className={style.chart__title__count}
                    sx={{
                        filter: backdropVisible ? 'blur(7px)' : 'blur(0)',
                        transition: 'filter 500ms ease'
                    }}>
                        <span className={style.chart__title__count_big}>${formatedCost.split('.')[0]}</span>
                        <span className={style.chart__title__count_small}>.{formatedCost.split('.')[1]}</span>
                    </Box>
                </Box>
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={'80%'}
                    width={'103%'}
                    style={{
                        filter: backdropVisible ? 'blur(3px)' : 'blur(0)',
                        transition: 'filter 500ms ease'
                    }}
                />
            </Box>
        </>
    );
};

export default MenuChart;