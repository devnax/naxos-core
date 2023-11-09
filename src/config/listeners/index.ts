import CONSTANCE from "../CONSTANCE";
import Listener from '../../Handlers/Listener'
import Window from "../../Handlers/Window";

Listener.on(CONSTANCE.OS_WINDOW_NEXT, () => {
    Window.next()
}, true)

Listener.on(CONSTANCE.OS_WINDOW_PREV, () => {
    Window.prev()
}, true)