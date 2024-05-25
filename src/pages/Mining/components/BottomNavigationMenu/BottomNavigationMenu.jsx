import React, { useState, useRef, useEffect } from 'react';
import style from './bottomNavigationMenu.module.sass';
import { animated, useSpring } from 'react-spring';
import { Box } from "@mui/material";
import {useNavigate } from 'react-router-dom';

import cloud from '../../assets/shared/bottomNavigation/cloud.svg';
import cube from '../../assets/shared/bottomNavigation/cube.svg';
import menu from '../../assets/shared/bottomNavigation/menu.svg';
import referrals from '../../assets/shared/bottomNavigation/referrals.svg';
import {tg} from "../../../../shared/telegram/telegram.js";

const iconImages = [cloud, cube, referrals, menu];
const routes = ['/cloud-mining', '/gtrobot-mining', '/referrals', '/menu'];

const BottomNavigationMenu = ({ selectedTab, onTabChange }) => {
    const navigate = useNavigate();

    const [circlePos, setCirclePos] = useState({ left: 0, width: 0 });
    const containerRef = useRef(null);
    const circleSpring = useSpring({ left: circlePos.left });

    useEffect(() => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const selectedTabRect = containerRef.current.children[selectedTab + 1].getBoundingClientRect();

            // Получаем стиль круга
            const circleStyle = getComputedStyle(containerRef.current.querySelector(`.${style.bottomNavigationMenu_box__circle}`));

            // Извлекаем размер круга из стиля
            const circleSize = parseInt(circleStyle.width); // Предполагаем, что ширина и высота круга равны

            // Вычисляем координаты центра иконки
            const iconCenterX = selectedTabRect.left - containerRect.left + selectedTabRect.width / 2;
            const iconCenterY = selectedTabRect.top - containerRect.top + selectedTabRect.height / 2;

            // Вычисляем позицию круга, чтобы он центрировался по центру иконки
            const circleLeft = iconCenterX - circleSize / 2;
            const circleTop = iconCenterY - circleSize / 2;

            setCirclePos({ left: circleLeft, top: circleTop});
        }
        navigate(routes[selectedTab])
    }, [selectedTab]);

    const handleMenuClick = (index) => {
        onTabChange(index);
        navigate(routes[index]);
    };

    const [wasd, setWasd] = useState('fixed')

    window.addEventListener('scroll', function() {
        let menu = document.querySelector('.menu');
        let body = document.body;
        let scrollPosition = window.scrollY || window.pageYOffset;

        if (scrollPosition >= body.clientHeight - tg.viewportHeight - 15) {
            setWasd('absolute');
        } else {
            setWasd('fixed');
        }
    });

    return (
        <Box className={style.bottomNavigationMenu}
        sx={{
            position: wasd,
        }}>
            <Box className={style.bottomNavigationMenu_box} ref={containerRef}>
                <animated.div className={style.bottomNavigationMenu_box__circle} style={{ ...circleSpring}}>
                    <Box className={style.bottomNavigationMenu_box__circle_1} />
                </animated.div>
                {iconImages.map((icon, index) => (
                    <Box key={index} className={style.bottomNavigationMenu_box__icon_box} onClick={() => handleMenuClick(index)}>
                        <Box className={style.bottomNavigationMenu_box__icon_box_img}>
                            <img src={icon} alt={`icon-${index}`} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default BottomNavigationMenu;