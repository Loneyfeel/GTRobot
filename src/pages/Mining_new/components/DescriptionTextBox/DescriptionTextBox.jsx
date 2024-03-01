import React, { useRef, useEffect, useState } from 'react';
import style from './descriptionTextBox.module.sass';
import { Box } from '@mui/material';

const DescriptionTextBox = ({ text, bgcolor, width, borderRadius, component, style: additionalStyles }) => {
    const textRef = useRef(null);
    const [textHeight, setTextHeight] = useState('auto');

    useEffect(() => {
        const textElement = textRef.current;
        if (textElement) {
            textElement.style.height = 'auto';
            const textHeight = textElement.clientHeight;
            textElement.style.height = textHeight + 'px';
            setTextHeight(textHeight + 'px')
        }
    }, [text]);

    return (
        <Box className={style.description__text_box}
             sx={{
                 bgcolor: `${bgcolor}`,
                 width: `${width}`,
                 borderRadius: `${borderRadius}`,
                 ...additionalStyles
             }}
        >
            {component}
            <Box className={style.description__text_box__card}
                 style={{
                     height: textHeight,
                     padding: text ? '10px' : '0',
                     borderRadius: `${borderRadius}`,
                 }}>
                <Box className={style.description__text_box__card__text} ref={textRef}>
                    <p>{text}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default DescriptionTextBox;
