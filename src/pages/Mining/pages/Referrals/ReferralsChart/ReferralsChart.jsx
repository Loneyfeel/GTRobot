import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ReferralsChart = () => {
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     // Получаем данные из local.storage
        //     const storedData =
        //         JSON.parse(localStorage.getItem("miningUserData")) || {};
        //     setReferrals(storedData.referrals || []);
        //   } catch (error) {
        //     console.error("Error fetching user data:", error);
        //   }
        // };
        //
        // fetchData();
        const testReferrals = generateTestData();
        setReferrals(testReferrals);
    }, []);

    const generateTestData = () => {
        const testData = [];
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 29); // Начинаем с 20 дней назад

        for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
            const timestamp = date.getTime() / 1000;
            // Генерируем случайное количество пользователей для каждой даты
            const userCount = Math.floor(Math.random() * 3) + 1; // от 1 до 3 пользователей
            for (let i = 0; i < userCount; i++) {
                testData.push({
                    user_name: `User ${i}`,
                    timestamp: timestamp,
                });
            }
        }
        return testData;
    };

    const generateDateList = () => {
        const currentDate = new Date();
        const endDate = new Date(currentDate); // Конечная дата - текущая дата
        const startDate = new Date(currentDate); // Начальная дата - 20 дней назад от текущей даты
        startDate.setDate(startDate.getDate() - 29); // Вычитаем 19 дней

        const dateList = [];

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const formattedDate = `${day}.${month}`;
            dateList.push(formattedDate);
        }

        return dateList;
    };

    const userList = referrals.map((referral) => ({
        user_name: referral.user_name,
        timestamp: referral.timestamp,
    }));
    const dateList = generateDateList();
    const userCountByDate = {};

    dateList.forEach((date) => {
        userCountByDate[date] = 0;
    });

    // Подсчитываем количество пользователей по датам
    userList.forEach((user) => {
        const timestamp = user.timestamp;
        const userDate = new Date(timestamp * 1000);
        const formattedDate = `${String(userDate.getDate() + 1).padStart(2, "0")}.${String(userDate.getMonth() + 1).padStart(2, "0")}`;

        if (userCountByDate[formattedDate] !== undefined) {
            userCountByDate[formattedDate]++;
        }
    });

    // Преобразуем объект в массив значений
    const data = dateList.map((date) => ({ date, count: userCountByDate[date] || 0 }));

    // Находим максимальное значение данных
    const maxCount = Math.max(...data.map(entry => entry.count));

    // Определяем количество меток на оси Y (максимальное значение + 1)
    const yAxisTicks = Array.from({ length: maxCount + 1 }, (_, i) => i + 1);

    return (
        <div style={{
            width: '95%',
            height: 250,
            paddingRight: '30px'
        }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                >
                    <XAxis dataKey="date" tick={{ fill: "#FFF" }}/>
                    <YAxis domain={[1, maxCount + 1]} ticks={yAxisTicks} />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReferralsChart;
