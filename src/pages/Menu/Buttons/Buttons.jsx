import style from './buttons.module.sass'
import Button from './Button'
import {BarChartOutlined, SearchOutlined} from '@ant-design/icons'

function Buttons() {

    return (
        <>
            <div className={style.menu__buttons}>
                <Button id="Analysis" icon={<SearchOutlined />} text="Анализ и сигнал" url="/signals"/>
                <Button id="Monitoring" icon={<BarChartOutlined />} text="Мониторинг" url="/klines"/>
            </div>
        </>
    )
}

export default Buttons
