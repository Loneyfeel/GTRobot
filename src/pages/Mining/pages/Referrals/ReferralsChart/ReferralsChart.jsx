import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const ReferralsChart = () => {
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные из local.storage
                const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
                setReferrals(storedData.referrals || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const [options, setOptions] = useState({});
    const userList = referrals.map(referral => ({
        user_name: referral.user_name,
        timestamp: referral.timestamp
    }));
    const dateList = generateDateList();
    const userCountByDate = {};

    // Заполняем объект начальными значениями
    dateList.forEach(date => {
        userCountByDate[date] = 0;
    });

    // Подсчитываем количество пользователей по датам
    userList.forEach(user => {
        const timestamp = user.timestamp;
        const userDate = new Date(timestamp * 1000);
        const formattedDate = `${userDate.getDate()}.${userDate.getMonth() + 1}.${String(userDate.getFullYear()).slice(2)}`;

        if (userCountByDate[formattedDate] !== undefined) {
            userCountByDate[formattedDate]++;
        }
    });

    // Преобразуем объект в массив значений
    const userCountList = dateList.map(date => userCountByDate[date]);


    useEffect(() => {
        setOptions(referralsChart('', userCountList, dateList));
    }, [userCountList.reverse(), dateList]);

    return (
        <div>
            <ApexCharts
                options={options}
                series={[{ data: userCountList }]}
                type="area"
                height={250}
            />
        </div>
    );
};

function generateDateList() {
    const currentDate = new Date();
    const dateList = [];

    // for (let i = -3; i < 18; i++) {
    for (let i = -30; i < 30; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - i);

        const day = String(newDate.getDate()).padStart(2, '0');
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const year = String(newDate.getFullYear()).slice(2);

        const formattedDate = `${day}.${month}.${year}`;
        dateList.push(formattedDate);
    }

    return dateList;
}

function referralsChart(name, series, categories) {
    return {
        series: [{
            name: '',
            data: series
        }],
        chart: {
            type: 'area',
            height: 250,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: name,
            align: 'center'
        },
        fill: {
            colors: [cleanColor('--tg-theme-button-color')]
        },
        xaxis: {
            categories: categories.map(date => {
                const [day, month] = date.split('.');
                return `${day-1}.${month}`;
            }).reverse(),
            labels: {
                style: {
                    colors: Array(categories.length).fill(cleanColor('--tg-theme-hint-color')),
                    fontSize: '10px',
                },
            },
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return Math.round(value);
                },
                style: {
                    colors: [cleanColor('--tg-theme-text-color')],
                },
            }
        },
        tooltip: {
            x: {
                formatter: function (value) {
                    const [day, month] = value.split('.');
                    return `${day-1}.${month}`;
                }
            }
        }
    };
}

function cleanColor(color) {
    color = getComputedStyle(document.documentElement).getPropertyValue(color);
    color = color.trim();
    color = color.replace(/^#+/, '');
    if (color.length < 6) {
        color = color.padStart(6, '0');
    } else if (color.length > 6) {
        color = color.slice(0, 6);
    }

    color = '#' + color;
    return color;
}

export default ReferralsChart;
