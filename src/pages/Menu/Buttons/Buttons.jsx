import style from './buttons.module.sass'
import Button from './Button'
import {BarChartOutlined, SearchOutlined} from '@ant-design/icons'

function Buttons() {

    return (
        <>
            <div className={style.menu__buttons}>
                {/*ДОБАВИТЬ УРЛ И РАСКОММЕНТИТЬ В BUTTON*/}
                <Button id="Analysis" icon={<SearchOutlined />} text="Анализ и сигнал" url=""/>
                <Button id="Monitoring" icon={<BarChartOutlined />} text="Мониторинг" url=""/>
            </div>
        </>
    )
}

export default Buttons
