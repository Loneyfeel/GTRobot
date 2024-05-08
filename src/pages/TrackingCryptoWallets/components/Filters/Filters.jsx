import React, {useEffect, useState} from 'react';
import style from './filters.module.sass'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import {getWhaleTags, getWhaleWallets} from "../../api/api.js";
import lockImg from '../../assets/shared/lockWihte.svg'

const Filters = ({setWalletsData, lock}) => {
    const {t, i18n} = useTranslation();
    const [backdropVisible, setBackdropVisible] = useState(false)
    const [tags, setTags] = useState([]); // Состояние для тегов
    const [tagsId, setTagsId] = useState({}); // Состояние для идентификаторов тегов

    useEffect(() => {
        getWhaleTags()
            .then(response => {
                const { data } = response;

                // Создаем новый объект для тегов
                const newTags = {};
                // Создаем новый объект для идентификаторов тегов
                const newTagsId = {};

                // Проходимся по всем полям объекта ответа
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        // Если ключ соответствует текущему языку, добавляем его в массив тегов
                        if (data[key][i18n.language]) {
                            newTags[key] = data[key][i18n.language];
                        }
                        // Добавляем ключ в объект для идентификаторов тегов и устанавливаем значение false
                        newTagsId[key] = false;
                    }
                }
                // Обновляем состояния tags и tagsId
                setTags(newTags);
                setTagsId(newTagsId);
            })
            .catch(error => {
                console.error('Ошибка при получении данных о кошельках:', error);
            });
    }, []);

    const handleTagClick = (key) => {
        const newTagsId = { ...tagsId };
        newTagsId[key] = !newTagsId[key];
        setTagsId(newTagsId);

        const selectedTags = Object.keys(newTagsId).filter(tagKey => newTagsId[tagKey]);
        getWhaleWallets(setBackdropVisible, 'all', '', '', selectedTags, '')
            .then(response => {
                setWalletsData(response.data.data);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках китов:', error);
            });
    };

    return (
        <>
            {tags &&
                <Box className={style.trackingCryptoWallets__content__box}>
                     <Box className={style.trackingCryptoWallets__content__filters}>
                         {Object.entries(tags).map(([key, value]) => (
                             <>
                                <Box
                                    key={key}
                                    className={`${style.trackingCryptoWallets__content__filters__item} ${ tagsId[key] && style.trackingCryptoWallets__content__filters__item_active}`}
                                    onClick={() => {
                                        handleTagClick(key)
                                    }}
                                >
                                    {lock && <img src={lockImg} alt={lock} style={{marginRight: '5px'}}/>}
                                    <Box className={style.trackingCryptoWallets__content__filters__item_text}>{value}</Box>
                                </Box>
                             </>
                        ))}
                    </Box>
                </Box>
            }
        </>
    );
};

export default Filters;