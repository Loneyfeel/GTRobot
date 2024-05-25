import React, {useEffect, useState} from 'react';
import style from './mainMenuButton.module.sass'
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {tg} from "../../../../shared/telegram/telegram.js";
import {sendCommand} from "../../api/api.js";
import {useQueryClient} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";
import NoPremiumDialog from "../../../../shared/components/NoPremiumDialog/index.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded.js";

const MainMenuButton = ({icon, text, url, setCommandsX, width, type, name, isForPremium}) => {

    const { i18n } = useTranslation();

    const queryClient = useQueryClient()
    const [userData, setUserData] = useState([])

    useEffect(() => {
        if(queryClient.getQueryData('userMainData')){
            setUserData(queryClient.getQueryData('userMainData').data);
        }}, [queryClient.getQueryData('userMainData')])

    const [tutorialLinks, setTutorialLinks] = useState([])

    useEffect(() => {
        if(queryClient.getQueryData('tutorialLinks')){
            setTutorialLinks(queryClient.getQueryData('tutorialLinks').data)
        }
    }, [queryClient.getQueryData('tutorialLinks')])

    const [openNoPremiumDialog, setOpenNoPremiumDialog] = useState(false)

    function buttonClickEvent(url) {
        tg.SettingsButton.isVisible = false
        if (type === 'link') {
            window.location.href = url;
            // } else if (type === "commands") {
            //     setCommandsX('0')
        } else if (type === 'menu') {
            sendCommand(`menu_${url}`)
            tg.close();
        } else if (name === 'analysis') {
            tg.openTelegramLink(`menu_${url}`)
        } else if (type === 'other') {
            tg.showAlert('Скоро')
        }
    }

    function handleButtonClick() {
        if(isForPremium){
           if(userData.isPremiumUser){
               buttonClickEvent()
           } else {
               setOpenNoPremiumDialog(true)
           }
        } else {
            buttonClickEvent()
        }
    }

        // if (name === 'mining'){
        //     tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
        //         const parsedValue = JSON.parse(value)
        //         console.log(parsedValue)
        //         if (error) {
        //             console.error("Error:", error);
        //         } else {
        //             if(!parsedValue.mining){
        //                 tg.openLink(tutorialLinks.mining[i18n.language],{try_instant_view:true})
        //                 parsedValue.mining = true
        //                 tg.CloudStorage.setItem('gtrobotTutorialsCheck', JSON.stringify(parsedValue), (error, success) => {
        //                     if (error) {
        //                         console.error("Error updating cloud storage:", error);
        //                     } else {
        //                         console.log("Cloud storage updated successfully.");
        //                     }
        //                 });
        //             }
        //         }
        //     })
        // }
        // if (name === 'topWhales'){
        //     console.log('asdw')
        //     tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
        //         const parsedValue = JSON.parse(value)
        //         if (error) {
        //             console.error("Error:", error);
        //         } else {
        //             if(!parsedValue.topWhales){
        //                 tg.openLink(tutorialLinks.topWhales[i18n.language],{try_instant_view:true})
        //                 parsedValue.topWhales = true
        //                 tg.CloudStorage.setItem('gtrobotTutorialsCheck', JSON.stringify(parsedValue), (error, success) => {
        //                     if (error) {
        //                         console.error("Error updating cloud storage:", error);
        //                     }
        //                 });
        //             }
        //         }
        //     })
        // }

    return (
        <>
            <Button className={style.mainMenuButton}
                    onClick={handleButtonClick}
                    sx={{
                        color: 'var(--button-text-color)',
                        borderRadius: '20px',
                        border: '1px solid var(--component-stroke-color)',
                        margin: '5px',
                        padding: '15px',
                        bgcolor: 'var(--menu-button-color)',
                        width: {width} || '46%',
                        display: 'flex',
                        justifyContent: width ? 'center' : 'flex-start',
                        fontFamily: 'Gilroy',
                        textTransform: 'none',
                        fonSize: '16px',
                        textAlign: 'left',
                        lineHeight: 'unset',
                        '&:hover':{
                            backgroundColor: 'var(--settings-inactive-color)'
                        }
                    }}>
                <Box className={style.mainMenuButton__icon}>
                    <img src={icon} alt={'icon'}/>
                </Box>
                <Box className={style.mainMenuButton__text}>
                    {text}
                </Box>
            </Button>
            <NoPremiumDialog open={openNoPremiumDialog} setOpen={setOpenNoPremiumDialog}/>
        </>
    );
}

export default MainMenuButton;