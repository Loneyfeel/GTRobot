import React from 'react';
import style from "./mainButtons.module.sass";
import MainButton from "./Main Button/index.js";

import {InfoCircleOutlined, PhoneOutlined, RobotOutlined, ToolOutlined, UserAddOutlined} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MainButtons = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className={style.menu__buttons}>
                <MainButton id="Trading tools" icon={<ToolOutlined />} text={t('mainMenu.buttons.trading')} url="/tools"/>
                <MainButton id="Bot_Descr" icon={<RobotOutlined />} text={t('mainMenu.buttons.bot_descr')} url="#"/>
                <MainButton id="Call" icon={<PhoneOutlined />} text={t('mainMenu.buttons.call')} url="#"/>
                <MainButton id="About" icon={<InfoCircleOutlined />} text={t('mainMenu.buttons.about')} url="#"/>
                <div className={style.last__button}>
                    <MainButton id="Ref" icon={<UserAddOutlined />} text={t('mainMenu.buttons.referal')} url="#"/>
                </div>
            </div>
        </>
    );
};

export default MainButtons;
