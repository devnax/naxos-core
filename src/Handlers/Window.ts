import { Store, noDispatch } from "state-range";
import Screen from "./Screen";

export type WindowTypes = {
    active: boolean;
}


class WindowFactory extends Store<WindowTypes> { }
const factory = new WindowFactory

class Window {

    open(appId: string) {
        const c = factory.insert({
            active: false
        })
        Screen.open(c._id, appId)
        this.setActive(c._id)
        return c._id
    }

    next() {
        const all = this.getAll()
        for (let i = 0; i < all.length; i++) {
            let w = all[i]
            if (w.active) {
                let nextWin = all[i + 1] || all[0]
                if (nextWin && nextWin._id !== w._id) {
                    this.setActive(nextWin._id)
                }
                break;
            }
        }
    }

    prev() {
        const all = this.getAll()
        for (let i = 0; i < all.length; i++) {
            let w = all[i]
            if (w.active) {
                let prevWin = all[i - 1] || all[all.length - 1]
                if (prevWin && prevWin._id !== w._id) {
                    this.setActive(prevWin._id)
                }
                break;
            }
        }
    }

    exit(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win) {
            const all = this.getAll()
            if (all.length < 2) return
            if (win.active) {
                this.prev()
            }
            Screen.exitAll(windowId)
            factory.delete({ _id: windowId })
        }
    }

    closeAll() {
        const items = factory.getAll()
        items.map((w, idx) => {
            if (idx !== 0) {
                this.exit(w._id)
            }
        })
    }

    setActive(windowId: string) {
        const win = factory.findFirst({ _id: windowId })
        if (win && !win.active) {
            factory.update({ active: false }, { active: true })
            factory.update({ active: true }, { _id: win._id })
            Screen.setActive(Screen.getActive(win._id)._id)
        }
    }

    getActive() {
        return factory.findFirst({ active: true, }) || factory.getAll()[0]
    }

    getAll() {
        return factory.getAll()
    }

    get(windowId: string) {
        return factory.findFirst({ _id: windowId })
    }

}

export default new Window