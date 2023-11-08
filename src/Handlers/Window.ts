import { Store } from "state-range";
import Screen from "./Screen";
import App from "./App";

export type WindowTypes = {
    appType: string;
    active: boolean;
}


class WindowFactory extends Store<WindowTypes> { }
const factory = new WindowFactory

class Window {

    open(appType: string, appId: string) {
        const c = factory.insert({
            appType,
            active: false
        })
        Screen.open(c._id, appId)
        this.setActive(c._id)
        return c._id
    }


    exit(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win) {
            const all = this.getAll(win.appType)
            if (all.length < 2) return
            if (win.active) {
                for (let i = 0; i < all.length; i++) {
                    let w = all[i]
                    if (w._id === windowId) {
                        let prevWin = all[i - 1]
                        let nextWin = all[i + 1]
                        this.setActive(prevWin?._id || nextWin?._id)
                        break;
                    }
                }
            }
            Screen.exitAll(windowId)
            factory.delete({ _id: windowId })
        }
    }

    setActive(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win && !win.active) {
            factory.update({ active: false }, { active: true, appType: win.appType })
            factory.update({ active: true }, { _id: win._id })
            Screen.setActive(Screen.getActive(win._id)._id)
        }
    }

    getActive(appType: string) {
        return factory.findFirst({ active: true, appType }) || factory.find({ appType })[0]
    }

    getAll(appType: string) {
        return factory.find({ appType })
    }

    get(windowId: string) {
        return factory.findFirst({ _id: windowId })
    }

}

export default new Window