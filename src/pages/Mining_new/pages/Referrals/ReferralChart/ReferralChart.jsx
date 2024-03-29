import React from 'react';
import style from './referralChart.module.sass'

import Chart from 'react-apexcharts';

const AreaChart = ({ referralsData }) => {
    // Функция для агрегации данных по временным меткам
    const aggregateData = (referralsData) => {
        if (!Array.isArray(referralsData)) return [];
        const dataMap = {};
        const currentDate = new Date();
        const lastTwentyDays = new Date();
        lastTwentyDays.setDate(currentDate.getDate() - 20); // Получаем дату 20 дней назад

        // Создаем объект с данными за последние 20 дней, начиная с 0
        const today = new Date().toLocaleDateString('en-US');
        for (let i = 0; i < 20; i++) {
            const date = new Date(lastTwentyDays);
            date.setDate(lastTwentyDays.getDate() + i);
            const dateString = date.toLocaleDateString('en-US');
            dataMap[dateString] = 0;
        }

        // Заполняем данные по рефералам
        referralsData.forEach((referral) => {
            const timestamp = referral.timestamp * 1000; // Преобразуем секунды в миллисекунды
            if (timestamp >= lastTwentyDays.getTime()) {
                const dateKey = new Date(timestamp).toLocaleDateString('en-US');
                if (!dataMap[dateKey]) {
                    dataMap[dateKey] = 0;
                }
                dataMap[dateKey]++;
            }
        });

        // Преобразуем объект в массив
        return Object.entries(dataMap).map(([date, count]) => ({
            x: date, // Даты уже строковые, так что нет необходимости в дополнительном преобразовании
            y: count,
        }));
    };

    // Данные для графика
    let seriesData = aggregateData(referralsData);
    // Если данных за последние 20 дней нет, добавляем точку в начало и конец
    if (seriesData.length === 0) {
        seriesData = [
            { x: new Date().toLocaleDateString('en-US'), y: 0 },
            { x: new Date().toLocaleDateString('en-US'), y: 0 },
        ];
    } else if (seriesData.length === 1) {
        // Если есть только одна точка, добавляем точку в начало и конец
        const singlePoint = seriesData[0];
        seriesData = [
            { x: new Date().toLocaleDateString('en-US'), y: 0 },
            singlePoint,
            { x: new Date().toLocaleDateString('en-US'), y: 0 },
        ];
    }

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
            width: 2,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'YYYY',
                    month: 'dd.MM',
                    day: 'dd.MM',
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
        },
        grid: {
            show: true,
            borderColor: 'rgba(231,231,231,0.05)',
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

    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={150}
            width={'100%'}
        />
    );
};

export default AreaChart;