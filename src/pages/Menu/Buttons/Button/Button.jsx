import style from './button.module.sass'
import {RightOutlined} from '@ant-design/icons'
import {useState} from "react";

function Button(props) {
    //для анимации кнопки
    const [isAnimating, setIsAnimating] = useState(true); //для анимации кнопки
    const handleClickAnim = (e) => {
        setIsAnimating(true);
        const animateButton = (timestamp) => {
            if (!isAnimating) return;
            const t = timestamp - startTime;
            if (t < 1000) {
                requestAnimationFrame(animateButton);
            }
            const progress = t / 600;
            const button = e.target;
            const rect = button.getBoundingClientRect();
            const position = `${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY},${progress * Math.max(rect.width, rect.height)}`;
            button.style.backgroundImage = `-webkit-gradient(radial,${position},${position},from(rgba(100,100,100,${0.6 - progress * 0.6})),to(#fff0))`;
        };
        const startTime = performance.now();
        requestAnimationFrame(animateButton);
    }
    // Открываем ссылку
    const handleClick = () => {
        const url = props.url;
        // window.location.href = url;
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
}

export default Button