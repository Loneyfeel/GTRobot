import React from 'react';
import {useTranslation} from "react-i18next";
import MenuTitle from "../../../shared/MenuPages/Titles/MenuTitle.jsx";

const MainTitle = () => {
    const {t} = useTranslation()
    return (
        <>
            <MenuTitle text={t('mainMenu.title')}/>
        </>
    );
};

export default MainTitle;