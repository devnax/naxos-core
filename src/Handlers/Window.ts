import { Store } from "state-range";
import App from "./App";


export type WindowType = {
    active: boolean;
    apps: string[]
    activeApp: string;
}

export type WindowStoreType = WindowType & {
    _id: string;
    observe: number
}

class Window extends Store<WindowType> {
    open(appId: string) {
        const win = this.insert({
            active: true,
            apps: [appId],
            activeApp: appId
        })
        this.setActive(win._id)
    }

    close(windowId: string) {
        const win = this.get(windowId)
        const all = this.getAll()
        if (win && all.length > 1) {
            this.delete({ _id: windowId })
            if (win.active) this.activeNext()
        }
    }

    clear() {
        this.getAll().forEach((w, idx) => {
            if (idx) { // skip first window
                this.delete({ _id: w._id })
            }
        })
    }

    split(appId: string) {
        const win = this.getActiveWindow()
        if (win && !win.apps.includes(appId)) {
            this.update({ activeApp: appId, apps: [...win.apps, appId] }, { _id: win._id })
        }
    }

    setActive(windowId: string) {
        const win = this.get(windowId)
        if (win) {
            this.update({ active: false }, { active: true })
            this.update({ active: true }, { _id: windowId })
            if (!win.activeApp) {
                this.setActiveApp(win.apps[0])
            }
        }
    }

    setActiveApp(appId: string) {
        const win = this.getActiveWindow()
        if (win) {
            this.update({ activeApp: appId, apps: [appId] }, { _id: win._id })
        }
    }

    deactiveAll() {
        this.update({ active: false }, { active: true })
    }

    activeNext() {
        const win = this.getActiveWindow()
        const currentIndex = this.getIndex({ _id: win?._id }) || 0
        const windows = this.getAll()
        const next = windows[currentIndex + 1] || windows[0]
        this.setActive(next._id)
    }

    activePrev() {
        const win = this.getActiveWindow()
        const currentIndex = this.getIndex({ _id: win?._id }) || 0
        const windows = this.getAll()
        const prev = windows[currentIndex - 1] || windows[windows.length - 1]
        this.setActive(prev._id)
    }

    // ========
    get(windowId: string) {
        return this.findFirst({ _id: windowId })
    }

    getActiveWindow() {
        return this.findFirst({ active: true })
    }

    getActiveApp() {
        const activeWin = this.getActiveWindow()
        if (activeWin) {
            return App.findFirst({ id: activeWin.activeApp })
        }
    }
}


export default new Window