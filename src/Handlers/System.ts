import { Store } from "state-range";

type MetaProps = {
    TOGGLE_WINDOW_PANEL: boolean
}

class SystemFactory extends Store<any, MetaProps> { }

export const systemFactory = new SystemFactory

class System {

    toggleOpenWindowPanel() {
        const isOpen = systemFactory.getMeta("TOGGLE_WINDOW_PANEL", false)
        systemFactory.setMeta("TOGGLE_WINDOW_PANEL", !isOpen)
    }
}


export default new System