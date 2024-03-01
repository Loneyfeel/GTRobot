import React from 'react';
import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import './customButton.sass';

const CustomButton = ({ content, onClick, ...props }) => {
    const isIcon = React.isValidElement(content);
    const ButtonComponent = isIcon ? IconButton : Button;

    const buttonClass = isIcon ? 'icon-button' : 'text-button';

    const { startIcon, endIcon, className, ...restProps } = props;

    return (
        <ButtonComponent
            className={`${buttonClass}`}
            onClick={onClick}
            {...restProps}
        >
            {startIcon && !isIcon && startIcon}
            {content}
            {endIcon && !isIcon && endIcon}
        </ButtonComponent>
    );
};

CustomButton.propTypes = {
    content: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string, // Подтверждаем, что className ожидается строкой или undefined
    // Добавьте другие propTypes при необходимости
};

export default CustomButton;
