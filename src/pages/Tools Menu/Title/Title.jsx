import style from './title.module.sass'
import {useTranslation} from "react-i18next";

function Title() {
    const {t, i18n} = useTranslation()

    return (
        <>
            <div className={style.menu__title}>
                <p>
                    {t('toolsMenu.title')}:
                </p>
            </div>
        </>
    )
}

export default Title