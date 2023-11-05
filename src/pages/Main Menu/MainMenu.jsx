import './mainMenu.module.sass'
import style from "./mainMenu.module.sass";
import MainButtons from "./Main Buttons/index.js";
import MainTitle from "./Main Title/index.js";

const MainMenu = () => {
    return (
        <div>
            <menu className={style.menu}>
                <MainTitle/>
                <MainButtons/>
            </menu>
        </div>
    );
};

export default MainMenu;