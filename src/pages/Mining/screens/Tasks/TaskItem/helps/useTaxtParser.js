// useTaskParser.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getPostfix, getPrefix } from './getText.js';

const useTaskParser = (taskText) => {
    const { t, i18n } = useTranslation();
    const [text, setText] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const lowercaseText = taskText.toLowerCase();
        const prefix = getPrefix(lowercaseText, t);
        const postfix = `<strong>${getPostfix(lowercaseText, setIcon)}</strong>`;
        setText(i18n.language === 'ru' ? `${prefix} ${postfix}` : `${postfix} ${prefix}`);
    }, [taskText, i18n.language]);

    return { text, icon };
};

export default useTaskParser;
