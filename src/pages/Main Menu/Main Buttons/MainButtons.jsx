import React from 'react';
import style from "./mainButtons.module.sass";
import MainButton from "./Main Button/index.js";

import {InfoCircleOutlined, PhoneOutlined, RobotOutlined, ToolOutlined, UserAddOutlined} from "@ant-design/icons";

const MainButtons = () => {
    return (
        <>
            <div className={style.menu__buttons}>
                <MainButton id="Traidng tools" icon={<ToolOutlined />} text="Ish qurollari" url="/tools"/>
                <MainButton id="Bot_Descr" icon={<RobotOutlined />} text="Bot qanday ishlaydi" url="#"/>
                <MainButton id="Call" icon={<PhoneOutlined />} text="Murojat" url="#"/>
                <MainButton id="About" icon={<InfoCircleOutlined />} text="Biz haqimizda" url="#"/>
                <div className={style.last__button}>
                    <MainButton id="Ref" icon={<UserAddOutlined />} text="Referal" url="#"/>
                </div>
            </div>
        </>
    );
};

export default MainButtons;