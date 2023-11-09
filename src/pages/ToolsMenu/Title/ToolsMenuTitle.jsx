import {useTranslation} from "react-i18next";
import MenuTitle from "../../../shared/MenuPages/Titles/MenuTitle.jsx";
import React from "react";

function ToolsMenuTitle() {
    const {t} = useTranslation()

    return (
        <>
            <MenuTitle text={t('toolsMenu.title')}/>
        </>
    )
}

export default ToolsMenuTitle