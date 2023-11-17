import CONSTANCE from "../CONSTANCE";
import Listener from '../../Handlers/Listener'
import Window from "../../Handlers/Window";
import System from "../../Handlers/System";

Listener.on(CONSTANCE.OS_WINDOW_NEXT, () => Window.activeNext(), true)
Listener.on(CONSTANCE.OS_WINDOW_PREV, () => Window.activePrev(), true)
Listener.on(CONSTANCE.OS_WINDOW_PANEL_TOGGLE, () => System.toggleOpenWindowPanel(), true)