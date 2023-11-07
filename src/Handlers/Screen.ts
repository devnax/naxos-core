import { Store } from "state-range";
import Window from "./Window";
import App from "./App";

export type ScreenTypes = {
    windowId: string;
    appId: string;
    active: boolean;
    size: number;
}

class ScreenFactory extends Store<ScreenTypes> { }
const factory = new ScreenFactory

class Screen {

    open(windowId: string, appId: string) {
        factory.update({ active: false }, { active: true, windowId })
        const c = factory.insert({
            windowId,
            appId,
            active: true,
            size: 0
        })
        return c._id
    }

    exit(screenId: string) {
        const screen = factory.findFirst({ _id: screenId })
        if (screen) {
            const all = factory.find({ windowId: screen.windowId })
            if (all.length === 1) return
            if (screen.active) {
                for (let i = 0; i < all.length; i++) {
                    let s = all[i]
                    if (all[i + 1]?._id === screen._id) {
                        factory.update({ active: true }, { _id: s._id })
                        break;
                    }
                }
            }
            factory.delete({ _id: screen._id })
        }
    }

    exitAll(windowId: string) {
        factory.delete({ windowId })
    }

    getActive(windowId: string) {
        return factory.findFirst({ active: true, windowId })
    }

    setActive(screenId: string) {
        const screen = factory.findFirst({ _id: screenId })
        if (screen && !screen.active) {
            factory.update({ active: false }, { active: true, windowId: screen.windowId })
            factory.update({ active: true }, { _id: screen._id })
        }
    }

    setActiveApp(appId: string) {
        const app = App.get(appId)
        if (app && app.render) {
            const activeWindow = Window.getActive(app.type as any)
            if (activeWindow) {
                const activeScreen = this.getActive(activeWindow._id)
                if (activeScreen) {
                    factory.update({ active: false }, { active: true, windowId: activeScreen.windowId })
                    factory.update({ active: true, appId }, { _id: activeScreen._id })
                }
            }
        }
    }


    getAll(windowId: string) {
        return factory.find({ windowId })
    }

    get(screenId: string) {
        return factory.findFirst({ _id: screenId })
    }
}

export default new Screen