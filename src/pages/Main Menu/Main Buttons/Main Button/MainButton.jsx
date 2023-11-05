import React from 'react';
import {ButtonAnimation} from "../../../../shared/ButtonAnimation/ButtonAnimation.js";
import style from "./mainButton.module.sass";
import {RightOutlined} from "@ant-design/icons";

const MainButton = (props) => {
    //для анимации кнопки
    const { handleClickAnim } = ButtonAnimation();

    // Открываем ссылку
    const handleClick = () => {
        const url = props.url
        window.location.href = url
    };
    return (
        <>
            <button id={props.id} onClick={handleClick}>
                <div className={style.animation} onClick={handleClickAnim}></div>
                <div className={style.button__icon}>
                    <div className={style.icon}>{props.icon}</div>
                </div>
                <div className={style.button__text}>
                    <p>{props.text}</p>
                </div>
                <div className={style.button__arrow}>
                    <div className={style.arrow}><RightOutlined /></div>
                </div>
            </button>
        </>
    )
};

export default MainButton;