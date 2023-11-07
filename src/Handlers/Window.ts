import { Store } from "state-range";
import Screen from "./Screen";

export type WindowTypes = {
    appType: string;
    active: boolean;
}


class WindowFactory extends Store<WindowTypes> { }
const factory = new WindowFactory

class Window {
    open(appType: string, appId: string) {
        factory.update({ active: false }, { active: true, appType })

        const c = factory.insert({
            appType,
            active: true
        })
        Screen.open(c._id, appId)
        return c._id
    }


    exit(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win) {
            const all = factory.find({ appType: win.appType })
            if (all.length === 1) return
            if (win.active) {
                for (let i = 0; i < all.length; i++) {
                    let w = all[i]
                    if (all[i + 1]?._id === win._id) {
                        factory.update({ active: true }, { _id: w._id })
                        const screens = Screen.getAll(w._id)
                        Screen.setActive(screens[0]._id)
                        break;
                    }
                }
            }
            Screen.exitAll(win._id)
            factory.delete({ _id: win._id })
        }
    }

    setActive(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win && !win.active) {
            factory.update({ active: false }, { active: true, appType: win.appType })
            factory.update({ active: true }, { _id: win._id })
        }
    }

    getActive(appType: string) {
        return factory.findFirst({ active: true, appType })
    }

    getAll(appType: string) {
        return factory.find({ appType })
    }

    get(windowId: string) {
        return factory.findFirst({ _id: windowId })
    }

}

export default new Window