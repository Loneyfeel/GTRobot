import React, {useState} from 'react';
import style from './mainCommandItem.module.sass'
import {Autocomplete, Box} from "@mui/material";
import {sendCommand} from "../../api/api.js";
import {useTranslation} from "react-i18next";
import {tg} from "../../../../shared/telegram/telegram.js";

const MainCommandItem = ({command, icon, description, textInput, assets, assetsLength, gtrobotTheme}) => {
    const {t} = useTranslation()
    const [link, setLink] = useState('btc')
    function handleButtonClick(command){
        if (command === 'kurs') {
            sendCommand(`cmd_${command}_${link.toLowerCase()}`)
        } else {
            sendCommand(`cmd_${command.toLowerCase()}`)
        }
        tg.close();
    }

    return (
        <>
            <Box className={style.mainCommandItem}>
                <Box className={style.mainCommandItem__command}>
                    <img src={icon} alt={'icon'} className={style.mainCommandItem__command_img}
                         style={{
                             filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                         }}/>
                    {command}
                    {textInput && (
                        <>
                            <label>
                                <Autocomplete
                                    clearOnBlur={false}
                                    defaultValue={'btc'} // Установка дефолтного значения 'btc'
                                    noOptionsText={t("mainMenu.no")}
                                    onChange={(event, value)=> {
                                        setLink(value.toLowerCase())
                                    }}
                                    sx={{
                                        display: 'inline-block',
                                        '& input': {
                                            width: 50,
                                            height: 25,
                                            backgroundColor: 'var(--main-secondary-bg-color )',
                                            color: 'var(--text-color)',
                                            border: '1px solid var(--component-stroke-color)',
                                            borderRadius: '7px',
                                            marginLeft: '10px',
                                            position: 'relative',
                                            textTransform: 'lowercase',
                                            overflow: 'hidden',
                                        },
                                    }}
                                    ListboxProps={{
                                        style:{
                                            width: 65,
                                            margin: 0,
                                            padding: 0,
                                            zIndex: 1,
                                            position: 'absolute',
                                            top: 0,
                                            left: 5,
                                            color: 'var(--text-color)',
                                            backgroundColor: 'var(--component-bg-color)',
                                            maxHeight: '300px',
                                            overflow: 'scroll',
                                            borderRadius: 7,
                                            scrollbarWidth: 'none',
                                        }
                                    }}
                                    id="custom-input-demo"
                                    options={assets || []}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                            <input type="text" {...params.inputProps} />
                                        </div>
                                    )}
                                    renderOption={(props, option) => (
                                        <div {...props}
                                             style={{
                                                 padding: "3px",
                                                 textTransform: 'lowercase',
                                                 marginBlock: '-10px',
                                                 '& :hover':{
                                                     bgColor: '#fff'
                                                 }
                                        }}>
                                            {assetsLength > 0 &&
                                                <>
                                                    {option}
                                                </>
                                            }
                                        </div>
                                    )}
                                />
                            </label>
                        </>
                    )}
                </Box>
                <Box className={style.mainCommandItem__description}
                     onClick={() => {
                         handleButtonClick(command)
                     }}
                >
                    {description}
                </Box>
            </Box>
        </>
    );
};

export default MainCommandItem;