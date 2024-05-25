import React, {useEffect, useState} from 'react';
import style from './chart.module.sass'
import Chart from 'react-apexcharts';
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const CardChart = ({money, chartData, gtrobotTheme}) => {
    const { t } = useTranslation();

    const [seriesData, setSeriesData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(money);

    useEffect(() => {
        // Форматируем данные для графика
        const formattedData = chartData.map(item => ({
            x: new Date(item[0]*1000).getTime(), // Преобразуем дату в миллисекунды
            y: parseFloat(item[1].toFixed(0))
        }));

        // Группируем данные по дням и вычисляем среднее значение для каждого дня
        const dailyData = {};
        formattedData.forEach(item => {
            const date = new Date(item.x);
            const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); // Отбрасываем время, оставляем только день
            if (!dailyData[day]) {
                dailyData[day] = { total: item.y, count: 1 };
            } else {
                dailyData[day].total += item.y;
                dailyData[day].count++;
            }
        });

        // Формируем массив средних значений для каждого дня
        const averagedData = [];
        const days = Object.keys(dailyData);
        const firstDay = parseInt(days[0]);
        const lastDay = parseInt(days[days.length - 1]);
        for (let day = firstDay; day <= lastDay; day += 24 * 60 * 60 * 1000) { // Перебираем каждый день между первым и последним
            if (dailyData[day]) {
                averagedData.push({ x: day, y: dailyData[day].total / dailyData[day].count });
            } else if (averagedData.length > 0) { // Если нет данных для этого дня, но у нас уже есть предыдущие дни, то копируем последние данные
                averagedData.push({ x: day, y: averagedData[averagedData.length - 1].y });
            }
        }

        // Если данных меньше 15 дней, копируем первое значение для заполнения пустых дней
        while (averagedData.length < 15) {
            averagedData.unshift({ x: averagedData[0].x - 24 * 60 * 60 * 1000, y: averagedData[0].y });
        }
        setSeriesData(averagedData);
    }, [chartData]);

    useEffect(() => {
        console.log('chartData',chartData)
        console.log('seriesData',seriesData)
    }, []);

    // Данные для графика
    const series = [{
        data: seriesData,
    }];

    const [themeColors, setThemeColors] = useState(
        {
            colors: 'rgba(255,255,255,1)',
            xaxisColors: 'rgba(255,255,255,1)',
            axisBorder: 'rgba(231,231,231,0.05)',
            axisTicks: 'rgba(231,231,231,0.05)',
            yaxisLabels: 'rgba(255,255,255,0.5)',
            gridBorderColor: 'rgba(231,231,231,0.1)',
        }
    )

    useEffect(() => {
        if(gtrobotTheme === 'gtrobot'){
            setThemeColors(
                {
                    colors: 'rgba(255,255,255,1)',
                    xaxisColors: 'rgba(255,255,255,1)',
                    axisBorder: 'rgba(231,231,231,0.05)',
                    axisTicks: 'rgba(231,231,231,0.05)',
                    yaxisLabels: 'rgba(255,255,255,0.5)',
                    gridBorderColor: 'rgba(231,231,231,0.1)',
                }
            )
        } else if(gtrobotTheme === 'telegram') {
            setThemeColors({
                colors: 'var(--menu-button-color)',
                xaxisColors: 'var(--text-color)',
                axisBorder: 'var(--text-color)',
                axisTicks: 'var(--text-color)',
                yaxisLabels: 'var(--text-color)',
                gridBorderColor: 'var(--text-color)',
            })
        }
    }, [gtrobotTheme]);

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
        colors: [themeColors.colors],
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
                    colors: themeColors.xaxisColors,
                    fontSize: '12px',
                    fontFamily: 'Gilroy, sans-serif',
                    fontWeight: '200'
                },
            },
            axisBorder: {
                show: true,
                color: themeColors.axisBorder,
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: themeColors.axisTicks,
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
            tickAmount: 5,
            decimalsInFloat: 1,
            labels: {
                show: true,
                style: {
                    colors: themeColors.yaxisLabels,
                },
                formatter : (value) => {
                    let formattedValue = '';
                    switch (true) {
                        case Math.abs(value) >= 1000000:
                            formattedValue = '$' + Math.abs(value / 1000000).toFixed(2) + 'M';
                            break;
                        case Math.abs(value) >= 10000:
                            formattedValue = '$' + Math.abs(value / 1000).toFixed(2) + 'K';
                            break;
                        case Math.abs(value) >= 1000:
                            formattedValue = '$' + value.toFixed(0);
                            break;
                        case Math.abs(value) >= 100:
                            formattedValue = '$' + Math.abs(value.toFixed(0));
                            break;
                        default:
                            formattedValue = '$' + value;
                            break;
                    }
                    return formattedValue;
                }
            },
        },
        grid: {
            show: true,
            borderColor: themeColors.gridBorderColor,
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
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const [formatedCost, setFormatedCost] = useState('0.000000000');

    useEffect(() => {
        if (currentPrice !== null) {
            setFormatedCost(formatNumber(currentPrice, 9));
        }
    }, [currentPrice]);

    return (
        <>
            <Box className={style.chart}>
                <Box className={style.chart__title}>
                    <Box className={style.chart__title__text}>
                        {t("tracking.cost")}
                    </Box>
                    <Box className={style.chart__title__count}
                    sx={{

                        transition: 'filter 500ms ease'
                    }}>
                        <span className={style.chart__title__count_big}>${formatedCost}</span>
                    </Box>
                </Box>
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        height={'80%'}
                        width={'103%'}
                        style={{
                            transition: 'filter 500ms ease'
                        }}
                    />
            </Box>
        </>
    );
};

export default CardChart;