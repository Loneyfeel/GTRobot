import './App.css'

// import Menu from "./pages/Tools Menu";
import Screener from "./pages/Screener_1.0";
// import MainMenu from "./pages/Main Menu/index.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const userId = "tg.initDataUnsafe.user.id"; // Установите значение userId
    const [language, setLanguage] = useState()
    useEffect(() => {
        const data = { userId };
        axios.post('https://gtrobot.ngrok.dev/api/user-locale', data)
            .then((response) => {
                setLanguage(response.data); // Получить значение language из ответа
                console.log('Полученный язык:', language);
            })
            .catch((error) => {
                console.error('Произошла ошибка при выполнении POST-запроса:', error);
            });
    }, []); // useEffect выполняется при монтировании компонента

    // const language = 'uz'

    //локализация
    const {t, i18n} = useTranslation()
    useEffect(() => {
        i18n.changeLanguage(language); // Измените текущий язык
    }, [i18n, language]);

  return (
    <>
        {/*<MainMenu/>*/}
        {/*<Menu/>*/}
        <Screener/>
    </>
  )
}

export default App