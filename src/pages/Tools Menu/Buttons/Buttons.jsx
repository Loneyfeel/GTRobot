import style from './buttons.module.sass'
import Button from './Button'
import {BarChartOutlined, SearchOutlined} from '@ant-design/icons'
import {useTranslation} from "react-i18next";

function Buttons() {
    const {t, i18n} = useTranslation()

    return (
        <>
            <div className={style.menu__buttons}>
                <Button id="Analysis" icon={<SearchOutlined />} text={t('toolsMenu.buttons.analysis')} url="/signals"/>
                <Button id="Monitoring" icon={<BarChartOutlined />} text={t('toolsMenu.buttons.monitoring')} url="/klines"/>
            </div>
        </>
    )
}

export default Buttons
