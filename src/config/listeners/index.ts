import CONSTANCE from "../CONSTANCE";
import Listener from '../../Handlers/Listener'
import Window from "../../Handlers/Window";
import System from "../../Handlers/System";
import Confirm from 'naxui/Confirm'

Listener.on(CONSTANCE.OS_WINDOW_NEXT, () => {
    System.openWindowPanel()
    Window.activeNext()
}, true)
Listener.on(CONSTANCE.OS_WINDOW_PREV, () => {
    System.openWindowPanel()
    Window.activePrev()
}, true)
Listener.on(CONSTANCE.OS_WINDOW_PANEL_TOGGLE, () => System.toggleOpenWindowPanel(), true)
// Listener.on(CONSTANCE.OS_WINDOW_RELOAD, async () => {
//     const is = await Confirm({
//         type: "warning",
//         title: "Warning",
//         message: "Are You sure to reload?"
//     })
//     if (is) {
//         window.location.reload()
//     }
// }, true)