import React from 'react';
import style from "./mainTitle.module.sass";
import {useTranslation} from "react-i18next";

const MainTitle = () => {
    const {t, i18n} = useTranslation()
    return (
        <>
            <div className={style.menu__title}>
                <p>
                    {t('mainMenu.title')}:
                </p>
            </div>
        </>
    );
};

export default MainTitle;