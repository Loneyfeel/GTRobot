import style from './menu.module.sass'
import Title from './Title'
import Buttons from './Buttons'

function Menu() {

    return (
        <>
            <menu className={style.menu}>
                <Title/>
                <Buttons/>
            </menu>
        </>
    )
}

export default Menu
